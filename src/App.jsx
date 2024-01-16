import DEFAULT_DATA from "./components/Default_Data.jsx"
import PersonalInformation from "../src/components/pages/PersonalInformation.jsx";
import Summary from "../src/components/pages/Summary.jsx";
import Skills from "./components/pages/Skills.jsx";
import Experience from "./components/pages/Experience.jsx";
import Education from "./components/pages/Education.jsx";
import {useState} from 'react'
import uuid4 from "uuid4";
import {format} from 'date-fns'
import './index.css'
import Resume from './components/Resume.jsx';
import InfoForm from "./components/InfoForm.jsx";
import CustomForm from "./components/CustomForm.jsx";
import ColorForm from './components/ColorForm.jsx';
import FontForm from "./components/FontForm.jsx"
import Languages from "./components/pages/Languages.jsx";
import SideBarNavigation from "./components/SideBarNavigation.jsx";
import Title from "./components/Title.jsx";

function App() {
  const [open, setNewPage] = useState(()=>{
    const initiatePages = {"information": false, "style": false, "preview": false}
    initiatePages["information"] = true;
    return initiatePages;
  })
  const navControl = (e) =>{
    const name = e.currentTarget.name;
    if(name === "information" || name === "style" || name === "preview")
    {
      const initiatePages = {"information": false, "style": false, "preview": false}
      initiatePages[e.currentTarget.name] = true;
      setNewPage(initiatePages);
    } else if(name === "new")
      {
        newResume();
    } else{
      console.log(name);
    }
  }
  const newResume = () =>{
    console.log(DEFAULT_DATA);
  }

  const [data, setData] = useState(DEFAULT_DATA);

  const [layout, setLayout] = useState([
    {name: "left", resumeLayout: "grid grid-cols-[250px_1fr]", header: "left | order-none", nav: "flex-col", isSelected: false},
    {name: "right", resumeLayout: "grid grid-cols-[1fr_250px]", header: "right | order-last", nav: "flex-col", isSelected: false}, 
    {name: "top", resumeLayout: "", header: "top | block order-none", nav: "justify-center pb-3", isSelected: true}]);
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
  const [font, changeFont] = useState(
  [  {name: "serif", isSelected: true},
    {name: "mono", isSelected: false},
    {name: "sans", isSelected: false}]
  )
  const getFont = () =>{
    let temp;
    font.forEach((item) =>{
      if(item.isSelected)
      {
        temp = item;
      }
    });
    return temp;
  };
  let setFont = getFont();
 
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
    setColor({...color, 
      background: e.currentTarget.value})
  }

  const handleFont = (e) =>{
    const name = e.currentTarget.name;
    changeFont(
      font.map((item) => {
        return {...item, isSelected: item.name === name,
        };
      })
    );
  };
  return (
    <>
      <div className= "grid grid-cols-[200px_1fr] h-[100vh] bg-stone-300">
        <header className="flex flex-col row-span-full bg-stone-600 relative">
          <Title name ="CV Maker"/>
          <SideBarNavigation data = {["new","save","information", "style", "preview","resume"]} handle={navControl}/>
        </header>
        <div className="grid grid-flow-col overflow-auto">
          {/* Input Information */}
          <div id="info-page" className={`${open.information ? "block" : "hidden"} w-[700px] mx-auto overflow-auto`}>
            <InfoForm items = {[
                {key: 'personalInfo', name:'Personal Information', component: <PersonalInformation  data= {data.personalInfo} handleForm={handlePersonal}/>},
                {key: 'education', name:'Education', component: <Education data={data.education} handleEducation = {handleEducation}/>},
                {key: 'summary', name: 'Summary',  component: <Summary data={data.summary} handleForm = {handlePersonal.handleAbout} />},
                {key: 'experience', name: 'Experience', component: <Experience data = {data.experience} handleExperience = {handleExperience} handleWork = {handleWork}/>},
                {key: 'skills', name: 'Skills', component: <Skills data = {data.skills} handleSkill = {handleSkill}/>},
                {key: 'languages', name: 'Languages', component: <Languages data = {data.language} handle = {handleLanguage}/> }]}/>
          </div>  
          {/* Customizable */}
          <div id="custom-page" className={`${open.style ? "block" : "hidden"} w-[700px] mx-auto overflow-auto`}>
            <CustomForm layout = {layout} items = {[
              {key: 'top', name: 'top'},{key:'left', name: 'left'},{key:'right', name: 'right'}]} handle={handleOutline} backgroundColor= {color.background}/>
            <ColorForm color = {color} handle = {handleColor}/>
            <FontForm font ={font} handle={handleFont} />
          </div>

          {/* Resume  */}
          <div className={`block overflow-auto`}>
            <Resume items = {data} layout = {obj} color = {color} font = {setFont} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
