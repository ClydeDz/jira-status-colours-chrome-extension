const getStorage = (componentKey, callback) => {
    chrome.storage.sync.get([componentKey], function(result) {
        callback(result[componentKey]);
    });
};

const setStorage = (componentKey, value) => {
    chrome.storage.sync.set({[componentKey]: value});
};

const defaults = {
    "IN PROGRESS": {
        backgroundColour: "#F0B719",
        textColour: "#000000"
    },
    "BACKLOG": {
        backgroundColour: "#ff4747",
        textColour: "#000000"
    },
    "DONE": {
        backgroundColour: "#168500",
        textColour: "#FFFFFF"
    }
};


function createJiraStatusInput(id, defaultSettingKey) {
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

function createBackgroundColourInput(id, defaultSettingValue) {
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

function createTextColourInput(id, defaultSettingValue) {
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

function createRow(id, parentElement, defaultSettingValue, defaultSettingKey) {
    const jiraStatusInput = createJiraStatusInput(id, defaultSettingKey);
    const backgroundColourInput = createBackgroundColourInput(id, defaultSettingValue);
    const textColourInput = createTextColourInput(id, defaultSettingValue);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.id = `DeleteButton-${id}`;
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", (event) => {
        const row = event.target.parentElement;
        row.parentElement.removeChild(row);
    });

    const sampleOutput = document.createElement("span");
    sampleOutput.id = `SampleOutput-${id}`;
    sampleOutput.className = "sample-output";

    if(defaultSettingValue && defaultSettingKey) {
        sampleOutput.innerText = defaultSettingKey;
        sampleOutput.style.backgroundColor = defaultSettingValue.backgroundColour;
        sampleOutput.style.color = defaultSettingValue.textColour;
    }

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

let rowCount = 0;

document.getElementById('AddConfigurationRow').addEventListener("click", (event) => {
    rowCount++;
    const configuration = document.getElementById('Configuration');
    createRow(rowCount, configuration, undefined);
});

document.getElementById('SaveConfiguration').addEventListener("click", (event) => { 
    const updatedConfiguration = {};   
    for(var i=0; i <= rowCount; i++) {
        const sampleOutput = document.getElementById(`SampleOutput-${i}`);
        const backgroundColour = document.getElementById(`BackgroundColour-${i}`);
        const textColour = document.getElementById(`TextColour-${i}`);
        if(!sampleOutput) {
            console.log(sampleOutput);
            continue;
        }

        if(!sampleOutput.innerText && !sampleOutput.style.backgroundColor && !sampleOutput.style.color) {
            console.log("second", sampleOutput);
            continue;
        }

        updatedConfiguration[sampleOutput.innerText.toUpperCase()] = {
            backgroundColour: backgroundColour.value,
            textColour: textColour.value
        };
    }
    console.log(updatedConfiguration);
    setStorage("Jira-Status-Colours-Configuration", updatedConfiguration);
});

window.onload = function() {
    const parentElement = document.getElementById('Configuration');
    
    getStorage("Jira-Status-Colours-Configuration", (result) => {
        const savedConfiguration = result || defaults;        
        
        for (let key of Object.keys(savedConfiguration)) {
            console.log(savedConfiguration[key], key);
            rowCount++;
            createRow(rowCount, parentElement, savedConfiguration[key], key);
        }
    });
    
    // const jiraStatus = document.getElementById('JiraStatus');
    // const backgroundColour = document.getElementById('BackgroundColour');
    // const textColour = document.getElementById('TextColour');
    
    // jiraStatus.addEventListener('change', (event) => {
    //     document.getElementById("SampleOutput").innerText = event.target.value;
    // });

    // backgroundColour.addEventListener('change', (event) => {
    //     document.getElementById("SampleOutput").style.backgroundColor = event.target.value;
    // });

    // textColour.addEventListener('change', (event) => {
    //     document.getElementById("SampleOutput").style.color = event.target.value;
    // });
};
