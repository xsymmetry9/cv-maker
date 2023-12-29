/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useState} from 'react'

const Duties = ({data, handle, fieldNum}) =>{
    const [toggleStates, setToggleStates] = useState(() =>{
            const initialStates = new Array(data.length).fill(false);
            return initialStates
        });
    const editTask = (index) =>{
        setToggleStates((prevStates) =>{
            const newStates = [...prevStates];
            newStates[index] = !newStates[index]
            return newStates;
        })
    }
    const List = () =>{
        return(
            data.map((item, index) => (
                <div className ="border border-b-slate-500/10 grid grid-cols-1 list-disc list-inside" key={item.id}>
                    <div className='px-3 pb-3 flex gap-3'>
                        <div className ={`${toggleStates[index] ? "hidden" : "block"}`} aria-expanded = "false">
                            <p className='pb-3'>{item.text}</p>
                        </div>
                        <label className="grow" key={index}>
                            <textarea
                                className={`${!toggleStates[index] ? "hidden" : "block"} mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                                value = {item.text}
                                onChange={(e) => handle(e, fieldNum, index)}>
                            </textarea>
                        </label>
                        <div className ="flex gap-1"id='nav-control'>
                            <button
                                className="mt-1 py-1 px-3 h-7 rounded-md bg-green-300 hover:bg-green-500 text-slate-50 text-xs font-bold" 
                                onClick= {() =>{editTask(index)}}
                                type="button">edit</button>
                            <button 
                                type="button"
                                className="mt-1 py-1 px-3 h-7 rounded-md bg-red-300 hover:bg-red-500 text-slate-50 text-xs font-bold" 
                                >x</button>
                        </div>
                    </div>
          
                </div>))
        )
    }

    return(
        <div className=''>
            {data.length > 0 ? <List /> : <p>Add a job description</p>}
              
        </div>
    )
}
export default Duties;