import React from 'react'
import { Grid} from '@mui/material'

function LastMessage({selectAConversation,allLastMessages}) {
  return (
    <div>
      {allLastMessages  && allLastMessages.length>0?
      <div>
        {allLastMessages.map((item)=>
        <Grid container sx={{padding:'10px',margin:'10px',textAlign:'left',display:'flex',justifyContent:'flex-start',aligItems:'center'}} onClick={()=>{selectAConversation(item)}}>
          <Grid item xs={9}>{item.candidateName}
          </Grid>
          <Grid item xs={12}>{item.lastMessage}
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