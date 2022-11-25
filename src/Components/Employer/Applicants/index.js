import React,{useState,useEffect} from 'react'
import { collection, query, where, onSnapshot, setDoc, doc, getDoc, getDocs} from "firebase/firestore";
import { db } from '../../../firebaseConfig';

function Applicants() {
  const userInfo=JSON.parse(localStorage.getItem('user'))
  const employerId=userInfo.uid
  const [allApplicants,setAllApplicants]=useState(null)
  const fetchData=async()=>{
    const q= await query(collection(db, "applications"),where('employerId','==',employerId));
    let data=[]
    const querySnapshot=getDocs(q)
    ;(await querySnapshot).forEach((doc)=>{
      //doc.data() is never undefined for querySnapshots
      data.push(doc.data())
      console.log(data)
    })
    setAllApplicants(data)
  }
  useEffect(()=>{fetchData()},[])
  return (
    <div>
      {allApplicants && allApplicants.length>0?
      <div>
       {/* {allApplicants.map((applicants)=>{
         applicants.title
      })} */}
      data
      </div>:
      allApplicants && allApplicants.length===0?
       <div>
        No applicants
       </div>:
       <div>
        Loading...
       </div>}
    </div>
  )
}

export default Applicants