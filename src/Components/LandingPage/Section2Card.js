import { type } from '@testing-library/user-event/dist/type'
import React from 'react'

function Section2Card({icon,job,cardBottom}) {
  return (
    <div className='section2-card-container'>
        <div className='card-top'>
            <div className='card-svg'>
                <img src={icon} alt="not found"/>
            </div>
            <div className='card-heading'>
                {job}
            </div>
        </div>
        <div className='card-bottom'>
            {cardBottom}
        </div>
    </div>
  )
}

export default Section2Card