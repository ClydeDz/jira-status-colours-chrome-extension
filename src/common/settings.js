export const CHROME_SYNC_STORAGE_KEY = "Jira-Status-Colours-Configuration";
export let rowCount = 0;

export const incrementRowCount = () => {
    rowCount++;
}

export const presetConfiguration = {
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

export const PLACEHOLDER_CONFIGURATION = {
    jiraStatusLabel: "STATUS",
    backgroundColour: "#ff67f3",
    textColour: "#080808"
}