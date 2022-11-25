import React, { useEffect,useState } from 'react'
import { collection, query, where, onSnapshot, setDoc, doc, getDoc, getDocs} from "firebase/firestore";
import {db} from '../../../firebaseConfig';

function Applications() {
  const userInfo=JSON.parse(localStorage.getItem('user'))
  const candidateId=userInfo.uid
  const [allApplications,setAllApplications]=useState(null)
  const fetchData=async()=>{
    const q= await query(collection(db, "applications"),where('candidateId','==',candidateId));
    let data=[]
    const querySnapshot=getDocs(q)
    ;(await querySnapshot).forEach((doc)=>{
      //doc.data() is never undefined for querySnapshots
      data.push(doc.data())
      console.log(data)
    })
    setAllApplications(data)
  }
  useEffect(()=>{fetchData()},[])
  return (
    <div>
      {allApplications && allApplications.length>0?
      <div>
       {/* {allApplications.map((application)=>{
         application.title
      })} */}
      data
      </div>:
      allApplications && allApplications.length===0?
       <div>
        No jobs applied
       </div>:
       <div>
        Loading...
       </div>}
    </div>
  )
}

export default Applications