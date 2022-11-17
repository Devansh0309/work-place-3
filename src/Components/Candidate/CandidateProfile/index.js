import React,{useEffect} from 'react'
import { Grid, TextField,Typography,Button,FormControl,Select,MenuItem,Box,Chip,OutlinedInput} from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from '../../../firebaseConfig';
import {useNavigate} from 'react-router-dom'

function CandidateProfile() {
  const [loading,setLoading]=React.useState(true)
  const [edit,setEdit]=React.useState(false)
  const navigate=useNavigate()
  const userData=JSON.parse(localStorage.getItem('user'))
  const [userInfo,setUserInfo]=React.useState({
    name:userData?userData.displayName?userData.displayName:'':'',
    email:userData?userData.email?userData.email:'':'',
    phone:'',
    education:'',
    experience:'',
    domain:'',
    skills:[]
  })
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
    setUserInfo({
      ...userInfo,
      skills:typeof value === 'string' ? value.split(',') : value,
  });
  };

  const domains=['Frontend','Backend','FullStack','DevOps','QA','Data Scientist','ML','Blockchain']

  const saveUserInfo=async(e) =>{
    e.preventDefault()
    try {
      await setDoc(doc(db, "userData", userData.uid), {
        ...userInfo,type:'candidate'
      });
      alert("Candidate details saved successfully!")
      navigate('/candidate/profile')
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
      {loading?'Loading...':<form>
      <h1>Candidate Profile</h1>
      <Grid container spacing={2} sx={{padding:'10px',maxWidth:'95%',margin:'20px auto',backgroundColor:'#fff',
      borderRadius: '5px',
      boxShadow: '3px 2px 5px 3px rgb(211,211,211),-3px -2px 5px 3px rgb(211,211,211)'
    }}>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6'>Name</Typography>
          <TextField disabled={!edit} variant='outlined' required fullWidth
          value={userInfo.name} onChange={e=>{setUserInfo({...userInfo,name:e.target.value})}}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6'>Email</Typography>
          <TextField disabled  type='email' required variant='outlined' fullWidth value={userInfo.email} onChange={e=>{setUserInfo({...userInfo,email:e.target.value})}}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6'>Phone No</Typography>
          <TextField disabled={!edit}  type='number' variant='outlined' fullWidth
          value={userInfo.phone} onChange={e=>{setUserInfo({...userInfo,phone:e.target.value})}}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6'>Education</Typography>
          <TextField disabled={!edit} variant='outlined' fullWidth
          value={userInfo.education} onChange={e=>{setUserInfo({...userInfo,education:e.target.value})}}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6'>Experience</Typography>
          <TextField disabled={!edit} variant='outlined' fullWidth
          value={userInfo.experience} onChange={e=>{setUserInfo({...userInfo,experience:e.target.value})}}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Typography variant='h6'>Domain</Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              required
              disabled={!edit}
              value={userInfo.domain}
              onChange={e=>{setUserInfo({...userInfo,domain:e.target.value})}}>
              {domains.map(e=><MenuItem value={e}>{e}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6'>Skills</Typography>
          <FormControl sx={{ m: 1, width: 300 }}>
            <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          required
          disabled={!edit}
          value={userInfo.skills}
          onChange={handleSkillsChange}
          input={<OutlinedInput id="select-multiple-chip"/>}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {skills.map(skill=> (
            <MenuItem
              key={skill}
              value={skill}
              style={getStyles(skill, userInfo.skills, theme)}>
              {skill}
            </MenuItem>
          ))}
            </Select>
          </FormControl>
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

export default CandidateProfile