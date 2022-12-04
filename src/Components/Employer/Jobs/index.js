import React,{useState} from 'react'
import { Grid,Button } from '@mui/material'
import Sidebar from './Sidebar/index'
import JobForm from './JobForm/index'

function Jobs(){
  const [mobileSidebar, setMobileSidebar] = useState(true)
  const [postAjob,setPostAjob]=useState(false)
  const [jobData,setJobData] = useState({
    title:'',
    description:'',
    location:'',
    salary:'',
    experience:'',
    skills:[],
    jobType:'',
    domain:''
  })
  const selectAjob=(data)=>{
    setMobileSidebar(false)
    if(!data){
      setJobData({
        title:'',
        description:'',
        location:'',
        salary:'',
        experience:'',
        skills:[],
        jobType:'',
        domain:''
      })
      setPostAjob(true)
    }
    else{
      setJobData(data)
      setPostAjob(true)
    }
  }

  return(
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}
        sx={{display:{xs:mobileSidebar?'block':'none',sm:'block'}}}>
          <Sidebar selectAjob={selectAjob}/>
        </Grid>
        <Grid item xs={12} sm={9}
        sx={{display:{xs:mobileSidebar?'none':'block',sm:'block'}}}>
          <Button onClick={()=>setMobileSidebar(true)} sx={{display:{xs:'block',sm:'none'}}}>Back</Button>
          <JobForm postAjob={postAjob} jobData={jobData} setJobData={setJobData}/>
        </Grid>
      </Grid>
    </div>
  )
}

export default Jobs