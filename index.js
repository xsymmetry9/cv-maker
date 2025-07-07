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

const formatDateForInput = (str) =>{
    // Converts to YYY-MM-DD

    const date = new Date(str);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;

}

const generateRandomId =  () => {
    let str = "";
    while(str.length < 10)
    {
        const randomNumber = Math.floor(Math.random() * 9);
        str+= randomNumber;
    }
    return str;
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
            "id": `${generateRandomId()}`,
            "company": "GEOS",
            "company_title": "Head Teacher",
            "start": "07/05/2013",
            "finish": "present",
            "jobs": [
                {id: `${generateRandomId()}`, entry: "Led curriculum planning and instructional design for over 100 students, improving learning outcomes by 25%"},
                {id: `${generateRandomId()}`, entry: "Mentored and trained new teachers in classroom management and digital teaching tools"},
                {id: `${generateRandomId()}`, entry: "Managed scheduling, performance evaluations, and internal documentation for the academic department"},
                {id: `${generateRandomId()}`, entry: "Implemented digital systems for tracking student progress using spreadsheets and assessment templates"},
                {id: `${generateRandomId()}`, entry: "Collaborated with international staff to streamline communication and create standardized teaching materials"}
            ]
        }
    ],
    "education": [
        {
            "id": `${generateRandomId()}`,
            "school": "University of Massachusetts - Amherst",
            "degree": "B.A in Economics",
            "start" : "2005",
            "finish": "2009"
        }
    ],
    "skills": [
            {"id": `${generateRandomId()}`, "skillName":"HTML5"},
            {"id": `${generateRandomId()}`, "skillName":"CSS3"},
            {"id": `${generateRandomId()}`, "skillName":"JavaScript"},
            {"id": `${generateRandomId()}`, "skillName":"React"},
            {"id": `${generateRandomId()}`, "skillName":"Git"},
            {"id": `${generateRandomId()}`, "skillName":"Responsive Design"}
        ],
    "languages": [
        {
            "id": `${generateRandomId()}`,
            "name": "English",
            "level": "proficient"
        },
        {
            "id": `${generateRandomId()}`,
            "name": "Spanish",
            "level": "proficient"
        },
        {
            "id": `${generateRandomId()}`,
            "name": "Chinese",
            "level": "intermediate"
        },
        {
            "id": `${generateRandomId()}`,
            "name": "Chinese Cantonese",
            "level": "beginner"
        }
    ]
}

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
const createInput = (obj) => {
    const {titleName, idName, type} = obj
    const container = document.createElement("label");
    container.textContent = titleName;
    const input = document.createElement("input");
    input.id = `${idName}`;
    input.name = `${idName}`;
    input.type = `${type}`;
    container.appendChild(input);

    return container;
}

const deleteHandler = (e, obj) => {
    const {parentId, childId, toBeDeletedChildId, toBeDeletedParentId, counterName} = obj;
    e.preventDefault();
    const parent = document.getElementById(parentId);
    const child = document.getElementById(childId);
    parent.removeChild(child);

    const reviewParent = document.getElementById(toBeDeletedParentId);
    const reviewChild = document.getElementById(toBeDeletedChildId);
    reviewParent.removeChild(reviewChild);

    if(counterName === "experience"){
        experienceCount--;
    }
}


