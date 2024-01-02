/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const PlotCircles = ({level}) =>{
    const circleArray = Array.from({ length: 5 }, (_, i) => i < level);
    // const arr = new Array(5).fill(false);
    // for(let i = 0; i < level; i++)
    // {
    //     arr[i] = true;
    // }

    // console.log(arr);

    return(
            <div className='grid grid-cols-5 gap-1 items-center'>
                {circleArray.map((item, index)=> (
                    <div
                        key={index}
                        // style={{borderColor: item ? "lightgray" : 'gray'}}
                        className='flex justify-center items-center h-[18px] w-[18px] rounded-full border'>
                            {item && <i className='fa-solid fa-star fa-xs text-yellow-400'></i>}
                        </div>
                    )
                )
                }
            </div>
    );
};

export default PlotCircles;


