let doc; 

export function initializeDocument(injectedDocument) {
  doc = injectedDocument;
}

export function getJiraStatusLabels() {
    return document.querySelectorAll(".ghx-heading .ghx-info > span");
}

export function updateJiraStatusStyle(element, configuration) {
    element.style.backgroundColor = configuration.backgroundColour;
    element.style.color = configuration.textColour;
    return element;
}
