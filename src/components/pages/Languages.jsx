/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import InputGroups from '../InputGroups'

const SkillRadioGroup = ({language, level, handle}) => {
    const levels = [1, 2, 3, 4, 5];

    return(
        <>
            {levels.map((option, index) =>{
                return(
                    <label key={index} className="inline-flex items-center">
                    <input className='form-radio'
                        type='radio'
                        name={language}
                        checked= {level === option}
                        onChange = {() => handle(option)}
                        value={option}></input>
                    <span className='ml-2'>{option}</span>
                </label>
                )
     
        })}
        </>
  
    )

}

const Languages = ({data, handle}) =>{

    // data.map((language) =>{ console.log(language.name)})
    return(
        <div className="grid grid-cols-1 gap-3 py-8 px-4 border border-x-slate-400 border-b-slate-400">
                {data.map((language, index) => (
                    <div className="grid grid-cols-[1fr_1fr_100px] gap-3 items-center" key={language.id}>
                        <InputGroups 
                            labelName = {null}
                            htmlFor = {`field-skill-${index}`}
                            data={language.name}
                            id= {`field-language-${index}`}
                            name = {language.name}
                            type="text"
                            handle={(e) => handle.edit(e, language.id)}
                            placeholder ={`language ${index}`}/>
                        
                        <fieldset className='block'>
                            <div className='flex justify-around'>
                                <SkillRadioGroup key ={index}
                                    language={language.name}
                                    level={language.level}
                                    handle = {(newLevel) => handle.editLevel(newLevel, language.id)}
                                    />
                               
                            </div>
                        </fieldset>
                        {/* <InputGroups 
                            labelName = {null}
                            htmlFor = {`field-skill${index}`}
                            data={language.level}
                            id= {`field-language${index}`}
                            name = "level"
                            type="number"
                            min = "1"
                            max = "5"
                            handle={(e) => handle.edit(e, language.id)}
                            placeholder ={`language ${index}`}/> */}
                            
                        {data.length > 1 && (
                             <button type="button" className="py-2 rounded-md bg-red-600 hover:bg-red-600/70 text-slate-50 font-medium" onClick={() => handle.delete(language.id)}>Delete</button>
                           )
                        }                    
                    </div>
                ))}
                {/* Fix button */}
                <button type="button" className="w-20 py-2 rounded-md bg-green-700 hover:bg-green-700/70 text-slate-50 font-medium" onClick={handle.add}>Add</button>
    
 
        </div>
        )

}
export default Languages;