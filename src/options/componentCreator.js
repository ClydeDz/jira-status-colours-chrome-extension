import { appendChild, createElement, getElementById } from "../common/document";
import * as self from "./componentCreator";

export function createJiraStatusInput(id, defaultSettingKey) {
    const jiraStatusInput = createElement("input");
    jiraStatusInput.type = "text";
    jiraStatusInput.id = `JiraStatus-${id}`;
    jiraStatusInput.style = "text-transform:uppercase";
    jiraStatusInput.addEventListener("change", (event) => {
        getElementById(`SampleOutput-${id}`).innerText = event.target.value;
    });    

    if(defaultSettingKey) {
        jiraStatusInput.value = defaultSettingKey;
    }   

    return jiraStatusInput;
}

export function createBackgroundColourPickerInput(id, defaultSettingValue) {
    const backgroundColourInput = createElement("input");
    backgroundColourInput.type = "color";
    backgroundColourInput.id = `BackgroundColour-${id}`;
    backgroundColourInput.addEventListener("change", (event) => {
        getElementById(`SampleOutput-${id}`).style.backgroundColor = event.target.value;
    });

    if(defaultSettingValue) {
        backgroundColourInput.value = defaultSettingValue.backgroundColour;
    }

    return backgroundColourInput;
}

export function createTextColourPickerInput(id, defaultSettingValue) {
    const textColourInput = createElement("input");
    textColourInput.type = "color";
    textColourInput.id = `TextColour-${id}`;
    textColourInput.addEventListener("change", (event) => {
        getElementById(`SampleOutput-${id}`).style.color = event.target.value;
    });

    if(defaultSettingValue) {
        textColourInput.value = defaultSettingValue.textColour;
    }

    return textColourInput;
}

export function createDeleteButton(id) {
    const deleteButton = createElement("span");
    deleteButton.id = `DeleteButton-${id}`;
    deleteButton.innerText = "";
    deleteButton.ariaLabel = "Delete";
    deleteButton.className = "icon-btn-secondary icon-delete";
    deleteButton.addEventListener("click", (event) => {
        const row = event.target.parentElement.parentElement;
        row.parentElement.removeChild(row);
    });
    return deleteButton;
}

export function createPreviewLabel(id, defaultSettingValue, defaultSettingKey) {
    const sampleOutput = createElement("span");
    sampleOutput.id = `SampleOutput-${id}`;
    sampleOutput.className = "preview-label";

    if(defaultSettingValue && defaultSettingKey) {
        sampleOutput.innerText = defaultSettingKey;
        sampleOutput.style.backgroundColor = defaultSettingValue.backgroundColour;
        sampleOutput.style.color = defaultSettingValue.textColour;
    }

    return sampleOutput;
}

export function createTableRow() {
    return createElement("tr");
}

export function createTableCell() {
    return createElement("td");
}

export function createRow(id, parentElement, defaultSettingValue, defaultSettingKey) {
    const jiraStatusInput = self.createJiraStatusInput(id, defaultSettingKey);
    const backgroundColourPickerInput = self.createBackgroundColourPickerInput(id, defaultSettingValue);
    const textColourPickerInput = self.createTextColourPickerInput(id, defaultSettingValue);
    const deleteButton = self.createDeleteButton(id);
    const previewLabel = self.createPreviewLabel(id, defaultSettingValue, defaultSettingKey);   
    
    const tableRow = createTableRow();
    appendChild(parentElement, tableRow);

    const tableColumnOne = createTableCell();
    appendChild(tableColumnOne, deleteButton);
    appendChild(tableRow, tableColumnOne);

    const tableColumnTwo = createTableCell();
    appendChild(tableColumnTwo, jiraStatusInput);
    appendChild(tableRow, tableColumnTwo);

    const tableColumnThree = createTableCell();
    appendChild(tableColumnThree, backgroundColourPickerInput);
    appendChild(tableRow, tableColumnThree);

    const tableColumnFour = createTableCell();
    appendChild(tableColumnFour, textColourPickerInput);
    appendChild(tableRow, tableColumnFour);

    const tableColumnFive = createTableCell();
    appendChild(tableColumnFive, previewLabel);
    appendChild(tableRow, tableColumnFive);    
}
