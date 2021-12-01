import { getElementById } from "../common/document";
import { rowCount, chromeSyncStorageKey } from "../common/settings";
import { setStorage } from "../common/storage";
import { createRow } from "./componentHelper";

export function addConfigurationRow() {
    rowCount++;
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
