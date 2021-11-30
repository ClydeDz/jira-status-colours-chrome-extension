import { defaults, rowCount } from "../common/settings";
import { getStorage, setStorage } from "../common/storage";
import { createRow } from "./documentHelper";

function addConfigurationRow() {
    rowCount++;
    const configuration = document.getElementById('Configuration');
    createRow(rowCount, configuration, undefined);
}

document.getElementById('AddConfigurationRow')
    .addEventListener("click", addConfigurationRow);

function saveConfiguration() {
    const updatedConfiguration = {};   
    for(var i=0; i <= rowCount; i++) {
        const sampleOutput = document.getElementById(`SampleOutput-${i}`);
        const backgroundColour = document.getElementById(`BackgroundColour-${i}`);
        const textColour = document.getElementById(`TextColour-${i}`);
        if(!sampleOutput) {
            continue;
        }

        if(!sampleOutput.innerText && !sampleOutput.style.backgroundColor && !sampleOutput.style.color) {
            continue;
        }

        updatedConfiguration[sampleOutput.innerText.toUpperCase()] = {
            backgroundColour: backgroundColour.value,
            textColour: textColour.value
        };
    }
    setStorage("Jira-Status-Colours-Configuration", updatedConfiguration);
}

document.getElementById('SaveConfiguration')
    .addEventListener("click", saveConfiguration);

function initialLoad(result) {
    const savedConfiguration = result || defaults;        
    const parentElement = document.getElementById('Configuration');

    for (let key of Object.keys(savedConfiguration)) {
        rowCount++;
        createRow(rowCount, parentElement, savedConfiguration[key], key);
    }
}

window.onload = function() {
    getStorage("Jira-Status-Colours-Configuration", initialLoad);
};
