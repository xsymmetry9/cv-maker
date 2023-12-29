/* eslint-disable react/prop-types */
import {format, isValid} from 'date-fns';
import InputGroups from '../InputGroups';

const Education = ({data, handleEducation}) =>{
    const formattedDate = (date) =>{
        if(isValid(new Date(date))) {
            return format(new Date(date), 'yyyy-MM-dd');
        } else {return "Invalid Date"}
    }
    const Add =()=>{
        return(
            <button 
                type='button'
                className="w-full py-2 bg-green-700 hover:bg-green-700/70 text-slate-50 font-medium"
                onClick={handleEducation.add}>Add</button>
        )
    }
    const Delete = ({itemId}) =>{
        return (
            <button
                type='button'
                className="mt-1 py-1 px-3 rounded-md bg-red-300 hover:bg-red-500 text-slate-50 text-xs font-bold" 
                onClick = {() => handleEducation.delete(itemId)}
                >X</button>
        )
    }
    return(
        <>
            {data.length === 0 && <h3 className='py-3 ml-3 text-xl'>Click the button to add your education background</h3>}
            {data.map((item, index) => 
            (<div key={index}>
                <div className='py-3 px-2 flex justify-between items-center bg-slate-300/50 '>
                    <h3>Field {index + 1}</h3>
                    <Delete itemId={item.id} />
                </div>
                <div className='grid grid-cols-1 gap-6 py-8 px-4' key={item.id}>
                    <div className="grid grid-cols-1 gap-3">
                        <InputGroups 
                            labelName = {"School Name:"}
                            htmlFor = {`school`}
                            data={item.school}
                            name = {`school`}
                            type="text"
                            handle={(e) => handleEducation.edit(e, item.id)}
                            placeholder ={`Boston University`}/>
                        <InputGroups 
                            labelName = {"Major:"}
                            htmlFor = {`subject`}
                            data={item.subject}
                            name = {`subject`}
                            type="text"
                            handle={(e) => handleEducation.edit(e, item.id)}
                            placeholder ={`Biology`}/>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                    {/* Date */}
                        <InputGroups 
                            labelName = {"Start:"}
                            htmlFor = {`date`}
                            data= {formattedDate(item.date.start)}
                            name = {`start`}
                            type="date"
                            handle={(e) => handleEducation.date(e, item.id)}/>

                        <InputGroups 
                            labelName = {"End:"}
                            htmlFor = {`date`}
                            data= {formattedDate(item.date.end)}
                            name = {`end`}
                            type="date"
                            handle={(e) => handleEducation.date(e, item.id)}/>
                    </div>
                </div>
            </div>)
            )}
            <Add />
           
        </>
      
    )
}

export default Education;