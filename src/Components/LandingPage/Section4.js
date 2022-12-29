import React from 'react'
import SectionFourBanner from '../../assets/SectionFourBanner.png'
import Subscribe from '../../assets/Subscribe.png'

function Section4() {
  return (
    <div style={{
      margin: 'auto',
      marginTop:'100px',
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
      }}>
        <img src={SectionFourBanner} alt="" style={{height:'90%',width:'95%',padding:'10px'}}/>
        <br/>
        <br/>
        <img src={Subscribe} alt="" style={{height:'10%',width:'98%',padding:'10px'}}/>
    </div>
  )
}

export default Section4