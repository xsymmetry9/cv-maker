import DEFAULT_DATA from "./components/Default_Data.jsx"
import PersonalInformation from "../src/components/pages/PersonalInformation.jsx";
import Summary from "../src/components/pages/Summary.jsx";
import Skills from "./components/pages/Skills.jsx";
import Experience from "./components/pages/Experience.jsx";
import Education from "./components/pages/Education.jsx";
import {useState, useEffect} from 'react'
import uuid4 from "uuid4";
import {format} from 'date-fns'
import './index.css'
import Resume from './components/Resume.jsx';
import InfoForm from "./components/InfoForm.jsx";
import CustomForm from "./components/CustomForm.jsx"
import Languages from "./components/pages/Languages.jsx";
import SideBarNavigation from "./components/SideBarNavigation.jsx";
import Title from "./components/Title.jsx"



function App() {
  const [open, setNewPage] = useState(()=>{
    const initiatePages = {"information": false, "style": false, "preview": false}
    initiatePages["information"] = true;
    return initiatePages;
  })
  const navControl = (e) =>{
    const initiatePages = {"information": false, "style": false, "preview": false}
    initiatePages[e.currentTarget.name] = true;
    setNewPage(initiatePages);
  }

  const [data, setData] = useState(DEFAULT_DATA);

  const [layout, setLayout] = useState([
    {name: "left", resumeLayout: "grid-cols-[250px_1fr]", header: "left order-none", nav: "flex-col", isSelected: false},
    {name: "right", resumeLayout: "grid-cols-[1fr_250px]", header: "right order-last", nav: "flex-col", isSelected: false}, 
    {name: "top", resumeLayout: "", header: "top order-none", nav: "justify-center", isSelected: true}]);

  const getLayout = () =>{
      let obj;
      layout.forEach((item) =>{
          if(item.isSelected){
              obj = item;
          }
      })
      return obj;
  }

 let obj = getLayout();

  const [color, setColor] = useState({
    background: "#000000",
    text: "black"
  });
 
  const handlePersonal = {
    handle: (e) =>{
      const name = e.currentTarget.name;
      
      setData({...data,
      personalInfo: {...data.personalInfo,
      [name]: e.currentTarget.value}})
    },

    handleContact: (e) =>{
      const name = e.currentTarget.name;
      setData({...data,
        personalInfo:{...data.personalInfo,
          contact:{...data.personalInfo.contact,
            [name]: e.currentTarget.value}
          }
      });
    },
    handleLocation: (e) =>{
      const name = e.currentTarget.name;
      setData({...data,
      personalInfo:{...data.personalInfo,
        location: {...data.personalInfo.location,
          [name]: e.currentTarget.value}}})
    },
    
  handleAbout: (e) =>{
    setData({...data,
    summary: e.currentTarget.value})}
  }; 

  const handleEducation = {
    edit: (e, id) =>{
      setData({
        ...data, education: data.education.map((item) =>{
          if(item.id === id)
          {
            return{...item, [e.currentTarget.name]: e.currentTarget.value}
          } else {
            return item;
          }
        })
      });
    },
    delete: (id) =>{
      setData({
        ...data, education: data.education.filter(item => item.id !== id)
      });
    },
    add: () =>{
      setData({
        ...data,
        education: [...data.education, {id: uuid4(), school: "", date: { start: "", end: "" }, subject: ""}]
      });
    },
    date: (e, id) =>{
      const {name, value} = e.currentTarget;
      const formattedDate = format(new Date(value), 'MM/dd/yyyy');

      setData({...data, 
        education: data.education.map((item) =>{
          if(item.id === id)
          {
            return {...item,
              date: {...item.date, 
                [name] : formattedDate,
              },
            };
          } else{
            return item;
          }
        }),
      });
    }

  };

  const handleSkill = {
    add: () =>{setData({...data, skills: [...data.skills, {id: uuid4(), text: ""}]})},

    delete: (id) =>{setData({...data, skills: data.skills.filter(skill => skill.id !== id)})},

    edit: (e, id) =>{
      setData({...data,
        skills: data.skills.map(skill =>{
          if(skill.id === id){
            return{...skill, text: e.target.value};
          } else{
            return skill;
          }
        }),
      });
    },
    editLevel: (newLevel, id) =>{
      setData({...data,
        skills: data.skills.map((item =>{
          if(item.id === id){
            return{...item, level: newLevel}
          } else {
            return item;}
          }
        ),
      )
    });
  }
  }

  const handleLanguage = {
    add: () =>{setData({...data, language: [...data.language, {id: uuid4(), name: "", level:""}]})},

    delete: (id) =>{setData({...data, language: data.language.filter(item => item.id !== id)})},

    edit: (e, id) =>{
      setData({...data,
        language: data.language.map((item) =>{
          if(item.id === id){
            return{...item, name: e.target.value}
          } else {
            return item;
          }
        })
      })
    },

    editLevel: (newLevel, id) =>{
      setData({...data,
        language: data.language.map((item =>{
          if(item.id === id){
            return{...item, level: newLevel}
          } else {
            return item;}
          }
        ),
      )
    });
  }
}

  const handleExperience = {
    edit: (e, id) =>{
      const name = e.currentTarget.name;
      setData({...data,
        experience: data.experience.map(job =>{
          if(job.id === id){
            return{...job, [name]: e.target.value}
          } else{
            return job
          }
        })
      })
    },

    add: () => {
      setData({...data,
        experience: [...data.experience, {id: uuid4(), company: "", position: "", date: {start: "", end: ""}, duties: []}]
      });
    },

    delete: (id) =>{
      setData({...data, experience: data.experience.filter(job => job.id !== id)})
    },

    editDate: (e, id) =>{
      const name = e.currentTarget.name;
      const formattedDate = format(new Date(e.currentTarget.value), 'MM/dd/yyyy');
      setData({...data, 
        experience: data.experience.map((job) =>{
          if(job.id === id){
            return{
              ...job,
              date:{
                ...job.date,
                [name]: formattedDate,
              },
            };
          } else{
            return job;
          }
      }),
    });
    }
  }

  const handleWork = {
    add: (taskNum) => {
      setData({...data,
        experience: data.experience.map((items, index) =>{ 
          if(items.id === taskNum){
            return{
              ...items,
              duties: [...data.experience[index].duties, {id: uuid4(), text: ""}]
            }
          } else{
            return items;
          }
        })
      })
   
    },
    delete: (fieldNum, taskNum) =>{
      setData({...data,
        experience: data.experience.map((items, index) =>{
          if(items.id === fieldNum){
            return{
              ...items,
              duties: data.experience[index].duties.filter((item) => item.id != taskNum)
              }
            }
             else{
              return items;
          }
        }),
      });
    },
    edit:(e, fieldNum, taskIndex) =>{
      setData({...data, 
        experience: data.experience.map((job) =>{
          if(job.id === fieldNum){
            return{
              ...job,
              duties:
                job.duties.map((duty, index) => {
                  if(index === taskIndex)
                  {
                    return{
                      ...duty,
                      text: e.target.value,
                    };
                  } else {
                    return duty;
                  }
                }),
              };
            } else {
              return job;
            }
          }),
        });

      }
  }

  const handleOutline = (e) =>
  {
    const name = e.currentTarget.name;
    setLayout(
      layout.map((item) => {
        return {...item, isSelected: item.name === name,
        };
      })
    );
  };
  
  // const hexToRgb = (hex) =>{
  //   var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  //   return result ? {
  //     r: parseInt(result[1], 16),
  //     g: parseInt(result[2], 16),
  //     b: parseInt(result[3], 16)
  //   } : null;
  // }

  const handleColor = (e) =>{
    // const hex = e.currentTarget.value;

    setColor({...color, 
      background: e.currentTarget.value})
  }
  return (
    <>
      <div className= "grid grid-cols-[200px_1fr] h-[100vh] bg-stone-300">
        <header className="flex flex-col row-span-full bg-stone-600 relative">
          <Title name ="CV Maker"/>
          <SideBarNavigation data = {["information", "style", "preview"]} handle={navControl}/>
        </header>
        <div className="grid grid-cols-2 overflow-auto">
          <div id="info-page" className={`${open.information ? "block" : "hidden"} overflow-auto`}>
          <InfoForm items = {[
              {key: 'personalInfo', name:'Personal Information', component: <PersonalInformation  data= {data.personalInfo} handleForm={handlePersonal}/>},
              {key: 'education', name:'Education', component: <Education data={data.education} handleEducation = {handleEducation}/>},
              {key: 'summary', name: 'Summary',  component: <Summary data={data.summary} handleForm = {handlePersonal.handleAbout} />},
              {key: 'experience', name: 'Experience', component: <Experience data = {data.experience} handleExperience = {handleExperience} handleWork = {handleWork}/>},
              {key: 'skills', name: 'Skills', component: <Skills data = {data.skills} handleSkill = {handleSkill}/>},
              {key: 'languages', name: 'Languages', component: <Languages data = {data.language} handle = {handleLanguage}/> }]}/>
          </div>  
          <div id="custom-page" className={`${open.style ? "block" : "hidden"} overflow-auto`}>
          <CustomForm layout = {layout} items = {[
            {key: 'top', name: 'top'},{key:'left', name: 'left'},{key:'right', name: 'right'}]} handle={handleOutline} backgroundColor= {color.background}/>
    
          <div id="color" className={`style-card mt-12 bg-stone-100 shadow shadow-sm shadow-stone-700/50 rounded-md`}>
            <h2 className="font-bold text-center text-2xl pb-7 pt-3">Color</h2>
            <label className="flex gap-3 items-center justify-center">
              <span>Accent Color</span>
              <div style ={{backgroundColor: color.background}} className="w-[40px] h-[40px] rounded-full cursor-pointer">
                <input className =" h-full w-full opacity-0 cursor-pointer" type="color" value={color.background} onChange={handleColor}>
                </input>
              </div>
            </label>
          </div>
          </div>
          <div className={`block overflow-auto`}>
          <Resume items = {data} layout = {obj} color = {color}/>
        </div>
        </div>

     

  
      </div>

      
    </>
  )
}

export default App;
