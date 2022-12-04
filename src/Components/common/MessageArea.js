import React,{useState} from 'react'
import { Grid,Button, TextField, FormControl, Select,MenuItem, Box, Chip, OutlinedInput, Typography} from '@mui/material'

function MessageArea({allConversations,postMessage}) {
  const [message,setMessage]=useState()
  return (
    <div 
    // style={{overflow:'scroll'}}
    >
      {allConversations?<Grid container sx={{}}>
        <Grid item xs={12} sm={12} sx={{display:'flex',flexDirection:'column',alignItems:'flex-start',overflowY:'auto',position:'fixed',bottom:'10%',top:'20%',width:'100%'}}>
          {allConversations.map((item)=>{
            return <div 
            // key={item.conversationId}
            style={{width:'300px',textAlign:'left',borderRadius:'0px 16px 16px 16px',margin:'8px',backgroundColor:'#EAEAEA',display:'flex',flexDirection:'column',alignItems:'flex-start',flex:'0 0 auto'}}>
              <div style={{overflowX:''}}>{item.lastMessage}
              </div>
              <div style={{textAlign:'right'}}>time</div>
              {/* <div>{item.createdAt.map((subItem)=>{
                return <div>
                  {subItem}
                </div>
              })}
              </div> */}
              </div>
          })}
        </Grid>
        <Grid container sx={{
          position:'fixed',bottom:'10%',
          width:'100%'}}>
          <Grid item xs={7} sm={8}>
            <TextField value={message} onChange={(e)=>{setMessage(e.target.value)}} sx={{zIndex:'10', backgroundColor:'lightgrey'}}/>
          </Grid>
          <Grid item xs={5}>
            <Button onClick={()=>{postMessage(message)}} sx={{zIndex:'10'}}>Send</Button>
          </Grid>
        </Grid>
      </Grid>:<div>Please select a conversation</div>}
    </div>
  )
}

export default MessageArea