import React,{useEffect,useState} from 'react'
import { collection, query, where, onSnapshot, setDoc, doc, getDoc, getDocs} from "firebase/firestore";
import {db} from '../../../firebaseConfig';
import { Grid, Button } from '@mui/material';
import { v4 as uuidv4 } from "uuid";
import { DockSharp } from '@mui/icons-material';

function CandidateJobs() {
  const [allJobs,setAllJobs]=useState(null)
  const [resumeUrl,setResumeUrl]=useState()
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
    // console.log(querySnapshot)
    // let count=0;
    querySnapshot.forEach((doc) => {
      setResumeUrl(doc.data().resume)
    })
    // console.log(count)
    // const unsubscribe = onSnapshot(q, (doc) => {
    //   console.log(doc)///////See it* to add resume section in applications collection of db
    //   // setResume(querySnapshot)
    // });
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
    const q= await query(collection(db, "applications"),where('candidateId','==',candidateId));
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
      
      // navigate('/candidate/application')
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    }
    
  }
  return (
    <div>
      {allJobs && allJobs.length>0?
      <div style={{}}>
        {allJobs.map((job)=>{ return <div>
          <Grid container sx={{maxWidth:'600px',width:'90%',margin:'auto',alignItems:'center',display:'flex',boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',borderRadius: '10px'}}>
            <Grid item xs={12} sm={6}>
              {job.title}
            </Grid>
            <Grid item xs={12} sm={6}>
              {job.location}
            </Grid>
            <Grid item xs={12} sm={12}>
              {job.description}
            </Grid>
            <Grid item xs={12} sm={12}>
              <label for="">Skills</label>
              <div style={{display:'flex',gap:'10px'}}>
              {
                job.skills.map((skill)=>{
                  return <div>{skill}</div>
                })
              }
              </div>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button variant='contained'
              onClick={(e)=>{applyForJob(job,e)}}>Apply</Button>
            </Grid>
          </Grid>
          
        </div>})}
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