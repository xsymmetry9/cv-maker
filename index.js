const getForm = document.querySelector(".form-container");
const nameInput = document.getElementById("name");
const titleInput = document.getElementById("title");
const emailInput = document.getElementById("email");
const addressInput = document.getElementById("address");
const telNumberInput = document.getElementById("tel-number");
const summaryInput = document.getElementById("summary");

const buttonExperience = document.getElementById("btn-experience");
const buttonEducation = document.getElementById("btn-education");
const buttonSkill = document.getElementById("btn-skill");
const buttonLanguage = document.getElementById("btn-language");

const previewName = document.getElementById("preview-name");
const previewTitle = document.getElementById("preview-title");
const previewEmail = document.getElementById("preview-email");
const previewAddress = document.getElementById("preview-address");
const previewTelNumber = document.getElementById("preview-tel-number");
const previewSummary = document.getElementById("preview-summary");

const formattedDate = (item) => {
    const date = new Date(item);
    if(!date) return "Invalid Date";

    const getMonth = date.getMonth() + 1; // Returns the month 0 - 11
    const getDay = date.getDate(); // Returns the date
    const getYear = date.getFullYear(); // REturns the year

    const formattedDate = `${getMonth}/${getDay}/${getYear}`;
    console.log(formattedDate);
    return formattedDate;
}

const formatDateForInput = (str) =>{
    // Converts to YYY-MM-DD

    if(str === "" || str === null || str === undefined) return "";

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
            "location": {"city": "Taipei", "country": "Taiwan"},
            "start": "07/22/2017",
            "finish": "present",
            "jobs": [
                {id: `${generateRandomId()}`, entry: "Led curriculum planning and instructional design for over 100 students, improving learning outcomes by 25%"},
                {id: `${generateRandomId()}`, entry: "Mentored and trained new teachers in classroom management and digital teaching tools"},
                {id: `${generateRandomId()}`, entry: "Managed scheduling, performance evaluations, and internal documentation for the academic department"},
                {id: `${generateRandomId()}`, entry: "Implemented digital systems for tracking student progress using spreadsheets and assessment templates"},
                {id: `${generateRandomId()}`, entry: "Collaborated with international staff to streamline communication and create standardized teaching materials"}
            ],
        },
                        {
            "id": `${generateRandomId()}`,
            "company": "GEOS",
            "company_title": "Part-Time",
            "location": {"city": "Taipei", "country": "Taiwan"},
            "start": "07/05/2012",
            "finish": "07/22/2017",
            "jobs": [
                {id: `${generateRandomId()}`, entry: "Designed effective Business English and Conversation lessons to all level-students and received 100% satisfactory results."},
                {id: `${generateRandomId()}`, entry: "Proved the ability to make presentations effectively, resulting in positive feedback and high rate renewals."},
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
            "language": "English",
            "level": "proficient"
        },
        {
            "id": `${generateRandomId()}`,
            "language": "Spanish",
            "level": "proficient"
        },
        {
            "id": `${generateRandomId()}`,
            "language": "Chinese",
            "level": "intermediate"
        },
        {
            "id": `${generateRandomId()}`,
            "language": "Chinese Cantonese",
            "level": "beginner"
        }
    ]
}

const createEl = (el) => {
    const createElement = document.createElement(el);

    return createElement;
}

const createInput = ({id, name, value, placeholder, type}) => {
    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.name = name;
    input.value = value;
    input.placeholder = placeholder || "";

    if(name === "finish" || name === "start")
    {
        input.step = 1;
    }

    return input;
};

const createLabelInput = (obj) =>{
    const container = createEl("div");
    container.className="wrap-input";
    
    const label = document.createElement("label");
    label.textContent = obj.title || "";
    const input = createInput(obj);
    label.appendChild(input);
    container.appendChild(label);

    return {container, label, input};
}

