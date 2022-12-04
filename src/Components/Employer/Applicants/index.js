import React,{useState,useEffect} from 'react'
import { collection, query, where, onSnapshot, setDoc, doc, getDoc, getDocs} from "firebase/firestore";
import { db } from '../../../firebaseConfig';
import CommonTable from '../../common/CommonTable';
import { deleteDoc,updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const columnName=[
  {title:'Candidate',key:'candidateName'},
  {title:'Job title', key:'title'},
  {title:'Job location',key:'location'},
  {title:'status',key:'status'},
  {title:'Email',key:'candidateEmail'},
  {title:'actions',key:'buttons'}
  // {title:'Experience',key:'candidateExperience'}
  
  // {title:'applied on',key:'createdAt'}
]

function Applicants() {
  const userInfo=JSON.parse(localStorage.getItem('user'))
  const employerId=userInfo.uid
  const [allApplicants,setAllApplicants]=useState(null)
  const fetchData=async()=>{
    const collect=collection(db, "applications")
    const q= await query(collect,where('employerId','==',employerId),where( 'status','in',['applied','Approved']));
    // const querySnapshot=getDocs(q)
    onSnapshot(q,(querySnapshot)=>{
      let data=[]
      querySnapshot.forEach((doc)=>{
      //doc.data() is never undefined for querySnapshots
      data.push(doc.data())
      // console.log(data)
    })
    setAllApplicants(data)
    })
    
  }
  const handleClick=async(action,row)=>{
    const lastMessageId=uuidv4()
    const oneToOneMessageId=uuidv4()
    if(action==='accept'){
      // alert('accepted')
      try{
        await updateDoc(doc(db, "applications", row.applicationId), {
          status: 'Approved'
        });
      }catch(err){
        console.log(err)
      }
      
      try{
        await setDoc(doc(db,'lastMessages',lastMessageId),{lastMessage:`Hey there We have accepted your application for ${row.title}`,
        createdAt:new Date().getTime(),employerId:row.employerId,candidateId:row.candidateId,jobId:row.jobId,applicationId:row.applicationId,lastMessageId:lastMessageId,candidateName:row.candidateName,employerName:row.companyName,conversationId:`${row.employerId}-${row.candidateId}`})
        await setDoc(doc(db,'one-one-messages',oneToOneMessageId),{
          createdAt:new Date(),conversationId:`${row.employerId}-${row.candidateId}`,lastMessage:`Hey there We have accepted your application ${row.title}`,
          userId:userInfo.uid,userType:'employer'
          // ,employerId:row.employerId,
          // candidateId:row.candidateId
          ,createdAt:new Date().getTime()
        })
      }catch(err){
        console.log(err)
      }
      
    }
    else if(action==='reject'){
      // alert('rejected')
      //Here application is to be deleted
      // await deleteDoc(doc(db, "applications", row.applicationId));
      await updateDoc(doc(db, "applications", row.applicationId), {
        status: 'Declined'
      });
    }
  }

  useEffect(()=>{fetchData()},[])
  return (
    <div>
      {allApplicants && allApplicants.length>0?
      <div>
       {/* {allApplicants.map((applicants)=>{
         applicants.title
      })} */}
      <CommonTable data={allApplicants} columnsName={columnName} type={'employer'} handleClick={handleClick} />
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