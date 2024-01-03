/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

const SideBarNavigation = ({data}) =>{

    const handle = (e) =>{
        console.log(e.target.name);
    }

    const Button = ({name}) =>{
        return(
            <button className='border-y border-stone-500 hover:bg-stone-500 h-[150px]' name={name} onClick= {handle}>
                <span className='font-bold text-slate-50'>{name.toUpperCase()}</span>
            </button>
        )
    }

    return(
        <div className="flex flex-col justify-center gap-9 side-bar bg-stone-600">
            {data.map((item, index) =>{ 
                return(
                    <Button key={index} name = {item}/>)}
                    )}
        </div> 
    )
}

export default SideBarNavigation;