const getForm = document.querySelector(".form-container");
const nameInput = document.getElementById("name");
const titleInput = document.getElementById("title");
const emailInput = document.getElementById("email");
const addressInput = document.getElementById("address");
const telNumberInput = document.getElementById("tel-number");
const summaryInput = document.getElementById("summary");

const previewName = document.getElementById("preview-name");
const previewTitle = document.getElementById("preview-title");
const previewEmail = document.getElementById("preview-email");
const previewAddress = document.getElementById("preview-address");
const previewTelNumber = document.getElementById("preview-tel-number");
const previewSummary = document.getElementById("preview-summary");

const formattedDate = (date) => {
    if(!date) return "Invalid Date";

    const getMonth = date.getMonth() + 1; // Returns the month 0 - 11
    const getDay = date.getDate(); // Returns the date
    const getYear = date.getFullYear(); // REturns the year

    const formattedDate = `${getMonth}/${getDay}/${getYear}`;
    return formattedDate;
}
const populate = () => {
    previewName.textContent = cvData.name;
    previewTitle.textContent = cvData.title;
    previewEmail.textContent = cvData.email;
    previewAddress.textContent = cvData.address;
    previewTelNumber.textContent = cvData.tel_number;
    previewSummary.textContent = cvData.summary;
}

const cvData = {
    "name": "Gary",
    "title": "A Front-End Engineer Enthusiast",
    "email": "glswim@gmail.com",
    "address": "7200 sw 89th st, Miami, FL, 33156",
   "tel_number": "(786) 208 - 2268",
    "summary": "A motivated and detail-oriented professional with a passion for technology and continuous learning. Experienced in building responsive web applications and solving real-world problems through clean and efficient code. Adept at working both independently and collaboratively in fast-paced environments",
    "experience": [
        {
            "company": "GEOS",
            "company_title": "Head Teacher",
            "start": "07/05/2013",
            "finish": "Present",
            "jobs": [
                "Led curriculum planning and instructional design for over 100 students, improving learning outcomes by 25%",
                "Mentored and trained new teachers in classroom management and digital teaching tools",
                "Managed scheduling, performance evaluations, and internal documentation for the academic department",
                "Implemented digital systems for tracking student progress using spreadsheets and assessment templates",
                "Collaborated with international staff to streamline communication and create standardized teaching materials"
            ]
        }
    ],
    "education": [
        {
            "school": "University of Massachusetts - Amherst",
            "degree": "B.A in Economics",
            "start" : "2005",
            "finish": "2009"
        }
    ],
    "skills": ["HTML5", "CSS3", "JavaScript", "React", "Git", "Responsive Design"],
    "languages": [
        {
            "name": "English",
            "level": "proficient"
        },
        {
            "name": "Spanish",
            "level": "proficient"
        },
        {
            "name": "Chinese",
            "level": "Intermediate"
        },
        {
            "name": "Chinese Cantonese",
            "level": "Conversational"
        }
    ]
}
//Populate data for design
populate();

//Keeps count
let experienceCount = 1;
let educationCount = 1;

// User is able to see what they are typing
const nameHandler = (e) => {
    const {name, value} = e.currentTarget;
    const previewInput = document.getElementById(`preview-${name}`);
    previewInput.textContent= value === "" ? cvData[name] : value;
}

nameInput.addEventListener("input", nameHandler);
emailInput.addEventListener("input", nameHandler);
summaryInput.addEventListener("input", nameHandler);
addressInput.addEventListener("input", nameHandler);
telNumberInput.addEventListener("input", nameHandler);
titleInput.addEventListener("input", nameHandler);


// Experience Section  
const buttonExperience = document.querySelector("#btn-experience");

