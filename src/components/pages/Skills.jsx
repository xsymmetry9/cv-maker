/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import InputGroups from '../InputGroups'

const Skills = ({data, handleSkill}) =>{

    const SkillRadioGroup = ({skill, level, handle}) => {
        const levels = [1, 2, 3, 4, 5];
        return(
            <>
                {levels.map((option, index) =>{
                    return(
                        <label key={index} className="inline-flex items-center">
                        <input className='form-radio'
                            type='radio'
                            name={skill}
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
    return(
        <div className="grid grid-cols-1 gap-3 py-8 px-4 border border-x-slate-400 border-b-slate-400">
                {data.map((skill, index) => (
                    <div className="grid grid-cols-[1fr_1fr_100px] gap-3 items-center" key={skill.id}>
                        <InputGroups 
                            labelName = {null}
                            htmlFor = {`field-skill${index}`}
                            data={skill.text}
                            id= {`field-skill${index}`}
                            name = {`field-skill${index}`}
                            type="text"
                            handle={(e) => handleSkill.edit(e, skill.id)}
                            placeholder ={`skill ${index}`}/>
                                  <fieldset className='block'>
                        <div className='flex justify-around'>
                            <SkillRadioGroup key ={index}
                                language={skill.name}
                                level={skill.level}
                                handle = {(newLevel) => handleSkill.editLevel(newLevel, skill.id)}
                                />
                               
                            </div>
                        </fieldset>
                            
                        {data.length > 1 && (
                             <button type="button" className="py-2 rounded-md bg-red-600 hover:bg-red-600/70 text-slate-50 font-medium" onClick={() => handleSkill.delete(skill.id)}>Delete</button>
                           )
                        }                    
                    </div>
                ))}
                <button type="button" className="w-20 py-2 rounded-md bg-green-700 hover:bg-green-700/70 text-slate-50 font-medium" onClick={handleSkill.add}>Add</button>
 
        </div>
        )

}
export default Skills;