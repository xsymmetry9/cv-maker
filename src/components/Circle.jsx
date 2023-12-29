/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const Circle = ({ icon, name, color}) =>{

    return(
        <>
            <div style= {{borderColor: color}} className='border-2 px-1 py-1 rounded-full bg-slate-50'>
                <div style= {{borderColor: color, color: color}} className="circle bg-inherit">
                    <i className={icon} alt={name}></i>
                </div>
            </div>
         
        </>
    )
}

export default Circle;
