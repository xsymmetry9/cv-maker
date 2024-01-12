/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

const SideBarNavigation = ({data, handle}) =>{

    const getIcon =  (item) =>{
        if(item === "new")
        {
            return "fa-regular fa-square-plus";
        }
        else if(item === "save")
        {
            return "fa-regular fa-floppy-disk";
        }
        else if(item === "information")
        {
            return "fa-user-tie";
        } else if (item === "style"){
            return "fa-shapes";
        } else if(item === "preview"){
            return "fa-magnifying-glass";
        } else if(item === "resume"){
            return "fa-solid fa-user";
        } else{
            alert("error");
        }
    };

    const Button = ({name, handle}) =>{
        return(
            <button className='flex gap-3 items-center px-3 py-1 hover:bg-stone-500' name={name} onClick= {handle}>
                <i className={`fa-solid ${getIcon(name)} text-slate-50`}></i>
                <span className='font-bold font-mono text-slate-50'>{name.toUpperCase()}</span>
            </button>
        );
    };
    return(
        <div className="flex flex-col divide-y divide-stone-300 border-b border-stone-300">
            {data.map((item, index) =>{ 
                return(
                    <Button key={index} name ={item} handle={handle}/>)}
                    )}
        </div> 
    )
}

export default SideBarNavigation;