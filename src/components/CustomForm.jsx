/* eslint-disable react/prop-types */
import React from 'react';

const CustomForm =({items, handle, backgroundColor}) =>{
    const color = "#f75555";
    console.log(backgroundColor);
    
    // const plotShape = (item) =>{
    //     if(item === "left")
    //     {
    //         return `bg-gradient-to-r from-[${color}] from-0% via-[${color}] via-30% to-30% to-[${color}] to-white`
    //     } else if(item === "right"){
    //         return `bg-gradient-to-l from-${color} from-0% via-${color} via-30% to-30% to-${color} to-white`
    //     } else if(item === "top")
    //     {
    //         return `bg-gradient-to-b from-${color} from-0% via-${color} via-30% to-30% to-${color} to-white`
    //     } else {
    //         return;
    //     }

    //     // return `bg-gradient-to-r from-[${color}] from-0% via-[${color}] via-30% to-30% to-[${color}] to-white`

    // }

    return(
        <div className='style-card mt-12 bg-stone-100 shadow shadow-sm shadow-stone-700/50 rounded-md'>
           <h2 className="font-bold text-center text-2xl pb-7 pt-3">Outline</h2>
            <div className="group-buttons flex gap-3 justify-center">
                {items.map((item) =>{
                    return(
                        <button key={item.key} className={`w-[80px] py-4 border border-slate-300 rounded-md hover:bg-slate-300/50`}
                        style={{background: "linear-gradient(to right, #ff7e5f, #feb47b"}}
                        name={item.name}
                        onClick={handle}>
                        {item.name.toUpperCase()}</button>
                    );

                })
            }
            </div>
        </div>
    )
}
export default CustomForm;
