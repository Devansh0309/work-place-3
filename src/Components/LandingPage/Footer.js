import React from 'react'
import Logo from '../../assets/logo2.png'

function Footer() {
  return (
    <>
    <div className='footer-container' style={{display:'flex',gap:'50px',flexWrap:'wrap',justifyContent:'center',marginTop: '100px',cursor:'pointer'}}>
      <img src={Logo} alt="logo" style={{width:"100px"}}/>
      <div>
        About Us
      </div>
      <div>
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