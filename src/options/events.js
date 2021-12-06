import { getElementById } from "../common/document";
import { setStorage } from "../common/storage";
import { createRow } from "./componentCreator";
import { presetConfiguration, ROW_COUNT, CHROME_SYNC_STORAGE_KEY, incrementRowCount } from "../common/settings";
import * as self from "./events";

export function addConfigurationRow() {
    incrementRowCount();
    const parentElement = getElementById("Configuration");
    createRow(ROW_COUNT, parentElement, undefined);
}

export function saveConfiguration() {
    const updatedConfiguration = {};

    for(var i=0; i <= ROW_COUNT; i++) {
        const previewPane = getElementById(`SampleOutput-${i}`);
        const backgroundColourPicker = getElementById(`BackgroundColour-${i}`);
        const textColourPicker = getElementById(`TextColour-${i}`);

        if(!previewPane || !backgroundColourPicker || !textColourPicker) {
            continue;
        }

        if(!previewPane.innerText || !previewPane.style.backgroundColor || !previewPane.style.color) {            
            continue;
        }

        updatedConfiguration[previewPane.innerText.toUpperCase()] = {
            backgroundColour: backgroundColourPicker.value,
            textColour: textColourPicker.value
        };
    }
    setStorage(CHROME_SYNC_STORAGE_KEY, updatedConfiguration);
}

export function startup(result) {
    const savedConfiguration = result || presetConfiguration;        
    const parentElement = getElementById("Configuration");

    for (let key of Object.keys(savedConfiguration)) {
        incrementRowCount();
        createRow(ROW_COUNT, parentElement, savedConfiguration[key], key);
    }
}

export function initializeEventListenersForOptions() {
    getElementById("SaveConfiguration").addEventListener("click", self.saveConfiguration);
    getElementById("AddConfigurationRow").addEventListener("click", self.addConfigurationRow);
}
