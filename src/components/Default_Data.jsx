import uuid4 from 'uuid4';

const Data = {
  personalInfo: {
    fullName: "Gary Lei",
    contact: {
      phone: "305-669-2919",
      email: "glswim@gmail.com",
      linkedinProfile: "https://www.linkedin.com",
    },
    location:{city: 'Miami', state: 'FL', country: 'USA'}

  },
  education: [
    {
      id: uuid4(),
      school: "University of Massachusetts - Amherst",
      date: { start: "09/17/2005", end: "06/12/2009" },
      subject: "Bachelor Degree of Economics"
    },
  ],
  summary: "Gary Lei is a dedicated professional seeking a career transition from ESL teaching to software engineering. Possessing a strong foundation in teaching methodologies, classroom management, and curriculum development, Gary is adept at fostering a positive and inclusive learning environment. With a keen interest in technology and programming, he has undertaken self-study and projects to acquire relevant technical skills. Gary brings a unique blend of teaching expertise and a growing proficiency in software development, making him a motivated candidate for a role in the tech industry.",
  skills: [
    { id: uuid4(), text: "Javascript", level: 4 },
    { id: uuid4(), text: "HTML", level: 4 },
    { id: uuid4(), text: "CSS", level: 4},
    { id: uuid4(), text: "REACT", level: 2}
  ],
  language:[
    {id: uuid4(), name: "English", level: 5},
    {id: uuid4(), name: "Spanish", level: 5},
    {id: uuid4(), name: "Chinese", level: 3}
  ],
  experience: [
    {
      id: uuid4(),
      company: "GEOS",
      position: "Head-teacher",
      date: {
        start: "11/20/2019",
        end: "12/01/2003"
      },
      duties:[
        { id: uuid4(), text: "Coordinated and organized community-based ESL programs, collaborating with local organizations and educational institutions."},
        { id: uuid4(), text: "Conducted needs assessments to identify language barriers, developed customized language programs, and facilitated workshops on cultural competency."},
        { id: uuid4(), text: "Implemented innovative teaching methodologies, integrating technology and interactive activities to enhance student engagement and language proficiency."}
      ]
    },
    {
      id: uuid4(),
      company: "GEOS",
      position: "Part-Time teacher",
      date: { start: "11/20/2012", end: "11/20/2019" },
      duties:[
        { id: uuid4(), text: "Developed and implemented engaging lesson plans tailored to diverse student proficiency levels, fostering a dynamic and inclusive learning environment."},
        { id: uuid4(), text: "Provided one-on-one and group instruction, addressing language acquisition needs and ensuring individualized support for students."},
        { id: uuid4(), text: "Led a team of ESL educators, overseeing curriculum development, lesson planning, and classroom management."}
      ]
    }
  ]
};

export default Data;