//Creates all inputs for experience
//It takes what we are inputing
const createInput = (titleName, idName, type, index) => {
    const container = document.createElement("label");
    container.textContent = titleName;
    const input = document.createElement("input");
    input.setAttribute("id", `${idName}-${index}`)
    input.setAttribute("name", `${idName}-${index}`);

    if(type === "number") input.setAttribute("type", "number");
    else if(type === "date") input.setAttribute("type", "date");
    else if(type === "email") input.setAttribute("type", "email");
    else {
        input.setAttribute("type", "text");
    }

    container.appendChild(input);
    return container;

}
// Creates a new Row for Job experience
const createFormExperience = () =>{
        //Saves the current state.  This is why React is so useful.  UseState() would be used here
        const currentExperience = experienceCount;
        //Creates a new field for user to type for their experience
        const getContainer = document.getElementById("experience");

        const wrapper = document.createElement("div");
        wrapper.setAttribute("id", `experience-${currentExperience}`);

        //Creates a title for the job section
        const title = document.createElement("h3");
        title.textContent = `Company - ${currentExperience}`;
        
        //Allows user to input company name, title job, start, and finish
        wrapper.appendChild(title);
        wrapper.appendChild(createInput("Name of company", "company", "text", currentExperience));
        wrapper.appendChild(createInput("Name of title", "title", "text", currentExperience));
        wrapper.appendChild(createInput("From", "start", "date", currentExperience));
        wrapper.appendChild(createInput("To", "finish", "date", currentExperience));

        //Adds a button to create a list of responsibilities
        const button = document.createElement("button");
        button.textContent = "Add job description";
        const unOrderedList = document.createElement("ul"); // Creates a section where user is allow to input their responsibility
        unOrderedList.setAttribute("id",`inputs-job-experience-${currentExperience}`);

        //Set a counter for job entries
        let jobEntries = 1

        // unOrderedList.appendChild(createInput(`job-entry`, "text", jobEntries));

        button.addEventListener(("click"), (e) => {
            e.preventDefault();
            if(jobEntries > 3) return;

            const currentEntry = jobEntries;
            //Append an input entry
            const label = document.createElement("label");
            label.textContent = `Entry ${currentEntry}`;

            const input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("id", `job-entry-${currentExperience}-${currentEntry}`);
            input.setAttribute("name", `job-entry-${currentExperience}-${currentEntry}`);
            unOrderedList.appendChild(label);
            unOrderedList.appendChild(input);

            //Append preview entry
            const previewList = document.getElementById(`preview-job-experience-${currentExperience}`);
            const previewItem = document.createElement("li");
            previewItem.textContent = `This is entry # ${currentEntry}`;
            previewItem.setAttribute("id",`preview-job-${currentExperience}-entry-${currentEntry}`);
            previewList.appendChild(previewItem);

            input.addEventListener(("input"), (e) => {
                const target = document.getElementById(`preview-job-${currentExperience}-entry-${currentEntry}`);
                target.textContent = e.currentTarget.value;
            })
            jobEntries++;
        });

        wrapper.appendChild(button);
        wrapper.appendChild(unOrderedList); //Creates job responsibilities

        getContainer.appendChild(wrapper);
}

//Creates a new row for Preview Job Experience
const createPreview = (index) => {
    const getContainer = document.getElementById("preview-job-experience");

    const wrapper = document.createElement("div");
    wrapper.setAttribute("id", `wrapper-${index}`);

    wrapper.innerHTML = `
    <div class="preview-experience-title-container">
        <p><strong id="preview-company-${index}">[Name of Company]</strong> - <strong id="preview-title-${index}">[Name of Title]</strong></p>
        <p><span id="preview-start-${index}">${formattedDate(new Date())}</span> - <span id="preview-finish-${index}">${formattedDate(new Date())}</span></p>
    </div>
    <ul class="list-container" id="preview-job-experience-${index}"></ul>
    
    `;

    getContainer.appendChild(wrapper);

}
const eventHandlers = (index) =>{
    const readInputCompany = document.getElementById(`company-${index}`);
    const readInputTitle = document.getElementById(`title-${index}`);
    const readInputStart = document.getElementById(`start-${index}`);
    const readInputFinish = document.getElementById(`finish-${index}`);

    readInputCompany.addEventListener("input", (e) => {
        const getPreviewCompany = document.getElementById(`preview-company-${index}`);
        getPreviewCompany.textContent = e.currentTarget.value;
    })

    readInputTitle.addEventListener("input", (e) => {
        const getPreviewTitle = document.getElementById(`preview-title-${index}`);
        getPreviewTitle.textContent = e.currentTarget.value;
    });

    readInputStart.addEventListener("input", (e) => {
        const getDate = e.currentTarget.valueAsDate;
        const getPreviewStart = document.getElementById(`preview-start-${index}`);
        getPreviewStart.textContent = formattedDate(getDate);
    });

    readInputFinish.addEventListener("input", (e) => {
        const getDate = e.currentTarget.valueAsDate;
        const getPreviewFinish = document.getElementById(`preview-finish-${index}`);
        getPreviewFinish.textContent = formattedDate(getDate);
        console.log(formattedDate(getDate));
    });

    // eventExperienceHandler(index);
}

