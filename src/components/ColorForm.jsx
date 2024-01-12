/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
const ColorForm = ({color, handle}) =>{
    return(
        <>
            <div id="color" className={`style-card mt-12 bg-stone-100 shadow shadow-sm shadow-stone-700/50 rounded-md`}>
                <h2 className="font-bold text-center text-2xl pb-7 pt-3">Color</h2>
                <label className="flex gap-3 items-center justify-center">
                <span>Accent Color</span>
                <div style ={{backgroundColor: color.background}} className="w-[40px] h-[40px] rounded-full cursor-pointer">
                    <input className =" h-full w-full opacity-0 cursor-pointer" type="color" value={color.background} onChange={(e) => handle(e)}>
                    </input>
                </div>
            </label>
          </div>

        </>
    )
}
export default ColorForm;