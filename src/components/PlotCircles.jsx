/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const PlotCircles = ({color, level}) =>{
    const circleArray = Array.from({ length: 5 }, (_, i) => i < level);
    // const arr = new Array(5).fill(false);
    // for(let i = 0; i < level; i++)
    // {
    //     arr[i] = true;
    // }

    // console.log(arr);

    return(
            <div className='flex gap-2 items-center'>
                {circleArray.map((item, index)=> (
                    <div
                        key={index}
                        style={{background: item ? color : 'gray'}}
                        className='h-[8px] w-[8px] rounded-full'></div>
                    ))}
            </div>
    );
};

export default PlotCircles;


