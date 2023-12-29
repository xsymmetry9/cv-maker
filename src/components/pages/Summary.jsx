/* eslint-disable react/prop-types */
// const mySummary = "Gary Lei is a dedicated professional seeking a career transition from ESL teaching to software engineering. Possessing a strong foundation in teaching methodologies, classroom management, and curriculum development, Gary is adept at fostering a positive and inclusive learning environment. With a keen interest in technology and programming, he has undertaken self-study and projects to acquire relevant technical skills. Gary brings a unique blend of teaching expertise and a growing proficiency in software development, making him a motivated candidate for a role in the tech industry.";
import InputGroups from '../InputGroups'

function Summary({data, handleForm}){
    return(
        <div className="grid grid-cols-1 gap-6 py-8 px-4 border border-x-slate-400">
            <InputGroups 
                labelName ="Tell us about yourself"
                htmlFor = "summary"
                type="textarea"
                data = {data}
                rows = "10"
                cols = "40"
                handle = {handleForm}/>     
        </div>

  
    )
}
export default Summary;