import React from 'react'
import { Grid} from '@mui/material'

function LastMessage({selectAConversation,allLastMessages}) {
  return (
    <div>
      {allLastMessages  && allLastMessages.length>0?
      <div  style={{margin:'10px',padding:'15px',display:'flex',flexDirection:'column',gap:'10px'}}>
        {allLastMessages.map((item)=>
        <Grid container sx={{padding:'10px',margin:'10px',textAlign:'left',display:'flex',justifyContent:'flex-start',aligItems:'center', border:'0.2px solid grey',borderRadius:'20px',boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'}} onClick={()=>{selectAConversation(item)}}>
          <Grid item xs={9}>{item.candidateName}
          </Grid>
          <Grid item xs={12}>{item.lastMessage}
          </Grid>
          <Grid item xs={12} sx={{textAlign:'right'}}>{item.createdAt}
          </Grid>
        </Grid>
        )}
      </div>:
      allLastMessages && allLastMessages.length===0?
      <div>no messages</div>:
      <div>Loading...</div>}
    </div>
  )
}

export default LastMessage