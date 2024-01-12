/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const Title = ({name}) =>{
    return(
        <div className='h-[120px] flex justify-center items-center gap-3 border-b border-slate-300'>
            <i className="fa-solid fa-briefcase fa-2xl text-slate-50"></i>
            <h1 className='text-3xl font-bold font-mono text-slate-50'>{name}</h1>
        </div>
    )
}

export default Title;