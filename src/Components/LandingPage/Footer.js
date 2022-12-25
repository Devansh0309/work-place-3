import React,{ useContext } from 'react'
import Logo from '../../assets/logo2.png'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'

function Footer() {
  const navigate=useNavigate()
  const [state,]=useContext(UserContext)
  return (
    <>
    <div className='footer-container' style={{display:'flex',gap:'50px',flexWrap:'wrap',justifyContent:'center',marginTop: '100px',cursor:'pointer'}}>
      <img src={Logo} alt="logo" style={{width:"100px"}}  onClick={()=>navigate('/')}/>
      <div onClick={()=>navigate('/')}>
        About Us
      </div>
      <div onClick={()=>{
        if (state.user && state.userInfo && state.userInfo.type==='candidate') {
          setTimeout(()=>{navigate("candidate/jobs")},1000)
        } 
        else if(state.user && !state.userInfo){
          setTimeout(()=>{navigate("/candidate/onboarding")},1000)
        }
        else{
          setTimeout(()=>{navigate('/candidate/auth')},1000)
        }}}>
        Jobs
      </div>
      <div>
        Contact Us
      </div>
      <div>
        Terms
      </div>
      <div>
        Privacy Policy
      </div>
    </div>
    <hr/>
    </>
  )
}

export default Footer