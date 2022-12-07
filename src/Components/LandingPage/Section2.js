import React, { useContext } from 'react'
import './Section2.css'
import Section2Card from './Section2Card'
import Horn from '../../assets/horn.png'
import { ColorContext } from '../../Context/DarkMode';
function Section2() {
  let Section2Cards=[
    {key:1,image:Horn,job:'Marketing & Communication',jobsAvailable:'265'},
  {key:2,image:Horn,job:'Marketing & Communication',jobsAvailable:'265'},
  {key:3,image:Horn,job:'Marketing & Communication',jobsAvailable:'265'},
  {key:4,image:Horn,job:'Marketing & Communication',jobsAvailable:'265'}
  ];
  const [state,dispatch]=useContext(ColorContext)
  return (
    <div className='section2-container' 
    style={{color:state.darkMode?'white':'black',backgroundColor:state.darkMode?'darkgrey':'#F6F7FC'}}
    >
      <h1 className='section2-heading'>One Platform Many <span className='section2-focus'>Solutions</span></h1>
      <div className='section2-cards-list' 
      style={{color:state.darkMode?'white':'black'}}
      >
        {Section2Cards.map(ele=>
          <Section2Card icon={ele.image} job={ele.job} jobsAvailable={ele.jobsAvailable} key={ele.key}/>
        )}
      </div>
    </div>
  )
}
export default Section2