// User is able to see what they are typing
const inputHandler = (e, obj) => {
    const {section} = obj;
    const {name, value} = e.currentTarget;
    if(section === "personal_information"){
        const previewInput = document.getElementById(`preview-${name}`);
        previewInput.textContent= value === "" ? cvData[name] : value;
        cvData[name] = value;

        return cvData[name];
    } else if(section === "experience" || section === "skills" || section === "languages") {
        const target = cvData[section].findIndex((item) => item.id === obj.id);
        if(target === -1){
            console.log("Target not found");
            return;
        }

        // For location only
        if(name === "city" || name === "country"){
            cvData[section][target].location[name] = value;
        } else {
            cvData[section][target][name] = value;
        }

        const container = document.getElementById(`preview-${name}-${obj.id}`);
        if (container === null) {
            console.log("Error: Can't read the container");
            console.log({section: section, id: obj.id});
            return;
        }

        if (name === "start" || name === "finish")
        {
            container.textContent = formattedDate(value);
        } else {
            container.textContent = value;
        }

    } else if(section === "education") {
            //Update education
            const container = document.getElementById(`preview-${section}-${name}-${obj.id}`);
            container.textContent = value;

            const index = cvData.education.findIndex((item) => item.id === obj.id);
            // If found ... 
            if(index !== -1)
            {cvData[section][index][name] = value;}

    } else {
        console.log("Wrong section");
        return;
    }

    console.log("No error", cvData[section]);

}

