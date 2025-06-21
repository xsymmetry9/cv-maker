const getForm = document.querySelector(".form-container");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const summaryInput = document.getElementById("summary");

const cvData = {
    name: "",
    email: "",
    summary: "",
    experience: [],
    education: [],
}

let experienceCount = 1;
let educationCount = 1;

// User is able to see what they are typing
const nameHandler = (e) => {
    const {name, value} = e.currentTarget;
    const previewInput = document.getElementById(`preview-${name}`);
    previewInput.textContent= value;
}

nameInput.addEventListener("input", nameHandler);
emailInput.addEventListener("input", nameHandler);
summaryInput.addEventListener("input", nameHandler);

// Experience Section  
const buttonExperience = document.querySelector("#btn-experience");

//Creates all inputs for experience
//It takes what we are inputing
const createInput = (name, type, index) => {
    const container = document.createElement("label");
    container.textContent = name;
    const input = document.createElement("input");
    input.setAttribute("id", `${name}-${index}`)
    input.setAttribute("name", `${name}-${index}`);

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
        wrapper.appendChild(createInput("company", "text", currentExperience));
        wrapper.appendChild(createInput("title", "text", currentExperience));
        wrapper.appendChild(createInput("start", "date", currentExperience));
        wrapper.appendChild(createInput("finish", "date", currentExperience));

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
    const title = document.createElement("p");
    wrapper.appendChild(title);
    title.textContent = "[Name of Company]"
    title.setAttribute("id", `preview-company-${index}`)

    const jobTitle = document.createElement("p");
    wrapper.appendChild(jobTitle);
    jobTitle.textContent = "[Job title]";
    jobTitle.setAttribute("id", `preview-title-${index}`)

    const start = document.createElement("p");
    start.textContent = `${new Date()}`;
    start.setAttribute("id", `preview-start-${index}`);
    wrapper.appendChild(start);

    const finish = document.createElement("p");
    finish.textContent = `${new Date()}`;
    finish.setAttribute("id", `preview-finish-${index}`);
    wrapper.appendChild(finish);  

    const listOfJobDescriptions = document.createElement("ul");
    listOfJobDescriptions.setAttribute("id", `preview-job-experience-${index}`);
    wrapper.appendChild(listOfJobDescriptions);

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
        const getPreviewStart = document.getElementById(`preview-start-${index}`);
        getPreviewStart.textContent = e.currentTarget.value;
    });

    readInputFinish.addEventListener("input", (e) => {
        const getPreviewFinish = document.getElementById(`preview-finish-${index}`);
        getPreviewFinish.textContent = e.currentTarget.value;
    });

    eventExperienceHandler(index);
}

const eventExperienceHandler = (index) => {
    const readContainer = document.getElementById(`inputs-job-experience-${index}`);

    console.log(readContainer.querySelectorAll("input"));
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
    const labelTitle = document.createElement("label");
    labelTitle.textContent = "Name of institution";

    const inputMajor = document.createElement("input");
    const labelMajor = document.createElement("label");
    labelMajor.textContent = "Major:";

    const labelDate = document.createElement("label");
    const inputDate = document.createElement("input");
    inputDate.setAttribute("id", `date-${currentEducation}`);
    inputDate.setAttribute("type", "date");
    labelDate.textContent = "Finish Date";
    
    wrapper.appendChild(labelTitle);
    wrapper.appendChild(inputTitle);
    wrapper.appendChild(labelMajor);
    wrapper.appendChild(inputMajor);
    wrapper.appendChild(labelDate);
    wrapper.appendChild(inputDate);

    getEducationContainer.appendChild(wrapper);

    //Adds Preview Education
    const getPreviewEducation = document.getElementById("preview-job-education");
    const createPreviewWrapper = document.createElement("div");
    createPreviewWrapper.setAttribute("id", `preview-education-${currentEducation}`);

    const title = document.createElement("p");
    title.textContent = `Institution-${currentEducation}`;

    const major = document.createElement("p");
    major.textContent = `Major-${currentEducation}`;

    const finishedDate = document.createElement("p");
    finishedDate.textContent = `Date-${currentEducation}`

    createPreviewWrapper.appendChild(title);
    createPreviewWrapper.appendChild(major);
    createPreviewWrapper.appendChild(finishedDate);
    getPreviewEducation.appendChild(createPreviewWrapper);

    inputTitle.addEventListener(('input'), (e) => {
        e.preventDefault();
        title.textContent = e.currentTarget.value;
    });

    inputMajor.addEventListener(('input'), (e) => {
        e.preventDefault();
        major.textContent = e.currentTarget.value;
    });

    inputDate.addEventListener(("input"), (e) => {
        e.preventDefault();
        finishedDate.textContent= e.currentTarget.value;
    });
    educationCount++;
}

educationButton.addEventListener(("click"), addEducationHandler);

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
