import { initializeDocument, getElementById } from "../common/document";
import { presetConfiguration, rowCount, chromeSyncStorageKey } from "../common/settings";
import { getStorage } from "../common/storage";
import { createRow } from "./componentHelper";
import { addConfigurationRow, saveConfiguration } from "./helper";

export function initialLoad(result) {
    const savedConfiguration = result || presetConfiguration;        
    const parentElement = getElementById("Configuration");

    for (let key of Object.keys(savedConfiguration)) {
        rowCount++;
        createRow(rowCount, parentElement, savedConfiguration[key], key);
    }
}

export function initializeEventListenersForOptions() {
    getElementById("SaveConfiguration").addEventListener("click", saveConfiguration);
    getElementById("AddConfigurationRow").addEventListener("click", addConfigurationRow);
}

window.onload = function() {
    initializeDocument(document);
    initializeEventListenersForOptions();
    getStorage(chromeSyncStorageKey, initialLoad);
};