// Creates a new Row for Job experience
const addExperienceHandler = (e) =>{
        e.preventDefault();

        //Saves the current state.  This is why React is so useful.  UseState() would be used here
        const currentExperience = {
            id: generateRandomId(),
            company: "",
            company_title: "",
            start: "",
            finish: "",
            jobs: [],
        };

        const {id} = currentExperience;

        cvData.experience.push(currentExperience);
        plotExperience(currentExperience);

        //Creates a new field for user to type for their experience
        const getContainer = document.getElementById("experience");

        const wrapper = document.createElement("div");
        wrapper.setAttribute("id", `experience-${id}`);

        //Creates a title for the job section
        const title = document.createElement("h3");
        title.textContent = `Experience`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "delete";
        // deleteBtn.addEventListener(("click"), (e) => deleteHandler(e, 
        //     {
        //         parentId: "experience", 
        //         childId: `experience-${id}`, 
        //         toBeDeletedParentId: `preview-job-experience`,
        //         toBeDeletedChildId: `wrapper-${id}`, 
        //         counterName: "experience"
        //     }));
        
        //Allows user to input company name, title job, start, and finish

        const inputName = createInput({"titleName": "Name of company", "idName": `company-${id}`, "type": "text"});
        const inputTitle = createInput({"titleName": "Name of title", "idName": `title-${id}`, "type": "text"});
        const inputStart = createInput({"titleName": "From", "idName":`start-${id}`, "type": "date"});
        const inputFinish = createInput({"titleName": "To", "idName": `finish-${id}`, "type": "date"});

        [title, deleteBtn, inputName, inputTitle, inputStart, inputFinish].forEach((item) => wrapper.appendChild(item)); //Appends all the necessary input

        //Adds a button to create a list of responsibilities
        const button = document.createElement("button");
        button.textContent = "Add job description";
        const unOrderedList = document.createElement("ul"); // Creates a section where user is allow to input their responsibility
        unOrderedList.id =`inputs-job-experience-${id}`;

        //Set a counter for job entries
        // let jobEntries = 1

        // const deleteJobEntryHandler = (e, id) => {
        //     e.preventDefault();

        //     const inputParentEntry = document.getElementById(`inputs-job-experience-${currentExperience}`);
        //     const inputChildEntry = document.getElementById(`job-entry-container-${currentExperience}-${id}`);

        //     inputParentEntry.removeChild(inputChildEntry);

        //     const previewParentEntry = document.getElementById(`preview-job-experience-${currentExperience}`);
        //     const previewChildEntry = document.getElementById(`preview-job-${currentExperience}-entry-${id}`);
        //     previewParentEntry.removeChild(previewChildEntry);

        //     jobEntries--;
        // }

        // button.addEventListener(("click"), (e) => {
        //     e.preventDefault();
        //     if(jobEntries > 3) return;

        //     const currentEntry = jobEntries;

        //     const deleteJobEntryBtn = document.createElement("button");
        //     deleteJobEntryBtn.textContent = "delete";

        //     deleteJobEntryBtn.addEventListener(("click"), (e) => deleteJobEntryHandler(e, currentEntry));
        //     //Append an input entry

        //     const inputEntryContainer = document.createElement("div");
        //     inputEntryContainer.setAttribute("id", `job-entry-container-${currentExperience}-${currentEntry}`);
        //     const label = document.createElement("label");
        //     label.textContent = `Entry ${currentEntry}`;

        //     const input = document.createElement("input");
        //     input.setAttribute("type", "text");
        //     input.setAttribute("id", `job-entry-${currentExperience}-${currentEntry}`);
        //     input.setAttribute("name", `job-entry-${currentExperience}-${currentEntry}`);
        //     inputEntryContainer.appendChild(deleteJobEntryBtn);
        //     inputEntryContainer.appendChild(label);
        //     inputEntryContainer.appendChild(input);
        //     unOrderedList.appendChild(inputEntryContainer);

        //     //Append preview entry
        //     const previewList = document.getElementById(`preview-job-experience-${currentExperience}`);
        //     const previewItem = document.createElement("li");
        //     previewItem.textContent = `This is entry # ${currentEntry}`;
        //     previewItem.setAttribute("id",`preview-job-${currentExperience}-entry-${currentEntry}`);
        //     previewList.appendChild(previewItem);

        //     input.addEventListener(("input"), (e) => {
        //         const target = document.getElementById(`preview-job-${currentExperience}-entry-${currentEntry}`);
        //         target.textContent = e.currentTarget.value;
        //     })
        //     jobEntries++;
        // });

        // wrapper.appendChild(button);
        // wrapper.appendChild(unOrderedList); //Creates job responsibilities

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
    
buttonExperience.addEventListener("click", addExperienceHandler);

const educationButton = document.getElementById("btn-education");

const deleteEducationHandler = (e, id) => {
    e.preventDefault();

    const parent = document.getElementById("education")
    const child = document.getElementById(`input-education-${id}`)

    parent.removeChild(child);

    const previewParent = document.getElementById("preview-education");
    const previewChild = document.getElementById(`preview-education-entry-${id}`);

    previewParent.removeChild(previewChild);

    cvData.education = cvData.education.filter((item) => item.id != id);
    console.log(cvData.education);

}
const addEducationHandler = (e) => {
    e.preventDefault();
    // Users are allowed to only add max of 3 entries
    if(cvData.education.length >= 3) return;
    
    //Saves the state
    const currentEducation = {
        id: generateRandomId(),
        school: "",
        degree: "",
        start: "",
        finish: ""
    };
    cvData.education.push(currentEducation);

    plotEducation(currentEducation);  
}

educationButton.addEventListener(("click"), addEducationHandler);

// Skills

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
    const currentEntry = { id: generateRandomId(), skillName: ""};
    cvData.skills.push(currentEntry);
    plotSkill(currentEntry);
}
skillBtn.addEventListener(("click"), skillHandler);

