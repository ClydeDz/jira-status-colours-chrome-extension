export const CHROME_SYNC_STORAGE_KEY = "Jira-Status-Colours-Configuration";
export const BACKGROUND_SCRIPT_INTERVAL = 1000;
export let ROW_COUNT = 0;

export const incrementRowCount = () => {
    ROW_COUNT++;
}

export const PRESET_CONFIGURATION = {
    "BACKLOG": {
        backgroundColour: "#e3e3e3",
        textColour: "#00058a"
    },
    "IN PROGRESS": {
        backgroundColour: "#ffc21a",
        textColour: "#611d00"
    },
    "IN REVIEW": {
        backgroundColour: "#8f00d1",
        textColour: "#f5e0ff"
    },
    "DONE": {
        backgroundColour: "#1a9e00",
        textColour: "#FFFFFF"
    },
    "RESOLVED": {
        backgroundColour: "#3b3b3b",
        textColour: "#99ff85"
    },
    "CANCELLED": {
        backgroundColour: "#000000",
        textColour: "#dedede"
    }
};

export const PLACEHOLDER_CONFIGURATION = {
    jiraStatusLabel: "STATUS",
    backgroundColour: "#ff67f3",
    textColour: "#080808"
}