import React from 'react'
import SectionFourBanner from '../../assets/SectionFourBanner.png'
import Subscribe from '../../assets/Subscribe.png'

function Section4() {
  return (
    <div style={{
      margin: 'auto',
      marginTop:'100px'
      }}>
        <img src={SectionFourBanner} alt="" style={{height:'90%',width:'100%'}}/>
        <br/>
        <br/>
        <img src={Subscribe} alt="" style={{height:'10%',width:'100%'}}/>
    </div>
  )
}

export default Section4