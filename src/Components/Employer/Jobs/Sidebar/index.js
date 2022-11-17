import React,{useEffect, useState} from 'react'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../../../../firebaseConfig';

function Sidebar(){
  const [allJobs,setAllJobs]=useState([])
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
      {allJobs && allJobs.map(()=>{})}
    </div>
  )
}
export default Sidebar