// Languages
const languageInputHandler = (e, id) => {
    e.preventDefault();
    const {name, value} = e.currentTarget;
    const getLanguage = document.getElementById(`language-${id}`);
    const level = document.getElementById(`select-language-entry-${id}`);
    getLanguage.textContent = `${e.currentTarget.value} - ${!level.value ? "Choose a level" : level.value}`;

    const index = cvData.languages.findIndex((item) => item.id === id);
    if(index !== -1)
    {
        cvData.languages[index][name] = value;
    }
}

const levelSelectionHandler = (e, id) => {
    e.preventDefault();
    const {name, value} = e.currentTarget;

    const language = document.getElementById(`input-language-entry-${id}`);
    const getChild = document.getElementById(`language-${id}`);
    getChild.textContent = `${language.value === "" ? "DEFAULT_LANGUAGE" : language.value} - ${value}`;

    const index = cvData.languages.findIndex((item) => item.id === id);
    if(index !== -1)
    {
        cvData.languages[index][name] = value;
    }
}

const deleteLanguageHandler = (e, id) => {
    e.preventDefault();

    const parent = document.getElementById("languages")
    const child = document.getElementById(`input-language-container-${id}`);
    parent.removeChild(child);

    const previewParent = document.getElementById("language_list");
    const previewChild = document.getElementById(`language-${id}`);

    cvData.languages = cvData.languages.filter((item) => (item.id!= id));

    previewParent.removeChild(previewChild);

}
const languageHandler = (e) => {
    e.preventDefault();
    const currentLanguageEntry = {id: generateRandomId(), "name": "", "level": ""}; //Gives me the last index of the array
    cvData.languages.push(currentLanguageEntry);
    plotLanguage(currentLanguageEntry);
}

const languageBtn = document.getElementById("btn-language");
languageBtn.addEventListener(("click"), languageHandler);

