/* eslint-disable react/prop-types */
import React from 'react';

const CustomForm =({items, handle}) =>{

    return(
        <>
           <h2 className="font-bold text-center pb-3">Styling</h2>
            <div className="group-buttons flex gap-3 justify-center">
                {items.map((item) =>{
                    return(
                        <button key={item.key} className='w-[80px] py-4 border border-slate-300 border-rd hover:bg-slate-300/50'
                        name={item.name}
                        onClick={handle}>
                        {item.name.toUpperCase()}</button>
                    );

                })
            }
            </div>
        </>
    )
}
export default CustomForm;
