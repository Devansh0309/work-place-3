import React from 'react'
import Footer from './Footer'
import HeaderSection from './HeaderSection'
import Section2 from './Section2'
import Section3 from './Section3'
import Section4 from './Section4'
import { ColorContext } from '../../Context/DarkMode'
import { useContext } from 'react'


function LandingPage() {
  const [state,]=useContext(ColorContext)
  return (
    <div
    style={{color:state.darkMode?'white':'black',backgroundColor:state.darkMode?'grey':'white'}}
    >
      <HeaderSection/>
      <Section2/>
      <Section3/>
      <Section4/>
      <Footer/>
    </div>
  )
}

export default LandingPage