//Save button
const submitBtn = document.getElementById("save");
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
const plotExperience = (obj, index) => {
    const {id, company, company_title, start, finish, jobs} = obj;
    const target = cvData.experience.findIndex((item) => item.id === id); // Finds index of experience
    if(target === -1) return; // error

    // Input Section
    const inputContainer = document.getElementById("experience");

    const labelCompany = document.createElement("label");
    const inputCompany = document.createElement("input");
    inputCompany.id = `company-${id}`;
    inputCompany.name = "company";
    inputCompany.value = company;
    inputCompany.type = "text";
    labelCompany.appendChild(inputCompany);

    inputCompany.addEventListener(("input"), (e) => {
        const container = document.getElementById(`preview-${e.currentTarget.name}-${id}`);
        container.textContent = e.currentTarget.value;
        cvData.experience[target][e.currentTarget.name] = e.currentTarget.value;
    });

    const labelCompanyTitle = document.createElement("label");
    const inputCompanyTitle = document.createElement("input");
    inputCompanyTitle.id = `company-title-${id}`;
    inputCompanyTitle.name = "company_title";
    inputCompanyTitle.value = company_title;
    inputCompanyTitle.type = "text";
    labelCompanyTitle.appendChild(inputCompanyTitle);

    const labelStart = document.createElement("label");
    const inputStart = document.createElement("input");
    inputStart.id = `start-${id}`;
    inputStart.name = "start";
    inputStart.value = formatDateForInput(start);
    inputStart.type = "date";
    labelStart.appendChild(inputStart);

     const labelFinish = document.createElement("label");
    const inputFinish = document.createElement("input");
    inputFinish.id = `finish-${id}`;
    inputFinish.name = "finish";
    inputFinish.value = finish === "present" ? formatDateForInput(new Date()) : formatDateForInput(finish);
    inputFinish.type = "date";
    labelFinish.appendChild(inputFinish);

    [labelCompany, labelCompanyTitle, labelStart, labelFinish].forEach((item) => inputContainer.appendChild(item));
    
     //Adds a button to create a list of responsibilities
    const addJobHandler = document.createElement("button");
    addJobHandler.textContent = "Add job description";
    addJobHandler.dataset.key = id;

    addJobHandler.addEventListener(("click"), (e) => {
        e.preventDefault();
        const currentJobEntry = {id: generateRandomId(), entry: ""};
        cvData.experience[target].jobs.push(currentJobEntry);
        createJobEntry(id, currentJobEntry);
    })
    const unOrderedList = document.createElement("ul"); // Creates a section where user is allow to input their responsibility
    unOrderedList.id =`inputs-job-experience-${id}`;

    const createJobEntry = (id, jobEntry) => {
        //Input
        const labelForListOfJob = document.createElement("label");
        const inputForListOfJob = document.createElement("input");
        inputForListOfJob.type = "text";
        inputForListOfJob.value = jobEntry.entry;
        inputForListOfJob.id = `experience-${id}-entry-${jobEntry.id}`;
        labelForListOfJob.appendChild(inputForListOfJob);

        inputForListOfJob.addEventListener(("input"), (e) => {
            const getEntryFromPreview = document.getElementById(`preview-experience-${id}-entry-${jobEntry.id}`);
            getEntryFromPreview.textContent = e.currentTarget.value;
            const targetJobEntry = cvData.experience[target].jobs.findIndex((item) => item.id === jobEntry.id);
            cvData.experience[target].jobs[targetJobEntry] = e.currentTarget.value;

            console.log(cvData.experience[target].jobs);
        })
        unOrderedList.appendChild(labelForListOfJob);
        //Preview
        const createList = document.createElement("li");
        createList.id = `preview-experience-${id}-entry-${jobEntry.id}`;
        createList.textContent = jobEntry.entry;
        listOfJobs.appendChild(createList);
    }

    // Preview Section
    const container = document.getElementById("preview-job-experience");

    const wrapper = document.createElement(`wrapper`)
    wrapper.id = `wrapper-${id}`;

    const experienceContainer = document.createElement("div");
    experienceContainer.className = "preview-experience-title-container"
    experienceContainer.innerHTML = `
        <p><strong id="preview-company-${id}">${company}</strong>-<strong id="preview-title-${index}">${company_title}</strong></p>
        <p><span id="preview-start-${id}">${start}</span>-<span id="preview-finish-${index}">${finish === "present" ? "Present" : finish}</span></p>`;

    const listOfJobs = document.createElement("ul");
    listOfJobs.className = "list-container";
    listOfJobs.id = `preview-job-experience-${id}`;

    jobs.forEach((jobEntry) => createJobEntry(id, jobEntry));

    [addJobHandler, unOrderedList].forEach((item) => inputContainer.appendChild(item));
    [experienceContainer, listOfJobs].forEach((item) => wrapper.appendChild(item));;
    container.appendChild(wrapper);
}
const plotEducation = (item) =>{
    const {id, school, degree, start, finish} = item;
    const inputEducationParent = document.getElementById("education");

    // Input 
    const wrapper = document.createElement("div");
    wrapper.setAttribute("id", `input-education-${id}`)

    const createInstitute = document.createElement("label");
    createInstitute.textContent = "Name of Institution"
    const createInputInstitute = document.createElement("input");
    createInputInstitute.type = "text"
    createInputInstitute.value = school;
    createInputInstitute.placeholder = "Name of Institution";
    createInputInstitute.id = `nameOfInstitute-${id}`;
    createInstitute.appendChild(createInputInstitute);

    const deleteEducationBtn = document.createElement("button");
    deleteEducationBtn.textContent = "delete";
    deleteEducationBtn.addEventListener(("click"), (e) => deleteEducationHandler(e, id));

    const createMajor = document.createElement("label");    
    createMajor.textContent = "Major:";

    const createInputMajor = document.createElement("input");
    createInputMajor.name= `major-${id}`;
    createInputMajor.id =`major-${id}`;
    createInputMajor.type ="text";
    createInputMajor.placeholder = "Major";
    createInputMajor.value = degree;
    createMajor.appendChild(createInputMajor)

    const createStartDate = document.createElement("label");
    const createInputStartDate = document.createElement("input");
    createStartDate.textContent = "Start Date";
    createInputStartDate.id =`education-start-${id}`;
    createInputStartDate.name =`education-start-${id}`;
    createInputStartDate.type ="number";
    createInputStartDate.step = 1;
    createInputStartDate.placeholder = "Start Year";
    createInputStartDate.value = start;
    createStartDate.appendChild(createInputStartDate);

    const createFinishDate = document.createElement("label");
    const createInputFinishDate = document.createElement("input");
    createFinishDate.textContent = "Finish Date";
    createInputFinishDate.id =`education-finish-${id}`;
    createInputFinishDate.name =`education-finish-${id}`;
    createInputFinishDate.type ="number";
    createInputFinishDate.step = 1;
    createInputFinishDate.placeholder = "Finished Year"
    createInputFinishDate.value = finish;
    createFinishDate.appendChild(createInputFinishDate);

    [createInstitute, createMajor, createStartDate, createFinishDate, deleteEducationBtn].forEach((item) => wrapper.appendChild(item));
    inputEducationParent.append(wrapper);

    const inputHandler = (e, name) => {
        //Update education
        const container = document.getElementById(`preview-education-${name}-${id}`);
        container.textContent = e.currentTarget.value;

        const index = cvData.education.findIndex((item) => item.id === id);
        // If found ... 
        if(index !== -1)
            cvData.education[index][name] = e.currentTarget.value;

        console.log(cvData.education[index]);
    }
    createInputInstitute.addEventListener(("input"), (e) => inputHandler(e, "nameOfInstitution"));
    createInputMajor.addEventListener(("input"), (e) => inputHandler(e, "major"));
    createInputStartDate.addEventListener(("input"), (e) => inputHandler(e, "start"));
    createInputFinishDate.addEventListener(("input"), (e) => inputHandler(e, "finish"));


    // Preview
    const container = document.getElementById("preview-education");

    const create = document.createElement("div");
    create.id = `preview-education-entry-${id}`;
    create.innerHTML = `
        <div class = "preview-education-title-container">
            <p class="preview-education-title" id="preview-education-major-${id}">${degree}</p>
            <p><span id="preview-education-start-${id}">${start}</span> - <span id="preview-education-finish-${id}">${finish}</span></p>
        </div>
        <p class="preview-education-major" id="preview-education-nameOfInstitution-${id}">${school}</p>`
    container.appendChild(create);

}

