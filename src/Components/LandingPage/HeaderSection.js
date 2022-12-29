import React from 'react'
import NavBar from './NavBar'
import './HeaderSection.css'

function HeaderSection(){

  return(
    <div>
        <NavBar/>
        <br/>
        <br/>
        <br/>
        <div className='header-container'>
          <h1 className='header-heading'>Get the <span className='header-focus'>Right Job</span> you deserve</h1>
          <p className='header-subheading'>768 jobs and 110 candidates are registered</p>
        </div>
    </div>
  )
  
}

export default HeaderSection