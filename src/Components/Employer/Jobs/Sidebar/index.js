import React,{useEffect, useState,useContext} from 'react'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../../../../firebaseConfig';
import { Grid, Button } from '@mui/material';
import { ColorContext } from '../../../../Context/DarkMode';

function Sidebar({selectAjob}){
  const [allJobs,setAllJobs]=useState(null)
  const userInfo=JSON.parse(localStorage.getItem('user'))
  const [state]=useContext(ColorContext)
  const employerId=userInfo.uid
  const fetchJobs = async()=>{
    const q = await query(collection(db, "jobsData"),where('employerId','==',employerId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const jobs = [];
      querySnapshot.forEach((doc) => {
        jobs.push(doc.data());
      });
    setAllJobs(jobs)
    });
  }
  useEffect(() => {
  fetchJobs()}
  ,[])
  return (
    <div>
      <Button contained onClick={()=>{selectAjob()}} style={{color:state.darkMode?'white':
      'black'}}>Post a job</Button>
      {allJobs && allJobs.length>0?
      <div style={{margin:'10px',paddingTop:'15px',display:'flex',flexDirection:'column',gap:'20px'}}>
        {allJobs.map((job)=>
        <Grid container sx={{width:'80%',height:'121px',border:'0.2px solid black',borderRadius:'20px',margin:'10px',alignItems:'center',display:'flex',boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'}} onClick={()=>{selectAjob(job)}}>
          <Grid item xs={12}  sx={{fontWeight:'350',fontSize:'30px',textAlign:'left',paddingLeft:'20px'}}>
            {job.title}
          </Grid>
          <Grid item xs={12}   sx={{fontWeight:'300',fontSize:'15px',textAlign:'left',paddingLeft:'20px'}}>
            {job.location}
          </Grid>
          <Grid item xs={12}  sx={{textAlign:'left',paddingLeft:'20px'}}>
            {job.jobType}
          </Grid>
        </Grid>)}
      </div>:allJobs && allJobs.length===0?<div>
        No Jobs Posted
      </div>:
      <div>
        Loading...
      </div>}
    </div>
  )
}
export default Sidebar