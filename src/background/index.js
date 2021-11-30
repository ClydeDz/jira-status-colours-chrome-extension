import { getStorage } from "../common/storage";
import { defaults } from "../common/settings";

const getElements = () => {
    return document.querySelectorAll(".ghx-heading .ghx-info > span");
}

function start() {
    getStorage("Jira-Status-Colours-Configuration", (result) => {
        const savedConfiguration = result || defaults;
        const elements = getElements();

        for (let i = 0; i < elements.length; i++) {
            const configuration = savedConfiguration[elements[i].innerText.toUpperCase()];
            
            if(configuration) {
                elements[i].style.backgroundColor = configuration.backgroundColour;
                elements[i].style.color = configuration.textColour;
            }
        }
    });    
}

setTimeout(function() {
    start();
}, 500);