const plotSkill = (item) => {
    const {id, skillName} = item;

    // Input
        const getContainer = document.getElementById("skills");

        const createContainer = document.createElement("div");
        createContainer.id = `container-skill-input-${id}`;

        const createLabelName = document.createElement("label");
        const input = document.createElement("input");
        input.type ="text";
        input.id =`skill-${id}`;
        input.placeholder =`e.g (HTML, CSS, JS)`;
        input.name = "skillName";
        input.value = skillName;
        

    // Creates a delete button for skill
    const deleteSkillBtn = document.createElement("button");
    deleteSkillBtn.textContent = "Delete";
    deleteSkillBtn.classList.add("deleteBtn");

    deleteSkillBtn.addEventListener(("click"), (e) => deleteSkillHandler(e, `container-skill-input-${currentEntry}`, `preview-skill-entry-${currentEntry}`));

    input.addEventListener(("input"), (e) => {
        const getSkillPreview = document.getElementById(`preview-skill-${id}`);
        console.log(getSkillPreview);
        getSkillPreview.textContent = e.currentTarget.value;
    });
    createLabelName.appendChild(input);
    getContainer.appendChild(createLabelName);
    getContainer.appendChild(deleteSkillBtn);

    // Preview
        const container = document.getElementById("skill_list");
        const createEntry = document.createElement("li");
        createEntry.textContent = skillName;
        createEntry.id = `preview-skill-${id}`;
        container.appendChild(createEntry);
}

