/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';

const ToggleComponent = ({ items}) =>{
    const [toggledStates, setToggledStates] = useState(() =>{
        const initialStates = new Array(items.length).fill(false);
        initialStates[4] = true;
        return initialStates
    });

    const navHandler = (index) =>{
        setToggledStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = !newStates[index];
            return newStates;
        });
    }

    return(
        <div className="mt-12 mx-auto flex flex-col w-full max-w-screen-md">
            {
                items.map((item, index) => (
                    <div key={index}>
                        <div className={`pl-4 py-4 flex justify-between bg-slate-600 hover:bg-slate-600/50 border border-slate-300`}>
                           <h3 className='text-white font-semibold'>{item.name}</h3>
                           <button 
                                className="w-14 text-white font-semibold text-lg" 
                                onClick={() => navHandler(index)}>{toggledStates[index] ? '↑' : '↓'}
                            </button>
                        </div>
                        <div className= {`border border-x-slate-400 ${toggledStates[index] ? 'block' : 'hidden'}`}>
                            {item.component}
                        </div>
                    </div>
                ))}
    
        </div>
    );
};
export default ToggleComponent;