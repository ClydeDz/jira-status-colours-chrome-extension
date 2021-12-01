import { initializeDocument, getElementById, initializeEventListenersForOptions } from "../common/document";
import { presetConfiguration, rowCount, chromeSyncStorageKey } from "../common/settings";
import { getStorage } from "../common/storage";
import { createRow } from "./documentHelper";

export function initialLoad(result) {
    const savedConfiguration = result || presetConfiguration;        
    const parentElement = getElementById("Configuration");

    for (let key of Object.keys(savedConfiguration)) {
        rowCount++;
        createRow(rowCount, parentElement, savedConfiguration[key], key);
    }
}

window.onload = function() {
    initializeDocument(document);
    initializeEventListenersForOptions();
    getStorage(chromeSyncStorageKey, initialLoad);
};
