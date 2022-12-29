import React,{useEffect,useContext } from 'react'
import { Grid, TextField,Button,FormControl,Select,MenuItem,OutlinedInput,InputLabel} from '@mui/material'
import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from '../../../firebaseConfig';
import {useNavigate} from 'react-router-dom'
import { ColorContext } from '../../../Context/DarkMode';

function EmployerProfile() {
  const navigate=useNavigate()
  const [state]=useContext(ColorContext)
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
  }
  async function fetchUserInfo(){
    const docRef = doc(db, "userData", userData.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUserInfo(docSnap.data())
      setLoading(false)
    } else {
      console.log("No such document!");
    }
  }
  useEffect(() =>{
    fetchUserInfo()
    },[])
  return (
    <div style={{color:state.darkMode?'white':
    'black' ,backgroundColor:state.darkMode?'darkgray':'#F2F2F2'}}>
      {loading?"Loading...":<form>
      <h1 style={{padding:'10px',margin:'0',fontWeight:'400'}}>Employer Profile</h1>
      <Grid container spacing={2} sx={{padding:'10px',maxWidth:'95%',margin:'20px auto',color:state.darkMode?'#F6F7FC':'black',backgroundColor:state.darkMode?'gray':'#F6F7FC',
      borderRadius: '5px',
      boxShadow: '3px 2px 5px 3px rgb(211,211,211),-3px -2px 5px 3px rgb(211,211,211)'
    }}>
        <Grid item xs={12} sm={6}>
          <TextField id="outlined-multiline-flexible"
          label="Name"
          multiline
          maxRows={4}  disabled={!edit}variant='outlined' required fullWidth
          value={userInfo.name} onChange={e=>{setUserInfo({...userInfo,name:e.target.value})}}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="outlined-multiline-flexible"
          label="Email"
          multiline
          maxRows={4} disabled  type='email' required variant='outlined' fullWidth value={userInfo.email} onChange={e=>{setUserInfo({...userInfo,email:e.target.value})}}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="outlined-multiline-flexible"
          label="Phone No"
          multiline
          maxRows={4} disabled={!edit} type='number' variant='outlined' fullWidth
          value={userInfo.phone} onChange={e=>{setUserInfo({...userInfo,phone:e.target.value})}}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="outlined-multiline-flexible"
          label="Company Name"
          multiline
          maxRows={4} disabled={!edit}  variant='outlined' fullWidth
          value={userInfo.companyName} onChange={e=>{setUserInfo({...userInfo,companyName:e.target.value})}}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="outlined-multiline-flexible"
          label="Company Website"
          multiline
          maxRows={4} disabled={!edit}  required variant='outlined' fullWidth
          value={userInfo.companyWebsite} onChange={e=>{setUserInfo({...userInfo,companyWebsite:e.target.value})}}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="outlined-multiline-flexible"
          label="Company Website"
          multiline
          maxRows={4} disabled={!edit}  type='number' variant='outlined' fullWidth
          value={userInfo.companySize} onChange={e=>{setUserInfo({...userInfo,companySize:e.target.value})}}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="outlined-multiline-flexible"
          label="Company Address"
          multiline
          maxRows={4} disabled={!edit}  variant='outlined' fullWidth
          value={userInfo.companyAddress} onChange={e=>{setUserInfo({...userInfo,companyAddress:e.target.value})}}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Industry</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              required
              input={<OutlinedInput id="select-simple" label='Industry'/>}
              disabled={!edit} 
              value={userInfo.industry}
              onChange={e=>{setUserInfo({...userInfo,industry:e.target.value})}}>
              {industry.map(e=><MenuItem value={e}>{e}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="outlined-multiline-flexible"
          label="HR Email"
          multiline
          maxRows={4} type='email' disabled={!edit}  required variant='outlined' fullWidth
          value={userInfo.hrEmail} onChange={e=>{setUserInfo({...userInfo,hrEmail:e.target.value})}}/>
        </Grid>

        <Grid item xs={12} sm={12}>
          {!edit?<Button variant='contained' onClick={()=>setEdit(true)}>Edit</Button>:
          <div style={{"display":"flex","justifyContent":"center","gap":"20px"}}>
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