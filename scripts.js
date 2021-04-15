let buttonActiveStyle = 'button-active';
let buttonDisabledStyle = 'button-disabled';

let buttonDivId = 'buttonDiv';
let buttonType = 'button';
let buttonValue = 'Click me';

let phoneErrorId = 'phoneError';
let phoneDiv = 'phoneDiv';

let spanTag = 'span'
let pTag = 'p';

let fileInputsId = 'fileInputs';
let submitForm = 'submitForm';

let phoneRegExp = /^\+[0-9] \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/
let amountOfRequiredImages = 2;




function createNewButton(newButtonId) {
    let newButton = document.createElement('input');

    newButton.type = buttonType;
    newButton.value = buttonValue;
    newButton.onclick = function() { spawnTwoButtons(newButtonId) };
    newButton.className = buttonActiveStyle;
    newButton.id = newButtonId;

    return newButton;
}

function calculateLastId() {
    let activeButtons = document.getElementsByClassName(buttonActiveStyle);
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
    console.log(clickedButton);
    let lastGivenId = calculateLastId();

    let firstNewButton = createNewButton(lastGivenId + 1);
    let secondNewButton = createNewButton(lastGivenId + 2);

    document.getElementById(buttonDivId).appendChild(firstNewButton);
    document.getElementById(buttonDivId).appendChild(secondNewButton);

    clickedButton.disabled = true;
    clickedButton.className = buttonDisabledStyle;
    clickedButton.value = '';

}


function checkPhoneMask(phoneNumber) {
    let phoneMask = new RegExp(phoneRegExp);
    let phoneNumberExists = phoneNumber.match(phoneMask);
    console.log();

    if (phoneNumberExists == null) {
        let phoneErrorExists = document.getElementById(phoneErrorId);

        if (phoneErrorExists == null) {
            let phoneErrorSpan = document.createElement(spanTag);
            phoneErrorSpan.id = phoneErrorId;

            let phoneErrorText = document.createElement(pTag);
            phoneErrorText.textContent = 'Please fill in the number properly';

            document.getElementById(phoneDiv).appendChild(phoneErrorSpan);
            phoneErrorSpan.appendChild(phoneErrorText);
        }
        validateInputs();
    } else {
        if (document.getElementById(phoneErrorId) != null) {
            document.getElementById(phoneErrorId).remove();
        }
        validateInputs();
    }

}

function countFiles() {
    let fileInputs = document.getElementById(fileInputsId).childNodes;
    let cnt = 0;
    for (let i = 0; i < fileInputs.length; i++) {
        if (fileInputs[i].type === 'file') {
            cnt++;
        }
    }
    return cnt;
}

function createNewFileInput() {
    let fileInputs = document.getElementById(fileInputsId);
    console.log(fileInputs);
    let newInput = document.createElement('input');
    newInput.type = 'file';
    console.log(countFiles());

    if (countFiles() < amountOfRequiredImages) {
        newInput.required = true;
    }

    fileInputs.appendChild(newInput);
    validateInputs();
}


function removeLastFileInput() {
    document.getElementById(fileInputsId).lastChild.remove();
    validateInputs();
}

function validateInputs() {
    let phoneError = document.getElementById(phoneErrorId);
    console.log(phoneError);
    //fact that files are attached in at least two of file inputs is checked on the spot when initializing them
    if (phoneError == null && countFiles() >= amountOfRequiredImages) {
        let submitButton = document.getElementById(submitForm);
        submitButton.disabled = false;
    } else {
        let submitButton = document.getElementById(submitForm);
        submitButton.disabled = true;
    }
}