// const eventExperienceHandler = (index) => {
//     const readContainer = document.getElementById(`inputs-job-experience-${index}`);

//     console.log(readContainer.querySelectorAll("input"));
// }
    
const btnExperienceHandler = (e) => {
    e.preventDefault();
    if(experienceCount <= 3)
    {
        createFormExperience();
        createPreview(experienceCount);
        eventHandlers(experienceCount);

        experienceCount++;
    } else {
        alert("Only 3!");
    }

}

buttonExperience.addEventListener("click", btnExperienceHandler);

const educationButton = document.getElementById("btn-education");

const addEducationHandler = (e) => {
    e.preventDefault();

    // Users are allowed to only add max of 3 entries
    if(educationCount > 3) return;
    
    //Saves the state
    const currentEducation = educationCount;

    const getEducationContainer = document.getElementById("education");

    //Adds a wrapper
    const wrapper = document.createElement("div");
    wrapper.setAttribute("id", `education-${currentEducation}`)
    //Adds Input Entry
    
    const inputTitle = document.createElement("input");
    inputTitle.setAttribute("type", "text");
    inputTitle.setAttribute("name", `nameOfInstitution-${currentEducation}`);
    inputTitle.setAttribute("id", `nameofInstitution-${currentEducation}`);
    const labelTitle = document.createElement("label");
    labelTitle.textContent = "Name of institution";
    labelTitle.setAttribute("for", `nameOfInstitution-${currentEducation}`)


    const inputMajor = document.createElement("input");
    inputMajor.setAttribute("type", "text");
    inputMajor.setAttribute("name", `major-${currentEducation}`);
    inputMajor.setAttribute("id", `major-${currentEducation}`);
    inputMajor.setAttribute("type", "text");
    const labelMajor = document.createElement("label");    
    labelMajor.textContent = "Major:";
    inputMajor.setAttribute("for", `major-${currentEducation}`)


    const labelDate = document.createElement("label");
    const inputDate = document.createElement("input");
    inputDate.setAttribute("id", `education-date-${currentEducation}`);
    inputDate.setAttribute("name", `education-date-${currentEducation}`)
    inputDate.setAttribute("type", "date");
    labelDate.textContent = "Finish Date";
    labelDate.setAttribute("for", `education-date-${currentEducation}`);

    [labelTitle, inputTitle].forEach((item) => wrapper.appendChild(item));
    [labelMajor, inputMajor].forEach((item) => wrapper.appendChild(item));
    [labelDate, inputDate].forEach((item) => wrapper.appendChild(item));

    getEducationContainer.appendChild(wrapper);

    //Adds Preview Education
    const getPreviewEducation = document.getElementById("preview-job-education");

    // const createPreviewWrapper = document.createElement("div");
    // createPreviewWrapper.setAttribute("id", `preview-education-${currentEducation}`);

    const educationLayout = document.createElement("div");
    educationButton.setAttribute("id", `preview-education-${currentEducation}`);

    educationLayout.innerHTML = `
        <div class="preview-education-title-container">
            <p class="preview-education-title" id="preview-education-major-${currentEducation}">Bachelor Degree of Social Science - Economics</p>
            <p id="preview-education-finishedDate-${currentEducation}">5/17/2025</p>
        </div>
        <p class="preview-education-major" id="preview-education-nameOfInstitution-${currentEducation}">University of Massachusetts - Amherst</p>
    `;

    getPreviewEducation.appendChild(educationLayout);
    // getPreviewEducation.appendChild(createPreviewWrapper);

    // Add even Listener for education
    inputTitle.addEventListener(('input'), (e) => {
        const getTitle = document.getElementById(`preview-education-nameOfInstitution-${currentEducation}`);
        getTitle.textContent = e.currentTarget.value;
    });

    inputMajor.addEventListener(('input'), (e) => {
        const getMajor = document.getElementById(`preview-education-major-${currentEducation}`);
        getMajor.textContent = e.currentTarget.value;
    });

    inputDate.addEventListener(("input"), (e) => {
        const getDate = document.getElementById(`preview-education-finishedDate-${currentEducation}`);
        getDate.textContent = formattedDate(e.currentTarget.valueAsDate);
    });
    educationCount++;
}