const deleteHandler = (e, obj) => {
    e.preventDefault();
    const {id, ref, parentInputRef, childInputRef, parentRef, childRef} = obj;
    if(ref === "experience" || ref === "education" || ref === "skills" || ref === "languages")
        {
            const prevLength = cvData[ref].length;
            cvData[ref] = cvData[ref].filter((entry) => entry.id != id);
            if(prevLength === cvData[ref].length){
                console.log("Error:", "It didn't remove entry");
                console.log(cvData[ref].length);
            }

            const parent = document.getElementById(parentInputRef);
            const child = document.getElementById(childInputRef);
            parent.removeChild(child);

            const reviewParent = document.getElementById(parentRef);
            const reviewChild = document.getElementById(childRef);
            reviewParent.removeChild(reviewChild);
        
            return cvData[ref];
        }
    else {
        console.log("Error");
        return;
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
            location: {city: "", country: ""},
            start: "",
            finish: "",
            jobs: [],
        };
        cvData.experience.push(currentExperience);
        plotExperience(currentExperience);
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


// Skills

const skillHandler = (e) => {
    e.preventDefault();
    const currentEntry = { id: generateRandomId(), skillName: ""};
    cvData.skills.push(currentEntry);
    plotSkill(currentEntry);
}

// Languages
const languageInputHandler = (e, id) => {
    e.preventDefault();
    const {name, value} = e.currentTarget;
    const getLanguage = document.getElementById(`preview-language-${id}`);
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
    const getChild = document.getElementById(`preview-language-${id}`);
    getChild.textContent = `${language.value === "" ? "English" : language.value} - ${value}`;

    const index = cvData.languages.findIndex((item) => item.id === id);
    if(index !== -1)
    {
        cvData.languages[index][name] = value;
    }
}

const languageHandler = (e) => {
    e.preventDefault();
    const currentLanguageEntry = {id: generateRandomId(), "name": "", "level": ""}; //Gives me the last index of the array
    cvData.languages.push(currentLanguageEntry);
    plotLanguage(currentLanguageEntry);
}
//Save button
const submitBtn = document.getElementById("save");
const submitHandler = (e) =>{
    e.preventDefault();

    const getUser = localStorage.getItem("cv_maker");

    if(getUser != null)
    {
        localStorage.setItem("cv_maker", JSON.stringify(cvData));
        console.log("Updated to 'cv_maker'");
    } else {
        localStorage.setItem("cv_maker", JSON.stringify(cvData));
        console.log("Created a new user and saved it to localStorage as cv_maker");
    }

}
const plotExperience = (obj) => {
    const {id, company, company_title, start, finish, location, jobs} = obj;
    const target = cvData.experience.findIndex((item) => item.id === id); // Finds index of experience
    if(target === -1) return; // error

    // Input Section
    const inputContainer = document.getElementById("experience");

    const  experienceWrapper = document.createElement("div");
    experienceWrapper.id = `experience-entry-${id}`;

    const wrapperTitleBtn = document.createElement("div");
    wrapperTitleBtn.className="wrapper-two-items";

    const title = document.createElement("h3");
    title.textContent = `Job Entry - ${target + 1}` // The index of the array

    const inputCompany = createLabelInput({
        id: `input-company-${id}`,
        name: "company",
        value: company,
        type: "text",
        placeholder: "Company name"
    });

    inputCompany.input.addEventListener(("input"), (e) =>  inputHandler(e, obj={section: "experience", id: id, target: target}));

    const inputCompanyTitle = createLabelInput({
        id: `input-company_title-${id}`,
        name: "company_title",
        value: company_title,
        type: "text",
        placeholder: "Job title"
    });

    inputCompanyTitle.input.addEventListener(("input"), (e) => inputHandler(e, obj={section: "experience", id: id, target: target}));

    const inputLocationCity = createLabelInput({
        id: `input-location-city-${id}`,
        name: "city",
        value: location.city,
        type: "text",
        placeholder: "Enter city name"
    });

    inputLocationCity.input.addEventListener(("input"), (e) => inputHandler(e, obj={section: "experience", id: id, target: target}));

    const inputLocationCountry = createLabelInput({
        id:`input-location-country-${id}`,
        name: "country",
        value: location.country,
        type: "text",
        placeholder: "Enter country name"
    });

    inputLocationCity.input.addEventListener(("input"), (e) => inputHandler(e, obj={section: "experience", id: id, target: target}));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x"
    deleteButton.className = "delete-button"
    deleteButton.addEventListener(("click"), (e) => deleteHandler(e, {
        id: id,
        ref: "experience",
        parentInputRef: "experience",
        childInputRef: `experience-entry-${id}`,
        parentRef: `preview-job-experience`,
        childRef: `preview-experience-wrapper-${id}`
    }));

    const inputStart = createLabelInput({
        type: "date",
        id: `start-${id}`,
        name: "start",
        value: formatDateForInput(start),
        placeholder: "Start Date",
    });

    inputStart.input.addEventListener(("change"), (e) => inputHandler(e, obj={section: "experience", id: id, target: target}));
    const inputFinish = createLabelInput({
        type: "date",
        id: `finish-${id}`,
        name: "finish",
        value: finish === "present" ? formatDateForInput(new Date()) : formatDateForInput(finish),
        placeholder: "Finish Date",
    })

    inputFinish.input.addEventListener(("change"), (e) => inputHandler(e, obj={section: "experience", id: id, target: target}));

    [title, deleteButton].forEach((item) => wrapperTitleBtn.appendChild(item));

    [wrapperTitleBtn, inputCompany.container, inputCompanyTitle.container, inputLocationCity.container, inputLocationCountry.container, inputStart.container, inputFinish.container].forEach((item) => experienceWrapper.appendChild(item));

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
        const entryExperienceWrapper = document.createElement("li");
        entryExperienceWrapper.id = `input-experience-${id}-entry-${jobEntry.id}`;
        entryExperienceWrapper.className="wrapper-two-items";
        const deleteEntryBtn = document.createElement("button");
        deleteEntryBtn.className = "delete-button";
        deleteEntryBtn.textContent = "x";
        deleteEntryBtn.addEventListener(("click"), (e) => {
            e.preventDefault();
            const inputJobContainer = document.getElementById(`inputs-job-experience-${id}`);
            const inputJobChild = document.getElementById(`input-experience-${id}-entry-${jobEntry.id}`);
            inputJobContainer.removeChild(inputJobChild);

            const previewJobContainer = document.getElementById(`preview-job-experience-${id}`)
            const previewJobChild = document.getElementById(`preview-experience-${id}-entry-${jobEntry.id}`);
            previewJobContainer.removeChild(previewJobChild);

            cvData.experience[target].jobs = cvData.experience[target].jobs.filter((item) => item.id != jobEntry.id);

            console.log(cvData.experience[target].jobs);
        })

        const entryJobDescription = createLabelInput({
            type: "text",
            id: `experience-${id}-entry-${jobEntry.id}`,
            name: "entry",
            value: jobEntry.entry,
            placeholder: "Enter a job description"
        });

        [entryJobDescription.label, deleteEntryBtn].forEach((item) => entryExperienceWrapper.appendChild(item));

        entryJobDescription.input.addEventListener(("input"), (e) => {
            const getEntryFromPreview = document.getElementById(`preview-experience-${id}-entry-${jobEntry.id}`);
            getEntryFromPreview.textContent = e.currentTarget.value;
            const targetJobEntry = cvData.experience[target].jobs.findIndex((item) => item.id === jobEntry.id);
            cvData.experience[target].jobs[targetJobEntry] = e.currentTarget.value;

            console.log(cvData.experience[target].jobs);
        })
        unOrderedList.appendChild(entryExperienceWrapper);
        //Preview
        const createList = document.createElement("li");
        createList.id = `preview-experience-${id}-entry-${jobEntry.id}`;
        createList.textContent = jobEntry.entry;
        listOfJobs.appendChild(createList);
    }

    // Preview Section
    const previewExperienceContainer = document.getElementById("preview-job-experience");

    const previewExperienceWrapper = document.createElement(`div`)
    previewExperienceWrapper.id = `preview-experience-wrapper-${id}`;

    const titleDateGroup = document.createElement("div");
    titleDateGroup.className = "title-two-items";
    titleDateGroup.innerHTML = `
        <p><strong id="preview-company-${id}">${company}</strong> | <strong id="preview-company_title-${id}">${company_title}</strong></p>
        <p><i class="font-italics" id="preview-city-${id}">${location.city}</i>, <i class="font-italics" id="preview-country-${id}">${location.country}</i> | <span id="preview-start-${id}">${start}</span> - <span id="preview-finish-${id}">${finish === "present" ? "Present" : finish}</span></p>`;

    const listOfJobs = document.createElement("ul");
    listOfJobs.className = "list-container";
    listOfJobs.id = `preview-job-experience-${id}`;

    jobs.forEach((jobEntry) => createJobEntry(id, jobEntry));

    [addJobHandler, unOrderedList].forEach((item) => experienceWrapper.appendChild(item));
    [titleDateGroup, listOfJobs].forEach((item) => previewExperienceWrapper.appendChild(item));
    inputContainer.appendChild(experienceWrapper);
    previewExperienceContainer.appendChild(previewExperienceWrapper);
}
const plotEducation = (item) =>{
    const {id, school, degree, start, finish} = item;
    const inputEducationParent = document.getElementById("education");

    // Input 
    const wrapper = document.createElement("div");
    wrapper.setAttribute("id", `input-education-${id}`)

    const createInputSchool = createLabelInput({
        title: "Name of Institution",
        type: "text",
        id: `nameOfSchool${id}`,
        name: "school",
        value: school,
        placeholder: "Name of the institution"
    });

    const deleteEducationBtn = document.createElement("button");
    deleteEducationBtn.textContent = "delete";

    deleteEducationBtn.addEventListener(("click"), (e) => deleteHandler(e, {
        id: id,
        ref: "education",
        parentInputRef: "education",
        childInputRef: `input-education-${id}`,
        parentRef: "preview-education",
        childRef: `preview-education-entry-${id}`
    }));
    const createInputMajor = createLabelInput({
        title: "Major",
        type: "text",
        id: `major-${id}`,
        name: "degree",
        value: degree,
        placeholder: "Major"
    });

    const createInputStartDate = createLabelInput({
        title: "Start",
        type: "number",
        id: `education-start-${id}`,
        name: "start",
        value: start,
        placeholder: "Start Year"
    });
    const createInputFinishDate = createLabelInput({
        title: "Finish",
        type: "number",
        id: `education-finish-${id}`,
        name: "finish",
        value: finish,
        placeholder: "Finish Year"
    });

    [createInputSchool.container, createInputMajor.container, createInputStartDate.container, createInputFinishDate.container, deleteEducationBtn].forEach((item) => wrapper.appendChild(item));
    inputEducationParent.append(wrapper);

    createInputSchool.input.addEventListener(("input"), (e) => inputHandler(e, obj={section: "education", id: id}));
    createInputMajor.input.addEventListener(("input"), (e) => inputHandler(e, obj={section: "education", id: id}));
    createInputStartDate.input.addEventListener(("input"), (e) => inputHandler(e, obj={section: "education", id: id}));
    createInputFinishDate.input.addEventListener(("input"), (e) => inputHandler(e, obj={section: "education", id: id}));

    // Preview
    const container = document.getElementById("preview-education");

    const create = document.createElement("div");
    create.id = `preview-education-entry-${id}`;
    create.innerHTML = `
        <div class = "title-two-items">
            <p class="preview-education-title" id="preview-education-degree-${id}">${degree}</p>
            <p><span id="preview-education-start-${id}">${start}</span> - <span id="preview-education-finish-${id}">${finish}</span></p>
        </div>
        <p class="preview-education-major" id="preview-education-school-${id}">${school}</p>`
    container.appendChild(create);

}

