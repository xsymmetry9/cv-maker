/* eslint-disable react/prop-types */
import {format} from 'date-fns';
import InputGroups from '../InputGroups.jsx';

const Experience = ({data, handleExperience, handleWork}) =>{
    const formattedDate = (date) =>{
        date != "" ? format(new Date(date), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')
    }
    const Add =()=>{
        return(
            <button 
                type='button'
                className="w-full py-2 bg-green-700 hover:bg-green-700/70 text-slate-50 font-medium"
                onClick={handleExperience.add}
            >Add</button>
        )
    }
    const Delete = (obj) =>{
        return (
            <button
                type='button'
                className="mt-1 py-1 px-3 rounded-md bg-red-300 hover:bg-red-500 text-slate-50 text-xs font-bold" 
                onClick = {() => handleExperience.delete(obj.itemId)}
                >X</button>
        )
    }

    return(
        <>
          <div className="">
            <label htmlFor="experiences"></label>
            <ul className="">
                {
                    data.map((job, index) => 
                    (<div key={index}>
                        <div className='py-3 px-2 flex justify-between items-center bg-slate-300/50 '>
                            <h3>Field {index + 1}</h3>
                            <Delete itemId = {job.id}/>
                        </div>
                        <li className="py-8 experience-list no-style-list" key={job.id}>
                            <div className='px-3 grid grid-cols-2 gap-3'>
                                <InputGroups 
                                    labelName = {"Company Name:"}
                                    htmlFor = {`company`}
                                    data= {job.company}
                                    name = {`company`}
                                    type="text"
                                    handle={(e) => handleExperience.edit(e, job.id)}
                                    placeholder="Company"/>
                                <InputGroups 
                                    labelName = {"Job title:"}
                                    htmlFor = {`job-title`}
                                    data= {job.position}
                                    name = {`position`}
                                    type="text"
                                    handle={(e) => handleExperience.edit(e, job.id)}
                                    placeholder="Position"/>
                            </div>
                            <div className='px-3 grid grid-cols-2 gap-3'>
                                <InputGroups 
                                    labelName = {"Start:"}
                                    htmlFor = {`date`}
                                    data= {formattedDate(job.date.start)}
                                    name = {`start`}
                                    type="date"
                                    handle={(e) => handleExperience.editDate(e, job.id)}/>
                                <InputGroups 
                                    labelName = {"End:"}
                                    htmlFor = {`date`}
                                    data = {formattedDate(job.date.end)}
                                    name = {`end`}
                                    type="date"
                                    handle={(e) => handleExperience.editDate(e, job.id)}/>
            
                            </div>
                            <div className='py-3 px-3 flex gap-3 items-center'>
                                <h3>Add a job description</h3>
                                <button 
                                    className='bg-green-700 hover:bg-green-700/50 mt-1 py-1 px-3 rounded-md text-xs text-white font-bold'
                                    onClick= {() => handleWork.add(job.id)}>+
                                </button>
                            </div>
                            {
                            job.duties.map((task, taskNum) =>{
                                return(
                                    <div className="border border-b-slate-500/10 grid grid-cols-1 list-disc list-inside" key={taskNum}>
                                        <div className='px-3 pb-3 flex gap-3'>

                                            <InputGroups 
                                                id = {task.id}
                                                class = "grow"
                                                labelName = {`duties-${taskNum}`}
                                                htmlFor = {`duties-${taskNum}`}
                                                data= {task.text}
                                                name = {`duties-${taskNum}`}
                                                type="textarea"
                                                handle={(e) => handleWork.edit(e, job.id, taskNum)}
                                                placeholder="Enter description of the job"/>

                                            <div className='flex gap-1' id='nav-control'>
                                                <button 
                                                    type="button"
                                                    onClick = {() =>{ handleWork.delete(job.id, task.id)}}
                                                    className="mt-1 py-1 px-3 h-7 rounded-md bg-red-300 hover:bg-red-500 text-slate-50 text-xs font-bold" 
                                                >x</button>
                                            </div>
                                        </div>

                                    </div>
                    
                             
                                )
                            })}
                            
                    
                        </li>
                        
                    </div>)
                )}
                
            </ul>
            <Add />

 
        </div>
        </>
    )
}

export default Experience;