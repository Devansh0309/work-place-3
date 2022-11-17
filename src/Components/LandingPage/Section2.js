import React from 'react'
import './Section2.css'
import Section2Card from './Section2Card'
import Horn from '../../assets/horn.png'
function Section2() {
  let Section2Cards=[{image:Horn,job:'Marketing & Communication',jobsAvailable:'265'},
  {image:Horn,job:'Marketing & Communication',jobsAvailable:'265'},
  {image:Horn,job:'Marketing & Communication',jobsAvailable:'265'},
  {image:Horn,job:'Marketing & Communication',jobsAvailable:'265'}
  ];
  return (
    <div className='section2-container'>
      <h1 className='section2-heading'>One Platform Many <span className='section2-focus'>Solutions</span></h1>
      <div className='section2-cards-list'>
        {Section2Cards.map(ele=>
          <Section2Card icon={ele.image} job={ele.job} jobsAvailable={ele.jobsAvailable}/>
        )}
      </div>
    </div>
  )
}
export default Section2