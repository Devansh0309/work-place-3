import React,{useState,useEffect} from 'react'
import MessageArea from '../../common/MessageArea'
import LastMessage from '../../common/LastMessage'
import { Grid,Button} from '@mui/material'
import { collection, query, where, onSnapshot, setDoc, doc} from "firebase/firestore";
import { db } from '../../../firebaseConfig';
import { v4 as uuidv4 } from "uuid";


function Conversation(){
  const [lastMessage,setLastMessage]=useState(true)
  const [allLastMessages,setAllLastMessages]=useState()
  const [allConversations,setAllConversations]=useState()
  const [selectConversation,setSelectConversation]=useState()
  const userInfo=JSON.parse(localStorage.getItem('user'))
  
  const selectAConversation=async(data)=>{
    setSelectConversation(data)
    const q= query(collection(db, "one-one-messages"),where('conversationId','==',data.conversationId));
    onSnapshot(q,(querySnapshot)=>{
      let data=[]
      querySnapshot.forEach((doc)=>{
      data.push(doc.data())
    })
    setAllConversations(data)
    })
    setLastMessage(false)
  }
  const fetchData=async()=>{
    const employerId=userInfo.uid
    const collect=collection(db, "lastMessages")
    const q= query(collect,where('employerId','==',employerId));
    onSnapshot(q,(querySnapshot)=>{
      let data=[]
      querySnapshot.forEach((doc)=>{
      data.push(doc.data())
    })
    setAllLastMessages(data)
    })
  }
  useEffect(()=>{
    fetchData()
  },[])

  const postMessage=async(message)=>{
    try{
      const conversationId=selectConversation.conversationId
      const oneToOneMessageId=uuidv4()

      await setDoc(doc(db,'lastMessages',selectConversation.lastMessageId),{
        lastMessage:message,
        createdAt:new Date().getTime()
      },{
        merge:true
      })
      await setDoc(doc(db,'one-one-messages',oneToOneMessageId),{
        lastMessage:message,
        createdAt:new Date().getTime(),
        conversationId:conversationId,
        userId:userInfo.uid,
        userType:'employer'
      })
    }catch(err){
      console.log(err)
    }
    
  }
  return (
    <div>
      <Grid container  spacing={2}>
        <Grid xs={12} sm={3} item sx={{display:{xs:lastMessage?'block':'none' ,sm:'block'}}}>
          <LastMessage selectAConversation={selectAConversation} allLastMessages={allLastMessages}/>
        </Grid>
        <Grid  xs={12} sm={9} item sx={{display:{xs:lastMessage?'none':'block', sm:'block'}}}>
          <Button onClick={()=>{setLastMessage(true)}}>Back</Button>
          <MessageArea allConversations={allConversations} postMessage={postMessage}/>
        </Grid>
      </Grid>
    </div>
  )
}
export default Conversation