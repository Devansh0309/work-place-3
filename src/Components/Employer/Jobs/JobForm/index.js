import React from 'react'
import { Grid,Button, TextField, FormControl, Select,MenuItem, Box, Chip, OutlinedInput, Typography} from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { v4 as uuidv4 } from "uuid";
import { setDoc, doc } from "firebase/firestore";
import { db } from '../../../../firebaseConfig';

function JobForm({postAjob,jobData,setJobData}){
  const userInfo=JSON.parse(localStorage.getItem('user'))
  
  const skills = [
    'HTML',
    'CSS',
    'JavaScript',
    'React Js',
    'Java',
    'Python',
    'SQL',
    'Mongo DB',
    'Git',
    'Mongoose'
  ];
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  function getStyles(skill, skills, theme) {
    return {
      fontWeight:
        skills.indexOf(skill) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const theme = useTheme();

  const handleSkillsChange = (event) => {
    const {
      target: { value },
    } = event;
    setJobData({
      ...jobData,
      skills:typeof value === 'string' ? value.split(',') : value,
  });
  };

  const domains=['Frontend','Backend','FullStack','DevOps','QA','Data Scientist','ML','Blockchain']

  const submitJob=async(e)=>{
    e.preventDefault()
    const Job_id=uuidv4()
    try {
      if(jobData.Job_id){
        await setDoc(doc(db, "jobsData", jobData.Job_id), {
          ...jobData
        });
      }
      else{
        await setDoc(doc(db, "jobsData", Job_id), {
          Job_id:Job_id, ...jobData,employerId:userInfo.uid, createdAt:new Date(),employerName:userInfo.displayName
        });
      }
      alert("Job posted successfully")
      // navigate('/candidate/profile')
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  return (
    <div>
      {postAjob?
      (<form  onSubmit={(e)=>{submitJob(e)}}  >
      <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <h1 style={{fontWeight:'300'}}>JobForm</h1>
          </Grid>
          <Grid item xs={12} sm={6}>
            <label >Job Title</label>
            <TextField
            value={jobData.title}
            required
            onChange={e=>setJobData({...jobData,title:e.target.value})}
            fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label>Location</label>
            <TextField
            value={jobData.location}
            required
            onChange={e=>setJobData({...jobData,location:e.target.value})}
            fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label >Salary</label>
            <TextField
            value={jobData.salary}
            required
            onChange={e=>setJobData({...jobData,salary:e.target.value})}
            fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label >Experience</label>
            <TextField
            value={jobData.experience}
            required
            onChange={e=>setJobData({...jobData,experience:e.target.value})}
            fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label >Job Type</label>
            <TextField
            value={jobData.jobType}
            required
            onChange={e=>setJobData({...jobData,jobType:e.target.value})}
            fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <label >Description</label>
            <TextField
            value={jobData.description}
            required
            multiline
            rows={4}
            onChange={e=>setJobData({...jobData,description:e.target.value})}
            fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Typography variant='h6'>Domain</Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              required
              fullWidth
              value={jobData.domain}
              onChange={e=>{setJobData({...jobData,domain:e.target.value})}}>
              {domains.map(e=><MenuItem value={e}>{e}</MenuItem>)}
            </Select>
          </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='h6'>Skills</Typography>
            <FormControl sx={{ m: 1, width: 300 }}>
              <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip" multiple required fullWidth
              value={jobData.skills} onChange={handleSkillsChange}
              input={<OutlinedInput id="select-multiple-chip"/>}
              renderValue={(selected) => (
               <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
               {selected.map((value) => (
               <Chip key={value} label={value} />
               ))}
               </Box>
              )} MenuProps={MenuProps}>
               {skills.map(skill=> (
               <MenuItem
                key={skill}
                value={skill}
                style={getStyles(skill, jobData.skills, theme)}>
                {skill}
                </MenuItem>))}
              </Select>
            </FormControl>
          </Grid>
      </Grid>
      <Button type='submit' variant='contained' color='primary'>Submit</Button>
      </form>):
      <div>
        Please select a job
      </div>}
    </div>
  )
}
export default JobForm