const plotSkill = (item) => {
    const {id, skillName} = item;

    // Input
        const getContainer = document.getElementById("skills");

        const wrapper = document.createElement("div");
        wrapper.id = `container-skill-input-${id}`;
        wrapper.className="wrapper-two-items";

        const createInputSkillEntry = createLabelInput({
            type:"text",
            id:`skill-${id}`,
            placeholder:`e.g (HTML, CSS, JS)`,
            name: "skillName",
            value: skillName
        });

    // Creates a delete button for skill
    const deleteSkillBtn = document.createElement("button");
    deleteSkillBtn.textContent = "x";
    deleteSkillBtn.className ="delete-button";

    deleteSkillBtn.addEventListener(("click"), (e) => deleteHandler(e,
        {
            id: id,
            ref: "skills",
            parentInputRef: "skills",
            childInputRef: `container-skill-input-${id}`,
            parentRef: "skill_list",
            childRef: `preview-skillName-${id}`
        }));

    createInputSkillEntry.input.addEventListener(("input"), (e) => inputHandler(e, obj={section:"skills", id: id}));
    [createInputSkillEntry.label, deleteSkillBtn].forEach((item) => wrapper.appendChild(item));
    getContainer.appendChild(wrapper);

    // Preview
        const container = document.getElementById("skill_list");
        const createEntry = document.createElement("li");
        createEntry.textContent = skillName;
        createEntry.id = `preview-skillName-${id}`;
        container.appendChild(createEntry);
}