educationButton.addEventListener(("click"), addEducationHandler);

// Skills
let numOfEntries = 1;

const deleteSkillHandler = (e, child, previewChild) => {

    e.preventDefault();
    
    // Removes Input
    const getContainerParent = document.getElementById("skills");   
    const getChild = document.getElementById(child);

    if(!getChild) return; // In case of error

    getContainerParent.removeChild(getChild); // removes child of parent
        
    //Removes Preview

    if(!document.getElementById(previewChild)) return; // In case if there is an error

    const getContainerPreviewParent = document.getElementById("skill_list");
    getContainerPreviewParent.removeChild(document.getElementById(previewChild)); // removes child of parent

    numOfEntries--;

}
const skillBtn = document.getElementById("btn-skill");
const skillHandler = (e) => {
    e.preventDefault();

    // Create Input
    const getContainer = document.getElementById("skills");
    const currentEntry = numOfEntries;

    const createContainer = document.createElement("div");
    createContainer.setAttribute("id", `container-skill-input-${currentEntry}`)

    const createEntry = document.createElement("label");
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", `skill-${currentEntry}`);
    input.setAttribute("placeholder", `e.g (HTML, CSS, JS)`);

    //Creates preview skills
    const getContainerFromSkill = document.getElementById("skill_list");
    const createNewSkill = document.createElement("li");
    createNewSkill.setAttribute("id", `preview-skill-entry-${currentEntry}`);
    createNewSkill.textContent= `Skill Default`;

    getContainerFromSkill.appendChild(createNewSkill);

    // Creates a delete button for skill
    const deleteSkillBtn = document.createElement("button");
    deleteSkillBtn.textContent = "Delete";
    deleteSkillBtn.classList.add("deleteBtn");

    deleteSkillBtn.addEventListener(("click"), (e) => deleteSkillHandler(e, `container-skill-input-${currentEntry}`, `preview-skill-entry-${currentEntry}`));

    input.addEventListener(("input"), (e) => {
        const getSkillPreview = document.getElementById(`preview-skill-entry-${currentEntry}`);
        getSkillPreview.textContent = e.currentTarget.value;
    });
    createEntry.appendChild(input);

    createContainer.appendChild(createEntry);
    createContainer.appendChild(deleteSkillBtn);

    getContainer.appendChild(createContainer);


    numOfEntries++;
}
skillBtn.addEventListener(("click"), skillHandler);

// Languages
const languageBtn = document.getElementById("btn-language");
languageBtn.addEventListener(("click"), (e) => {
    e.preventDefault();
});

//Save button
const submitBtn = document.getElementById("save")
const submitHandler = (e) =>{
    e.preventDefault();
    
    cvData.name = document.getElementById("name").value;
    cvData.email = document.getElementById("email").value;
    cvData.summary = document.getElementById("summary").value;

    const getExperience = document.getElementById("experience");

    const listOfExperiences = Array.from(getExperience.children);
    
    listOfExperiences.forEach((item, index) => {
        console.log(document.getElementById(`company-${index}`));
    })


}

submitBtn.addEventListener(("click"), submitHandler);
