import React from 'react'
import { Grid, TextField,Typography,Button,FormControl,Select,MenuItem} from '@mui/material'
import { setDoc, doc } from "firebase/firestore";
import { db } from '../../../firebaseConfig';
import {useNavigate} from 'react-router-dom'

function EmployerOnboarding() {
  const navigate=useNavigate()
  const userData=JSON.parse(localStorage.getItem('user'))
  const [userInfo,setUserInfo]=React.useState({
    name:userData?userData.displayName?userData.displayName:'':'',
    email:userData?userData.email?userData.email:'':'',
    phone:'',
    companyName:'',
    companyWebsite:'',
    companySize:'',
    companyAddress:'',
    hrEmail:'',
    industry:''
  })
  
  const industry=['Automotive','IT & Software','Construction','Chemical']
  const submitUserInfo=async(e)=>{
    e.preventDefault()
    try {
      await setDoc(doc(db, "userData", userData.uid), {
        ...userInfo,type:'employer'
      });
      alert("User details submitted")
      navigate('/employer/profile')
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    // setUserInfo({
    //   name:userData?userData.displayName?userData.displayName:'':'',
    //   email:userData?userData.email?userData.email:'':'',
    //   phone:'',
    //   companyName:'',
    //   companyWebsite:'',
    //   companySize:'',
    //   companyAddress:'',
    //   hrEmail:'',
    //   industry:''
    // })
  }
  return (
    <form onSubmit={submitUserInfo}>
      <h1>Employer Onboarding</h1>
      <Grid container spacing={2} sx={{padding:'10px',maxWidth:'95%',margin:'20px auto',backgroundColor:'#fff',
      borderRadius: '5px',
      boxShadow: '3px 2px 5px 3px rgb(211,211,211),-3px -2px 5px 3px rgb(211,211,211)'
    }}>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6'>Name</Typography>
          <TextField disabled    variant='outlined' required fullWidth
          value={userInfo.name} onChange={e=>{setUserInfo({...userInfo,name:e.target.value})}}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography  variant='h6'>Email</Typography>
          <TextField disabled  type='email' required variant='outlined' fullWidth value={userInfo.email} onChange={e=>{setUserInfo({...userInfo,email:e.target.value})}}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6'>Phone No</Typography>
          <TextField type='number' variant='outlined' fullWidth
          value={userInfo.phone} onChange={e=>{setUserInfo({...userInfo,phone:e.target.value})}}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6'>Company Name</Typography>
          <TextField variant='outlined' fullWidth
          value={userInfo.companyName} onChange={e=>{setUserInfo({...userInfo,companyName:e.target.value})}}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6'>Company Website</Typography>
          <TextField required variant='outlined' fullWidth
          value={userInfo.companyWebsite} onChange={e=>{setUserInfo({...userInfo,companyWebsite:e.target.value})}}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6'>Company Size</Typography>
          <TextField type='number' variant='outlined' fullWidth
          value={userInfo.companySize} onChange={e=>{setUserInfo({...userInfo,companySize:e.target.value})}}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6'>Company Address</Typography>
          <TextField variant='outlined' fullWidth
          value={userInfo.companyAddress} onChange={e=>{setUserInfo({...userInfo,companyAddress:e.target.value})}}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Typography variant='h6'>Industry</Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              required
              value={userInfo.industry}
              onChange={e=>{setUserInfo({...userInfo,industry:e.target.value})}}>
              {industry.map(e=><MenuItem value={e}>{e}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6'>HR Email</Typography>
          <TextField type='email' required variant='outlined' fullWidth
          value={userInfo.hrEmail} onChange={e=>{setUserInfo({...userInfo,hrEmail:e.target.value})}}/>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button type='submit'>Submit</Button>
        </Grid>
      </Grid>
    </form>  
  )
}

export default EmployerOnboarding