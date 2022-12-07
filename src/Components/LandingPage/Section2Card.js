import React,{useContext} from 'react'
import { ColorContext } from '../../Context/DarkMode'
function Section2Card({icon,job,jobsAvailable,key}) {
    const [state,dispatch]=useContext(ColorContext)
  return (
    <div className='section2-card-container'
     style={{backgroundColor:(state.darkMode?'dimgrey':'white')}}
     >
        <div className='card-top'>
            <div className='card-svg'>
                <img src={icon} alt="not found"/>
            </div>
            <h3 className='card-heading'>
                {job}
            </h3>
        </div>
        <div className='card-bottom'>
            {jobsAvailable} jobs available
        </div>
    </div>
  )
}

export default Section2Card