const plotLanguage = (item) =>{
    const {id, language, level} = item;
    const inputLanguageParent = document.getElementById("languages");
    const previewLanguageParent= document.getElementById("language_list");
    
    // Input 
    const createContainer = document.createElement("div");
    createContainer.id = `input-language-container-${id}`;

    const wrapperTitleBtn = document.createElement("div");
    wrapperTitleBtn.className = "wrapper-two-items";

    const title = document.createElement("h4");
    title.textContent = "Entry";
    
    const createInputLanguageEntry = createLabelInput({
        type: "text",
        id: `input-language-entry-${id}`,
        value: language,
        placeholder: "Input a language",
        name: "language"
    })
    createInputLanguageEntry.input.addEventListener(("input"), (e) => inputHandler(e, obj={section: "languages", id: id}));
    
    // Level Input - uses option so user can choose
    const levelContainer = createEl("div");
    levelContainer.className = "wrap-input";
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
    // Delete Section

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.className = "delete-button";
    deleteBtn.addEventListener(("click"), (e) =>  deleteHandler(e, {
        id: id,
        ref: "languages",
        parentInputRef: "languages",
        childInputRef: `input-language-container-${id}`,
        parentRef: "language_list",
        childRef: `preview-language-${id}`
    }));
    createSelect.addEventListener(("change"), (e) => levelSelectionHandler(e, id));
    createLabel.appendChild(createSelect);
    levelContainer.appendChild(createLabel);
    [title, deleteBtn].forEach((item) => wrapperTitleBtn.appendChild(item));
    [wrapperTitleBtn, createInputLanguageEntry.container, levelContainer].forEach((item) => createContainer.append(item));
    inputLanguageParent.appendChild(createContainer);

    // Preview
    const create = document.createElement("li");
    create.id = `preview-language-${id}`;
    create.textContent = (language === "" ? "English" : language) + " - " + (level === "" ? "proficient" : level);

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

    experience.forEach((item ) => plotExperience(item));
    education.forEach((item) => plotEducation(item));
    skills.forEach((item) => plotSkill(item));
    languages.forEach((item) => plotLanguage(item));

}

populate();
nameInput.addEventListener(("input"), (e) => inputHandler(e, {section: "personal_information"}));
emailInput.addEventListener(("input"), (e) => inputHandler(e, {section: "personal_information"}));
summaryInput.addEventListener(("input"), (e) => inputHandler(e, {section: "personal_information"}));
addressInput.addEventListener(("input"), (e) => inputHandler(e, {section: "personal_information"}));
telNumberInput.addEventListener(("input"), (e) => inputHandler(e, {section: "personal_information"}));
titleInput.addEventListener(("input"), (e) => inputHandler(e, {section: "personal_information"}));

buttonExperience.addEventListener(("click"), addExperienceHandler);
buttonEducation.addEventListener(("click"), addEducationHandler);
buttonSkill.addEventListener(("click"), skillHandler);
buttonLanguage.addEventListener(("click"), languageHandler);

submitBtn.addEventListener(("click"), submitHandler);
