
export const createJiraStatusInput = (id, defaultSettingKey) => {
    const jiraStatusInput = document.createElement("input");
    jiraStatusInput.type = "text";
    jiraStatusInput.id = `JiraStatus-${id}`;
    jiraStatusInput.addEventListener("change", (event) => {
        document.getElementById(`SampleOutput-${id}`).innerText = event.target.value;
    });
    jiraStatusInput.style = "text-transform:uppercase";

    if(defaultSettingKey) {
        jiraStatusInput.value = defaultSettingKey;
    }   

    return jiraStatusInput;
}

export const createBackgroundColourInput = (id, defaultSettingValue) => {
    const backgroundColourInput = document.createElement("input");
    backgroundColourInput.type = "color";
    backgroundColourInput.id = `BackgroundColour-${id}`;
    backgroundColourInput.addEventListener("change", (event) => {
        document.getElementById(`SampleOutput-${id}`).style.backgroundColor = event.target.value;
    });

    if(defaultSettingValue) {
        backgroundColourInput.value = defaultSettingValue.backgroundColour;
    }

    return backgroundColourInput;
}

export const createTextColourInput = (id, defaultSettingValue) => {
    const textColourInput = document.createElement("input");
    textColourInput.type = "color";
    textColourInput.id = `TextColour-${id}`;
    textColourInput.addEventListener("change", (event) => {
        document.getElementById(`SampleOutput-${id}`).style.color = event.target.value;
    });

    if(defaultSettingValue) {
        textColourInput.value = defaultSettingValue.textColour;
    }

    return textColourInput;
}

export const createDeleteButton = (id) => {
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.id = `DeleteButton-${id}`;
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", (event) => {
        const row = event.target.parentElement;
        row.parentElement.removeChild(row);
    });
    return deleteButton;
}

export const createSampleOutput = (id, defaultSettingValue, defaultSettingKey) => {
    const sampleOutput = document.createElement("span");
    sampleOutput.id = `SampleOutput-${id}`;
    sampleOutput.className = "sample-output";

    if(defaultSettingValue && defaultSettingKey) {
        sampleOutput.innerText = defaultSettingKey;
        sampleOutput.style.backgroundColor = defaultSettingValue.backgroundColour;
        sampleOutput.style.color = defaultSettingValue.textColour;
    }

    return sampleOutput;
}

export const createRow = (id, parentElement, defaultSettingValue, defaultSettingKey) => {
    const jiraStatusInput = createJiraStatusInput(id, defaultSettingKey);
    const backgroundColourInput = createBackgroundColourInput(id, defaultSettingValue);
    const textColourInput = createTextColourInput(id, defaultSettingValue);
    const deleteButton = createDeleteButton(id);
    const sampleOutput = createSampleOutput(id, defaultSettingValue, defaultSettingKey);   
    const lineBreak = document.createElement("br");
    const rowContainer = document.createElement("div");

    rowContainer.appendChild(jiraStatusInput);
    rowContainer.appendChild(backgroundColourInput);
    rowContainer.appendChild(textColourInput);
    rowContainer.appendChild(deleteButton);
    rowContainer.appendChild(sampleOutput);
    rowContainer.appendChild(lineBreak);

    parentElement.appendChild(rowContainer);
}
