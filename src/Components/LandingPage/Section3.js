import React from 'react'
import MicrosoftJobs from '../../assets/MicrosoftJobs.jpg'
import Section3Card from './Section3Card';
import './Section3.css'
 
function Section3() {
  let Section3Cards=[

    {key:1,image:MicrosoftJobs,company:'Microsoft',job:'UI Designer',time:'Fulltime',jobDescription:'Lorem Ipsum vanna heim is hujisytoplop kopi joputiop',salary:'$2500/month'},

    {key:2,image:MicrosoftJobs,company:'Microsoft',job:'UI Designer',time:'Fulltime',jobDescription:'Lorem Ipsum vanna heim is hujisytoplop kopi joputiop',salary:'$2500/month'},

    {key:3,image:MicrosoftJobs,company:'Microsoft',job:'UI Designer',time:'Fulltime',jobDescription:'Lorem Ipsum vanna heim is hujisytoplop kopi joputiop',salary:'$2500/month'},

    {key:4,image:MicrosoftJobs,company:'Microsoft',job:'UI Designer',time:'Fulltime',jobDescription:'Lorem Ipsum vanna heim is hujisytoplop kopi joputiop',salary:'$2500/month'}
  ];
  return (
    <div className='section3-container'>
      <h1 className='section3-heading'>Featured Job Circulars</h1>
      <div className='section3-cards-list'>
        {Section3Cards.map((ele)=>{
          return <Section3Card key={ele.key} icon={ele.image} job={ele.job} company={ele.company} jobDescription={ele.jobDescription} salary={ele.salary}  time={ele.time}/>
          console.log('hi')
        })}
      </div>
    </div>
  )
}
export default Section3