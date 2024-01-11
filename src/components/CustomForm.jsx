/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';

const CustomForm =({layout, handle, backgroundColor}) =>{
    const style = `w-[80px] h-[90px] py-4 rounded-md`;
    const hover = `hover:border-slate-700 hover:border-2 `;
    return(
        <div className='style-card mt-12 bg-stone-100 shadow shadow-sm shadow-stone-700/50 rounded-md'>
           <h2 className="font-bold text-center text-2xl pb-7 pt-3">Outline</h2>
            <div className="group-buttons flex gap-3 justify-center">
                {layout.map((item) =>{
                    return(
                        <button key={item.name} className={`${item.isSelected ? "border-2 border-slate-700" : "border border-slate-300"} ${style} ${hover}`}
                        style={{background: `linear-gradient(to ${item.name}, #fff 0 70%, ${backgroundColor} 70% 100%)`}}
                        name={item.name}
                        onClick={handle}>
                        </button>
                    );

                })
            }
            </div>
        </div>
    )
}
export default CustomForm;
