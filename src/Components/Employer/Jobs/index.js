import React,{useState} from 'react'
import { Grid,Button } from '@mui/material'
import Sidebar from './Sidebar/index'
import JobForm from './JobForm/index'

function Jobs(){
  const [mobileSidebar, setMobileSidebar] = useState(true)
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}
        sx={{display:{xs:mobileSidebar?'block':'none',sm:'block'}}}>
          <Sidebar/>
        </Grid>
        <Grid item xs={12} sm={9}
        sx={{display:{xs:mobileSidebar?'none':'block',sm:'block'}}}>
          <JobForm/>
        </Grid>
      </Grid>
      <Button onClick={()=>setMobileSidebar(!mobileSidebar)}>Switch</Button>
    </div>
  )
}
export default Jobs