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
const getStorage = (componentKey, callback) => {
    chrome.storage.sync.get([componentKey], function(result) {
        callback(result[componentKey]);
    });
};

const getElements = () => {
    return document.querySelectorAll(".ghx-heading .ghx-info > span");
}

export function start() {
    getStorage("Jira-Status-Colours-Configuration", (result) => {
        const savedConfiguration = result || defaults;
        //console.log(savedConfiguration);

        const elements = getElements();

        for (let i = 0; i < elements.length; i++) {
            
            console.log(savedConfiguration, elements[i].innerText.toUpperCase());
            const configuration = savedConfiguration[elements[i].innerText.toUpperCase()];
            console.log(configuration);
            
            if(configuration) {
                console.log(elements[i]);
                elements[i].style.backgroundColor = configuration.backgroundColour;
                elements[i].style.color = configuration.textColour;
            }
        }
    });    
}
