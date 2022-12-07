import React,{useContext} from 'react'
import { ColorContext } from '../../Context/DarkMode'
import { Button } from '@mui/material'
function Section3Card({key,icon,job,company,jobDescription,salary,time}) {
    const [state,dispatch]=useContext(ColorContext)
  return (
    <div className='section3-card-container'
     style={{backgroundColor:(state.darkMode?'dimgrey':'#fff')}}
     >
        <div className='section3-card-top'>
            <div className='section3-card-svg'>
                <img src={icon} alt="not found"/>
            </div>
            <h4 className='section3-card-heading'>
                {company}
            </h4>
        </div>
        <div className='section3-card-middle'>
            <h2 style={{margin:'0'}}>{job}</h2>
            <h6 style={{margin:'0'}}>{time}</h6>
            <p>{jobDescription}</p>
        </div>
        <div className='section3-card-bottom'>
            {salary}
            <button type="button">Apply Now</button>
        </div>
    </div>
  )
}
export default Section3Card