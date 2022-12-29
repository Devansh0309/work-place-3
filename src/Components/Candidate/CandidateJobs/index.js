import React,{useEffect,useState,useContext} from 'react'
import { collection, query, where, onSnapshot, setDoc, doc, getDocs} from "firebase/firestore";
import {db} from '../../../firebaseConfig';
import { Grid, Button } from '@mui/material';
import { v4 as uuidv4 } from "uuid";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ColorContext } from '../../../Context/DarkMode';
import { height } from '@mui/system';

function CandidateJobs() {
  const [allJobs,setAllJobs]=useState(null)
  const [resumeUrl,setResumeUrl]=useState()
  const [state]=useContext(ColorContext)
  const userInfo=JSON.parse(localStorage.getItem('user'))
  const candidateId=userInfo.uid
  const fetchJobs = async()=>{
    console.log('Inside fetch Jobs')
    const q = await query(collection(db, "jobsData"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const jobs = [];
      querySnapshot.forEach((doc) => {
        jobs.push(doc.data());
      });
    setAllJobs(jobs)
    });
  }
  const fetchResume = async()=>{
    console.log('Inside fetch Resume')
    const q=query(collection(db, "userData"),where('email','==',userInfo.email))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      setResumeUrl(doc.data().resume)
    })
  }

  useEffect(()=>{
    fetchJobs()
  },[])

  useEffect(()=>{fetchResume()},[])

  const applyForJob=async(job,e) => {
    //application id
    //job id
    //candidate id
    //status-accepted or declined
    // console.log('here you can add this job in applications section')
    e.preventDefault()
    // e.target.disabled=true
    const applicationId=uuidv4()
    console.log(job)
    //fetch the applications with candidate id
    //if job id is present in the applications then show alert: already applied
    //else apply for the job
    const q =await query(collection(db, "applications"),where('candidateId','==',candidateId));
    let data=[]
    const querySnapshot=getDocs(q)
    ;(await querySnapshot).forEach((doc)=>{
      //doc.data() is never undefined for querySnapshots
      data.push(doc.data())
    })
    const isApplied=data.find((item)=>
      item.jobId===job.Job_id
    ) 
    if(isApplied){
      alert("Already applied for job!")
    }
    else{
      try {
        await setDoc(doc(db, "applications", applicationId), {
          applicationId:applicationId,
          jobId:job.Job_id,
          employerId:job.employerId,
          title:job.title,
          location:job.location,
          createdAt:new Date(),
          candidateId:candidateId,
          status:'applied',
          candidateName:userInfo.displayName,
          companyName:job.employerName,
          candidateEmail:userInfo.email,
          resume:resumeUrl
        });
      alert("Applied for job successfully")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    }
    
  }
  return (
    <div>
      {allJobs && allJobs.length>0?
      <div style={{height:'auto'}}>
      <h1 style={{margin:'0 auto',padding:'10px',fontWeight:'400',color:state.darkMode?'white':
    'black' ,backgroundColor:state.darkMode?'darkgray':'#F2F2F2'}}>Search for jobs</h1>
      <div style={{paddingTop:'15px',display:'flex',flexDirection:'column',gap:'20px',color:state.darkMode?'white':
      'black' ,backgroundColor:state.darkMode?'darkgray':'#F2F2F2'}}>
        {allJobs.map((job)=>{
          return <div>
          <Grid container sx={{maxWidth:'600px',width:'90%',margin:'auto',alignItems:'center',display:'flex',boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',borderRadius: '10px'}}>
            <Grid item xs={12} sm={6} sx={{fontWeight:'350',fontSize:'30px',textAlign:'left',paddingLeft:'40px'}}>
              {job.title}
            </Grid>
            <Grid item xs={12} sm={6}  sx={{fontWeight:'300',fontSize:'15px',textAlign:'right',paddingRight:'20px'}}>
            <LocationOnIcon/>
              {job.location}
            </Grid>
            <Grid item xs={12} sm={12} sx={{textAlign:'left',paddingLeft:'40px'}}>
              {job.description}
            </Grid>
            <Grid container sx={{border:'0.02px solid grey', borderRadius:'5px',width:'90%',margin:'10px auto',alignItems:'center'}}>
            <Grid item xs={12} sm={9}>
              <div style={{fontWeight:'400',textAlign:'left',display:'inline-block'}}>Skills: </div>
              <span style={{display:"inline-flex",gap:'10px',fontWeight:'50'}}>
              {
                job.skills.map((skill)=>{
                  return <div>{skill}</div>
                })
              }
              </span>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button variant='contained'
              onClick={(e)=>{applyForJob(job,e)}} >Apply</Button>
            </Grid>
            </Grid>
          </Grid>
          
        </div>})}
      </div>
      </div>:
      allJobs && allJobs.length===0?
      <div>
      No Jobs Posted
      </div>:
       <div>
        Loading...
       </div>}
    </div>
  )
}
export default CandidateJobs