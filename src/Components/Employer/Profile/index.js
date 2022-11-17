import React,{useEffect} from 'react'
import { Grid, TextField,Typography,Button,FormControl,Select,MenuItem} from '@mui/material'
import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from '../../../firebaseConfig';
import {useNavigate} from 'react-router-dom'

function EmployerProfile() {
  const navigate=useNavigate()
  const [edit,setEdit]=React.useState(false)
  const [loading,setLoading]=React.useState(true)
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
  const saveUserInfo=async(e)=>{
    e.preventDefault()
    try {
      await setDoc(doc(db, "userData", userData.uid), {
        ...userInfo,type:'employer'
      });
      alert("Employer details saved successfully!")
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
  async function fetchUserInfo(){
    const docRef = doc(db, "userData", userData.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUserInfo(docSnap.data())
      setLoading(false)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  useEffect(() =>{
    fetchUserInfo()
    },[])
  return (
    <div>
      {loading?"Loading...":<form>
      <h1>Employer Profile</h1>
      <Grid container spacing={2} sx={{padding:'10px',maxWidth:'95%',margin:'20px auto',backgroundColor:'#fff',
      borderRadius: '5px',
      boxShadow: '3px 2px 5px 3px rgb(211,211,211),-3px -2px 5px 3px rgb(211,211,211)'
    }}>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6'>Name</Typography>
          <TextField  disabled={!edit}variant='outlined' required fullWidth
          value={userInfo.name} onChange={e=>{setUserInfo({...userInfo,name:e.target.value})}}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography  variant='h6'>Email</Typography>
          <TextField disabled  type='email' required variant='outlined' fullWidth value={userInfo.email} onChange={e=>{setUserInfo({...userInfo,email:e.target.value})}}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6'>Phone No</Typography>
          <TextField disabled={!edit} type='number' variant='outlined' fullWidth
          value={userInfo.phone} onChange={e=>{setUserInfo({...userInfo,phone:e.target.value})}}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6'>Company Name</Typography>
          <TextField disabled={!edit}  variant='outlined' fullWidth
          value={userInfo.companyName} onChange={e=>{setUserInfo({...userInfo,companyName:e.target.value})}}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6'>Company Website</Typography>
          <TextField disabled={!edit}  required variant='outlined' fullWidth
          value={userInfo.companyWebsite} onChange={e=>{setUserInfo({...userInfo,companyWebsite:e.target.value})}}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6'>Company Size</Typography>
          <TextField disabled={!edit}  type='number' variant='outlined' fullWidth
          value={userInfo.companySize} onChange={e=>{setUserInfo({...userInfo,companySize:e.target.value})}}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6'>Company Address</Typography>
          <TextField disabled={!edit}  variant='outlined' fullWidth
          value={userInfo.companyAddress} onChange={e=>{setUserInfo({...userInfo,companyAddress:e.target.value})}}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Typography variant='h6'>Industry</Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              required
              disabled={!edit} 
              value={userInfo.industry}
              onChange={e=>{setUserInfo({...userInfo,industry:e.target.value})}}>
              {industry.map(e=><MenuItem value={e}>{e}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6'>HR Email</Typography>
          <TextField type='email' disabled={!edit}  required variant='outlined' fullWidth
          value={userInfo.hrEmail} onChange={e=>{setUserInfo({...userInfo,hrEmail:e.target.value})}}/>
        </Grid>

        <Grid item xs={12} sm={12}>
          {!edit?<Button variant='contained' onClick={()=>setEdit(true)}>Edit</Button>:<div>
          <Button variant='contained' onClick={(e)=>{setEdit(false);saveUserInfo(e)}}>Save</Button>
          <Button variant='contained' onClick={()=>setEdit(false)}>Cancel</Button>
          </div>}
          
        </Grid>
      </Grid>
    </form>}
    
    </div>
  )
}

export default EmployerProfile