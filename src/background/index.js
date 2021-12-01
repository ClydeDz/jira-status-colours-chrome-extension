import { getStorage } from "../common/storage";
import { presetConfiguration, chromeSyncStorageKey } from "../common/settings";
import { initializeDocument, getJiraStatusLabels, updateJiraStatusStyle } from "../common/document";

export function applyStyle(result) {
    const savedConfiguration = result || presetConfiguration;
    const elements = getJiraStatusLabels();

    for (let i = 0; i < elements.length; i++) {
        const configuration = savedConfiguration[elements[i].innerText.toUpperCase()];
        
        if(configuration) {
            updateJiraStatusStyle(elements[i], configuration);
        }
    }
}

window.onload = function() {
    initializeDocument(document);
    getStorage(chromeSyncStorageKey, applyStyle);
}
