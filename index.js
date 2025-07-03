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
            "finish": "present",
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

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "delete";
        deleteBtn.addEventListener(("click"), (e) => deleteHandler(e, 
            {
                parentId: "experience", 
                childId: `experience-${currentExperience}`, 
                toBeDeletedParentId: `preview-job-experience`,
                toBeDeletedChildId: `wrapper-${currentExperience}`, 
                counterName: "experience"
            }));
        
        //Allows user to input company name, title job, start, and finish

        const inputName = createInput({"titleName": "Name of company", "idName": `company-${currentExperience}`, "type": "text"});
        const inputTitle = createInput({"titleName": "Name of title", "idName": `title-${currentExperience}`, "type": "text"});
        const inputStart = createInput({"titleName": "From", "idName":`start-${currentExperience}`, "type": "date"});
        const inputFinish = createInput({"titleName": "To", "idName": `finish-${currentExperience}`, "type": "date"});

        [title, deleteBtn, inputName, inputTitle, inputStart, inputFinish].forEach((item) => wrapper.appendChild(item)); //Appends all the necessary input

        //Adds a button to create a list of responsibilities
        const button = document.createElement("button");
        button.textContent = "Add job description";
        const unOrderedList = document.createElement("ul"); // Creates a section where user is allow to input their responsibility
        unOrderedList.id =`inputs-job-experience-${currentExperience}`;

        //Set a counter for job entries
        let jobEntries = 1

        const deleteJobEntryHandler = (e, id) => {
            e.preventDefault();

            const inputParentEntry = document.getElementById(`inputs-job-experience-${currentExperience}`);
            const inputChildEntry = document.getElementById(`job-entry-container-${currentExperience}-${id}`);

            inputParentEntry.removeChild(inputChildEntry);

            const previewParentEntry = document.getElementById(`preview-job-experience-${currentExperience}`);
            const previewChildEntry = document.getElementById(`preview-job-${currentExperience}-entry-${id}`);
            previewParentEntry.removeChild(previewChildEntry);

            jobEntries--;
        }

        button.addEventListener(("click"), (e) => {
            e.preventDefault();
            if(jobEntries > 3) return;

            const currentEntry = jobEntries;

            const deleteJobEntryBtn = document.createElement("button");
            deleteJobEntryBtn.textContent = "delete";

            deleteJobEntryBtn.addEventListener(("click"), (e) => deleteJobEntryHandler(e, currentEntry));
            //Append an input entry

            const inputEntryContainer = document.createElement("div");
            inputEntryContainer.setAttribute("id", `job-entry-container-${currentExperience}-${currentEntry}`);
            const label = document.createElement("label");
            label.textContent = `Entry ${currentEntry}`;

            const input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("id", `job-entry-${currentExperience}-${currentEntry}`);
            input.setAttribute("name", `job-entry-${currentExperience}-${currentEntry}`);
            inputEntryContainer.appendChild(deleteJobEntryBtn);
            inputEntryContainer.appendChild(label);
            inputEntryContainer.appendChild(input);
            unOrderedList.appendChild(inputEntryContainer);

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

const deleteEducationHandler = (e, id) => {
    e.preventDefault();

    const parent = document.getElementById("education")
    const child = document.getElementById(`input-education-${id}`)

    parent.removeChild(child);

    const previewParent = document.getElementById("preview-education");
    const previewChild = document.getElementById(`preview-education-entry-${id}`);

    previewParent.removeChild(previewChild);

    educationCount--;

}
const addEducationHandler = (e) => {
    e.preventDefault();

    // Users are allowed to only add max of 3 entries
    if(educationCount > 3) return;
    
    //Saves the state
    const currentEducation = educationCount;

    const getEducationContainer = document.getElementById("education");

    //Adds a wrapper
    const wrapper = document.createElement("div");
    wrapper.setAttribute("id", `input-education-${currentEducation}`)
    //Adds Input Entry
    
    const inputTitle = document.createElement("input");
    inputTitle.type = "text";
    inputTitle.name = `nameOfInstitution-${currentEducation}`;
    inputTitle.id = `nameOfInstitution-${currentEducation}`

    const labelTitle = document.createElement("label");
    labelTitle.textContent = "Name of institution";
    labelTitle.for = `nameOfInstitution-${currentEducation}`;

    const deleteEducationBtn = document.createElement("button");
    deleteEducationBtn.textContent = "delete";
    deleteEducationBtn.addEventListener(("click"), (e) => deleteEducationHandler(e, currentEducation));

    const inputMajor = document.createElement("input");
    inputMajor.type= "text";
    inputMajor.name= `major-${currentEducation}`;
    inputMajor.id =`major-${currentEducation}`;
    inputMajor.type ="text";

    const labelMajor = document.createElement("label");    
    labelMajor.textContent = "Major:";
    inputMajor.for = `major-${currentEducation}`;


    const labelDate = document.createElement("label");
    const inputDate = document.createElement("input");
    inputDate.id =`education-date-${currentEducation}`;
    inputDate.name =`education-date-${currentEducation}`;
    inputDate.type ="date";
    labelDate.textContent = "Finish Date";
    labelDate.for =`education-date-${currentEducation}`;

    wrapper.appendChild(deleteEducationBtn);
    [labelTitle, inputTitle].forEach((item) => wrapper.appendChild(item));
    [labelMajor, inputMajor].forEach((item) => wrapper.appendChild(item));
    [labelDate, inputDate].forEach((item) => wrapper.appendChild(item));

    getEducationContainer.appendChild(wrapper);

    //Adds Preview Education
    const getPreviewEducation = document.getElementById("preview-education");

    const educationLayout = document.createElement("div");
    educationLayout.setAttribute("id", `preview-education-entry-${currentEducation}`)

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
    createContainer.id = `container-skill-input-${currentEntry}`;

    const createEntry = document.createElement("label");
    const input = document.createElement("input");
    input.type ="text";
    input.id =`skill-${currentEntry}`;
    input.placeholder =`e.g (HTML, CSS, JS)`;

    //Creates preview skills
    const getContainerFromSkill = document.getElementById("skill_list");
    const createNewSkill = document.createElement("li");
    createNewSkill.id = "id", `preview-skill-entry-${currentEntry}`;
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

let languageEntry = 1;

const languageInputHandler = (e, id) => {
    e.preventDefault();
    const getLanguage = document.getElementById(`preview-language-${id}`);
    const level = document.getElementById(`select-language-entry-${id}`)
    getLanguage.textContent = `${e.currentTarget.value} - ${!level.value ? "Choose a level" : level.value}`;

}

const levelSelectionHandler = (e, id) => {
    e.preventDefault();
    const language = document.getElementById(`input-language-entry-${id}`);
    const getChild = document.getElementById(`preview-language-${id}`);
    getChild.textContent = `${language.value === "" ? "DEFAULT_LANGUAGE" : language.value} - ${e.currentTarget.value}`;
}

const deleteLanguageHandler = (e, id) => {
    e.preventDefault();

    const parent = document.getElementById("languages")
    const child = document.getElementById(`input-language-container-${id}`);
    parent.removeChild(child);

    const previewParent = document.getElementById("language_list");
    const previewChild = document.getElementById(`preview-language-${id}`)
    previewParent.removeChild(previewChild);

    languageEntry--;

}
const languageHandler = (e) => {
    const currentLanguageEntry = languageEntry;

    e.preventDefault();
    const inputLanguageParent = document.getElementById("languages");
    const previewLanguageParent= document.getElementById("language_list");
    // Create a container
    const createContainer = document.createElement("div");
    createContainer.id = `input-language-container-${currentLanguageEntry}`;

    // Input Section
    const createLabelInputName = document.createElement("label");
    const createInputName = document.createElement("input");
    createInputName.type = "text";
    createInputName.id= `input-language-entry-${currentLanguageEntry}`;
    createLabelInputName.appendChild(createInputName);

    createInputName.addEventListener(("input"), (e) => languageInputHandler(e, currentLanguageEntry));
    // Level Input - uses option so user can choose
    const createLabel = document.createElement("label");
    const createSelect = document.createElement("select");
    createSelect.id = `select-language-entry-${currentLanguageEntry}`;
    createSelect.innerHTML = `
        <option value="">Please choose an option--</option>
        <option value="proficient">Proficient</option>
        <option value="intermediate">Intermediate</option>
        <option value="beginner">Beginner</option>
    `
    createSelect.addEventListener(("change"), (e) => levelSelectionHandler(e, currentLanguageEntry));
    createLabel.appendChild(createSelect);
    createContainer.appendChild(createLabelInputName);
    createContainer.appendChild(createLabel);
    inputLanguageParent.appendChild(createContainer);

    // Delete Section

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";

    deleteBtn.addEventListener(("click"), (e) =>  deleteLanguageHandler(e, currentLanguageEntry));

    createContainer.appendChild(deleteBtn);

    // Preview Section

    const previewLanguage = document.createElement("li");
    previewLanguage.id =`preview-language-${currentLanguageEntry}`;
    previewLanguage.textContent = "English - Proficient";

    previewLanguageParent.appendChild(previewLanguage);

    languageEntry++;
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
const plotExperience = (item, index) => {
    const {company, company_title, start, finish, jobs} = item;
    const container = document.getElementById("preview-job-experience");

        const wrapper = document.createElement(`wrapper`)
        wrapper.id = `wrapper-${index}`;

        const experienceContainer = document.createElement("div");
        experienceContainer.className = "preview-experience-title-container"
        experienceContainer.innerHTML = `
            <p><strong id="preview-company-${index}">${company}</strong>-<strong id="preview-title-${index}">${company_title}</strong></p>
            <p><span id="preview-start-${index}">${start}</span>-<span id="preview-finish-${index}">${finish === "present" ? "Present" : finish}</span></p>`;

        const listOfJobs = document.createElement("ul");
        listOfJobs.className = "list-container";
        listOfJobs.id = `preview-job-experience-${index}`;

        jobs.forEach((entry, numOfEntries) => {
            const createList = document.createElement("li");
            createList.id = `preview-entry-${index}-entry-${numOfEntries}`;
            createList.textContent = entry;

            listOfJobs.appendChild(createList);
        })

        wrapper.appendChild(experienceContainer);
        wrapper.appendChild(listOfJobs);
        container.appendChild(wrapper);
}
const plotEducation = (item, index) =>{
    const {school, degree, start, finish} = item;
    
    const container = document.getElementById("preview-education");

    const create = document.createElement("div");
    create.id = `preview-education-entry-${index}`;
    create.innerHTML = `
        <div class = "preview-education-title-container">
            <p class="preview-education-title" id="preview-education-major-${index}">${degree}</p>
            <p>${start}-${finish}</p>
        </div>
        <p class="preview-education-major" id="preview-education-nameOfInstitution-${index}">${school}</p>`
    container.appendChild(create);
}

const plotSkill = (item, index) => {
        const container = document.getElementById("skill_list");
        const createEntry = document.createElement("li");
        createEntry.textContent = item;
        createEntry.id = `skill-${index}`;
        container.appendChild(createEntry);
}

const plotLanguage = (item, index) =>{
    const {name, level} = item;
    const container = document.getElementById("language_list");
    const create = document.createElement("li");
    create.id = `language-${index}`;
    create.innerHTML = 
    `
        <p>${name} - ${level}</p>
    `

    container.appendChild(create);

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
    languages.forEach((item, index) => plotLanguage(item, index));

}

populate();

submitBtn.addEventListener(("click"), submitHandler);
