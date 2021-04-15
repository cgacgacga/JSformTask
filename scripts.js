let buttonActive = "button-active";
let buttonDisabled = "button-disabled";
let buttonDivId = "button_div";
let phoneRegExp = /^\+[0-9] \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/
let amountOfRequiredImages = 2;


function createNewButton(newButtonId) {
    let newButton = document.createElement("input");
    newButton.type = "button";
    newButton.value = "Click me";
    newButton.onclick = function() { spawnTwoButtons(newButtonId) };
    newButton.className = buttonActive;
    newButton.id = newButtonId;

    return newButton;
}

function calculateLastId() {
    let activeButtons = document.getElementsByClassName(buttonActive);
    let curMaxId = 1;
    for (let i = 0; i < activeButtons.length; i++) {
        if (activeButtons[i].id > curMaxId) {
            curMaxId = activeButtons[i].id;
        }
    }
    return curMaxId;
}

function spawnTwoButtons(buttonId) {
    let clickedButton = document.getElementById(buttonId)
    let lastGivenId = calculateLastId();

    let firstNewButton = createNewButton(lastGivenId + 1);
    let secondNewButton = createNewButton(lastGivenId + 2);

    document.getElementById(buttonDivId).appendChild(firstNewButton);
    document.getElementById(buttonDivId).appendChild(secondNewButton);

    clickedButton.disabled = true;
    clickedButton.className = buttonDisabled;
    clickedButton.value = "";

}


function checkPhoneMask(phoneNumber) {
    let phoneMask = new RegExp(phoneRegExp);
    let phoneNumberExists = phoneNumber.match(phoneMask);
    console.log();

    if (phoneNumberExists == null) {
        let phoneErrorExists = document.getElementById("phoneError");

        if (phoneErrorExists == null) {
            let phoneErrorSpan = document.createElement("span");
            phoneErrorSpan.id = "phoneError";

            let phoneErrorText = document.createElement("p");
            phoneErrorText.textContent = "Please fill in the number properly";

            document.getElementById("phone-div").appendChild(phoneErrorSpan);
            phoneErrorSpan.appendChild(phoneErrorText);
        }
    } else {
        if (document.getElementById("phoneError") != null) {
            document.getElementById("phoneError").remove();
        }
    }

}

function countFiles() {
    let fileInputs = document.getElementById("file-inputs").childNodes;
    let cnt = 0;
    for (let i = 0; i < fileInputs.length; i++) {
        if (fileInputs[i].type === "file") {
            cnt++;
        }
    }
    return cnt;
}

function createNewFileInput() {
    let fileInputs = document.getElementById("file-inputs");

    let newInput = document.createElement("input");
    newInput.type = "file";
    console.log(countFiles());

    if (countFiles() < amountOfRequiredImages) {
        newInput.required = true;
    }

    if (countFiles() + 1 >= amountOfRequiredImages) {
        let submitButton = document.getElementById("submitForm");
        submitButton.disabled = false;
    } else {
        let submitButton = document.getElementById("submitForm");
        submitButton.disabled = true;
    }

    fileInputs.appendChild(newInput);
}


function removeLastFileInput() {
    document.getElementById("file-inputs").lastChild.remove();

    if (countFiles() >= amountOfRequiredImages) {
        let submitButton = document.getElementById("submitForm");
        submitButton.disabled = false;
    } else {
        let submitButton = document.getElementById("submitForm");
        submitButton.disabled = true;
    }
}

function validateInputs() {
    let phoneError = document.getElementById("phoneError");
    //fact that files are attached in at least two of file inputs is checked on the spot when initializing them
    if (phoneError == null && countFiles() >= amountOfRequiredImages) {

        let successRes = document.createElement("p1");
        successRes.innerText = "Form has been submitted successfully, redirect or whatever";
        document.body.appendChild(successRes);
    }
}