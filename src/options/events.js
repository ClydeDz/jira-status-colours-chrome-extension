import { getElementById } from "../common/document";
import { setStorage } from "../common/storage";
import { createRow } from "./componentCreator";
import { presetConfiguration, rowCount, chromeSyncStorageKey, incrementRowCount } from "../common/settings";
import * as self from "./events";

export function addConfigurationRow() {
    incrementRowCount();
    const configuration = getElementById("Configuration");
    createRow(rowCount, configuration, undefined);
}

export function saveConfiguration() {
    const updatedConfiguration = {};

    for(var i=0; i <= rowCount; i++) {
        const previewPane = getElementById(`SampleOutput-${i}`);
        const backgroundColourPicker = getElementById(`BackgroundColour-${i}`);
        const textColourPicker = getElementById(`TextColour-${i}`);

        if(!previewPane) {
            continue;
        }

        if(!previewPane.innerText && !previewPane.style.backgroundColor && !previewPane.style.color) {
            continue;
        }

        updatedConfiguration[previewPane.innerText.toUpperCase()] = {
            backgroundColour: backgroundColourPicker.value,
            textColour: textColourPicker.value
        };
    }
    setStorage(chromeSyncStorageKey, updatedConfiguration);
}

export function startup(result) {
    const savedConfiguration = result || presetConfiguration;        
    const parentElement = getElementById("Configuration");

    for (let key of Object.keys(savedConfiguration)) {
        incrementRowCount();
        createRow(rowCount, parentElement, savedConfiguration[key], key);
    }
}

export function initializeEventListenersForOptions() {
    getElementById("SaveConfiguration").addEventListener("click", self.saveConfiguration);
    getElementById("AddConfigurationRow").addEventListener("click", self.addConfigurationRow);
}
