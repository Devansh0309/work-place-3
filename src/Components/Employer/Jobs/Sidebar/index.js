import React,{useEffect, useState} from 'react'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../../../../firebaseConfig';
import { Grid, Button } from '@mui/material';

function Sidebar({selectAjob}){
  const [allJobs,setAllJobs]=useState(null)
  const userInfo=JSON.parse(localStorage.getItem('user'))
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
      <Button contained onClick={()=>{selectAjob()}}>Post a job</Button>
      {allJobs && allJobs.length>0?
      <div sx={{margin:'10px'}}>
        {allJobs.map((job)=>
        <Grid container sx={{width:'310px',height:'121px',border:'1px solid black',borderRadius:'20px',margin:'10px'}} onClick={()=>{selectAjob(job)}}>
          <Grid item xs={12}>
            {job.title}
          </Grid>
          <Grid item xs={12}>
            {job.location}
          </Grid>
          <Grid item xs={12}>
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