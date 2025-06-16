const getForm = document.querySelector(".form-container");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const summaryInput = document.getElementById("summary");

const nameHandler = (e) => {
    const previewName = document.getElementById("preview-name");
    previewName.textContent= e.currentTarget.value;
}

const plot = () => {
    const button = document.createElement("button");
    button.textContent = "Submit"
    getForm.appendChild(button);
}

const plotPreview = () => {


    
}

nameInput.addEventListener("input", nameHandler);

plot();
