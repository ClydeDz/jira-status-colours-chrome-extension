import { PRESET_CONFIGURATION } from "../common/settings";
import { getJiraStatusLabels, updateJiraStatusStyle } from "../common/document";

export function applyStyle(result) {
    const savedConfiguration = result || PRESET_CONFIGURATION;
    const elements = getJiraStatusLabels();
    
    for (let i = 0; i < elements.length; i++) {
        const configuration = savedConfiguration[elements[i].innerText.toUpperCase()];
        
        if(configuration) {
            updateJiraStatusStyle(elements[i], configuration);
        }
    }
}
