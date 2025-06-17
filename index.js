const getForm = document.querySelector(".form-container");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const summaryInput = document.getElementById("summary");

let experienceCount = 1;

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
        //Creates a new field for user to type for their experience
        const getContainer = document.getElementById("experience");

        const wrapper = document.createElement("div");
        wrapper.setAttribute("id", `experience-${experienceCount}`);

        //Creates a title for the job section
        const title = document.createElement("h3");
        title.textContent = `Company - ${experienceCount}`;
        
        //Allows user to input company name, title job, start, and finish
        wrapper.appendChild(title);
        wrapper.appendChild(createInput("company", "text", experienceCount));
        wrapper.appendChild(createInput("title", "text", experienceCount));
        wrapper.appendChild(createInput("start", "date", experienceCount));
        wrapper.appendChild(createInput("finish", "date", experienceCount));

        //Adds a button to create a list of responsibilities
        const button = document.createElement("button");
        button.textContent = "Add job description";
        const unOrderedList = document.createElement("ul"); // Creates a section where user is allow to input their responsibility


        let jobEntries = 1

        unOrderedList.appendChild(createInput(`job-entry-${jobEntries}`, "text", jobEntries));

        button.addEventListener(("click"), (e) => {
            e.preventDefault();
            if(jobEntries + 1 > 3) return;
            unOrderedList.appendChild(createInput(`job-entry-${jobEntries+1}`, "text", experienceCount));

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
    })
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

//Save button
const plot = () => {
    const button = document.createElement("button");
    button.textContent = "Submit"
    getForm.appendChild(button);
}




plot();
