/* eslint-disable react/prop-types */
import '../index.css'
import React from 'react'
import Circle from '../components/Circle'
import PlotCircles from '../components/PlotCircles'
import PersonalImage from '../components/PersonalImage'

const Resume = ({items, layout, color, font}) =>{
    const {personalInfo, summary, education, experience, language, skills} = items;
    const {name, header, resumeLayout, nav} = layout;

    console.log(font);


    const PlotSkills = () =>{
        return(
            <div className = {name === "top" ? "mx-12" : "mx-1"} id="skills">
                <div className='flex items-center gap-3 pb-3'>
                    <Circle name = "education" icon = 'fa-solid fa-clipboard-list' color={color.background}/>
                    <h3 className='text-xl font-bold'>Skills</h3>
                </div>
                    <ul role='list'>
                        {
                            skills.map((item) =>{
                                return(
                                    <li style={{color: color.background}} key = {item.id} className='custom-list | mx-3 grid grid-cols-2'>
                                        <span className='text-black'>{item.text}</span>
                                        <PlotCircles level = {item.level}/>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
        )
    }

    const PlotLanguages = () =>{
        return(
            <div className ={name === "top" ? "mx-12" : "mx-1 pb-[3rem]"} id='languages'>
                <div className= "flex items-center gap-3 pb-3">
                    <Circle name = "education" icon = 'fa-solid fa-earth-asia' color={color.background}/>
                    <h3 className= 'text-xl font-bold'>Languages</h3>
                </div>
                <ul role='list' id="languages">
                    {
                        language.map((item) =>{
                            return(
                                <li style={{color: color.background}} key={item.id} className='custom-list | mx-3 grid grid-cols-2'>
                                    <span className='text-black'>{item.name}</span>
                                    <PlotCircles level ={item.level} />
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        )
    }

    return (
        <>
            <div className = {`resume ${resumeLayout} font-${font.name}`} id="resume-layout">
                <div 
                    id="personal-info"
                    style={{borderColor:color.background, color:color.text}}
                    className = {`shadow ${header} ${name === "top" ? " border-b-2" :  "border-none"} bg-slate-50`}>

                        {name !== "top" && <PersonalImage />}

                        <h2 className={`${name === "top" ? "text-center pt-7" : "mx-3"} text-4xl font-bold`} id='fullName'>{personalInfo.fullName}</h2>
                        <ul id="contactInfo" className={`flex ${nav} gap-3 ml-3 mt-3`}> 
                            <li className='flex gap-2 items-center'>
                                <i className='fa-solid fa-phone'></i>
                                {personalInfo.contact.phone}
                            </li>  
                            <li className='flex gap-2 items-center'>
                                <i className='fa-solid fa-envelope'></i>
                                {personalInfo.contact.email}</li>  
                            <li className='flex gap-2 items-center'>
                                <i className='fa-brands fa-linkedin'></i>
                                {personalInfo.contact.linkedinProfile}
                                </li>  
                            <li className='flex gap-2 items-center'>
                                <i className='fa-solid fa-location-dot'></i>
                                {personalInfo.location.city}, {personalInfo.location.country}</li>
                        </ul>
                        {name !== "top" &&  <PlotLanguages/>}
                        {name !== "top" && <PlotSkills/>}
                </div>
                <div className="block" id="content-info">
                    <div className= "mt-7 px-12" id="about">
                        <div className='flex items-center gap-3 pb-3'>
                            <Circle name ="about" icon ="fa-solid fa-user" color={color.background}/>
                            <h3 className='text-xl font-bold'>About me</h3>
                        </div>
                        <p>{summary}</p>
                    </div>
                    <div className= "mt-7 px-12" id="education">
                        <div className='flex items-center gap-3 pb-3'>
                            <Circle name = "education" icon = 'fa-solid fa-lightbulb' color={color.background}/>
                            <h3 className='text-xl font-bold'>Education</h3>
                        </div>
                        <ul className='grid grid-col-1 gap-2'>
                            {
                                education.map((item) =>{
                                    return(
                                        <React.Fragment key={item.id}>
                                        <li className="">
                                            <div className='flex justify-between'>
                                                <p className='font-bold underline'>{item.school}</p>
                                                <p>{item.date.start} - {item.date.end}</p>
                                            </div>
                                            <p className='subject'>{item.subject}</p>
                                        </li>
                                        </React.Fragment>
                                    )
                                })
                            }
                        </ul>
                    </div> 
                    <div className= "mt-7 px-12" id="experience">
                        <div className='flex items-center gap-3 pb-3'>
                            <Circle name ="experience" icon ="fa-solid fa-briefcase" color={color.background}/>
                            <h3 className='text-xl font-bold'>Experience</h3>
                        </div>

                        <ul className="grid grid-col-1 gap-3">
                            {
                                experience.map((item) =>{
                                    return(
                                        <React.Fragment  key={item.id} >
                                        <li>
                                            <div className='flex justify-between'>
                                                <div>
                                                    <h4 className='font-bold underline'>{item.company} - <span className="font-normal">{item.position}</span></h4>
                                                </div>
                                                <span>{item.date.start} - {item.date.end}</span>
                                            </div>
                                            <ul role="list">
                                                {item.duties.map((duty) =>{
                                                    return(
                                                        <li style={{color: color.background}} className= "custom-list mx-3" key={duty.id}>
                                                            <span className='text-black'>{duty.text}</span>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </li>
                                        </React.Fragment>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    {name === "top" && <div className="grid grid-cols-2 mt-7" id='skills-languages'>
                        <PlotLanguages />
                        <PlotSkills/>
                    </div>}
            
                </div>
           
           
            </div>
         
        </>
    )
}
export default Resume;