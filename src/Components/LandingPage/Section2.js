import React from 'react'
import './Section2.css'
import Section2Card from './Section2Card'
function Section2() {
  let Section2Cards=[{image:'./../horn.png',job:'Marketing & Communication',bottom:'265 jobs available'}
  ];
  return (
    
    <div className='section2-container'>
      <h1 className='section2-heading'>One Platform Many <span className='section2-focus'>Solutions</span></h1>
      <div className='section2-card-list'>
        {Section2Cards.map(ele=>
          <Section2Card icon={ele.image} job={ele.job} cardBottom={ele.bottom}/>
        )}
      </div>
    </div>
  )
}
export default Section2