const plotLanguage = (item) =>{
    const {id, name, level} = item;
    const inputLanguageParent = document.getElementById("languages");
    const previewLanguageParent= document.getElementById("language_list");
    
    // Input 
    const createContainer = document.createElement("div");
    createContainer.id = `input-language-container-${id}`;

    const createLabelInputName = document.createElement("label");
    const createInputName = document.createElement("input");
    createInputName.type = "text";
    createInputName.id = `input-language-entry-${id}`;
    createInputName.value = name;
    createInputName.placeholder = "Input a language";
    createInputName.name = "name";
    createLabelInputName.appendChild(createInputName);
    createInputName.addEventListener(("input"), (e) => languageInputHandler(e, id));
    // Level Input - uses option so user can choose
    const createLabel = document.createElement("label");
    const createSelect = document.createElement("select");
    createSelect.name = "level";
    createSelect.id = `select-language-entry-${id}`;
    createSelect.value = level;
    createSelect.innerHTML = `
        <option value="" ${level == "" && "selected"}>Please choose an option--</option>
        <option value="proficient" ${level == "proficient" && "selected"}>Proficient</option>
        <option value="intermediate" ${level == "intermediate" && "selected"}>Intermediate</option>
        <option value="beginner" ${level == "beginner" && "selected"}>Beginner</option>
    `
    createSelect.addEventListener(("change"), (e) => levelSelectionHandler(e, id));
    createLabel.appendChild(createSelect);
    createContainer.appendChild(createLabelInputName);
    createContainer.appendChild(createLabel);
    inputLanguageParent.appendChild(createContainer);

    // Delete Section

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";

    deleteBtn.addEventListener(("click"), (e) =>  deleteLanguageHandler(e, id));

    createContainer.appendChild(deleteBtn);


    // Preview
    const create = document.createElement("li");
    create.id = `language-${id}`;
    create.textContent = (name === "" ? "English" : name) + " - " + (level === "" ? "proficient" : level);

    previewLanguageParent.appendChild(create);

}
const populate = () => {

    const {
        name,
        title, 
        email, 
        address, 
        tel_number, 
        summary, 
        experience,
        education,
        skills,
        languages} = cvData;
    //Input Section
    nameInput.value = name;
    titleInput.value = title;
    emailInput.value = email;
    addressInput.value =address;
    telNumberInput.value = tel_number;
    summaryInput.value = summary;

    //Preview section
    previewName.textContent = name;
    previewTitle.textContent = title;
    previewEmail.textContent = email;
    previewAddress.textContent = address;
    previewTelNumber.textContent = tel_number;
    previewSummary.textContent = summary;

    experience.forEach((item, index ) => plotExperience(item, index));
    education.forEach((item, index) => plotEducation(item, index));
    skills.forEach((item, index) => plotSkill(item, index));
    languages.forEach((item) => plotLanguage(item));

}

populate();

submitBtn.addEventListener(("click"), submitHandler);
