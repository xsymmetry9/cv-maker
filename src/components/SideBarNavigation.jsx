/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

const SideBarNavigation = ({data, handle}) =>{

    const getIcon =  (item) =>{
        if(item === "information")
        {
            return "fa-user-tie"
        } else if (item === "style"){
            return "fa-shapes"
        } else if(item === "preview"){
            return "fa-magnifying-glass"
        } else{
            alert("error");
        }
    };

    const Button = ({name, handle}) =>{
        return(
            <button className='flex gap-3 items-center px-3 border-y border-stone-500 hover:bg-stone-500 h-[150px]' name={name} onClick= {handle}>
                <i className={`fa-solid ${getIcon(name)} text-slate-50`}></i>
                <span className='font-bold text-slate-50'>{name.toUpperCase()}</span>
            </button>
        );
    };
    return(
        <div className="flex flex-col gap-9">
            {data.map((item, index) =>{ 
                return(
                    <Button key={index} name ={item} handle={handle}/>)}
                    )}
        </div> 
    )
}

export default SideBarNavigation;