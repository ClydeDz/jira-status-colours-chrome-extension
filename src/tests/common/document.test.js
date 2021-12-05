import * as documentModule from "../../common/document";
import * as documentMockModule from "../mocks/documentMock";

describe("document → getJiraStatusLabels", () => {
    beforeEach(() => {
        documentModule.initializeDocument(documentMockModule.document);
        jest.resetAllMocks();
    }); 

    test("queries the document with correct selectors", () => {
        documentModule.getJiraStatusLabels();
        expect(documentMockModule.querySelectorAll).toHaveBeenCalledWith(".ghx-heading .ghx-info > span");
    });
});

describe("document → updateJiraStatusStyle", () => {
    beforeEach(() => {
        documentModule.initializeDocument(documentMockModule.document);
        jest.resetAllMocks();
    }); 

    test("sets the style properties on supplied element", () => {
        var abc = { style: {} };
        var configuration = {
            backgroundColour: "red",
            textColour: "blue",
        };
        
        var element = documentModule.updateJiraStatusStyle(abc, configuration);
        
        expect(element.style.backgroundColor).toBe("red");
        expect(element.style.color).toBe("blue");
    });
});

describe("document → getElementById", () => {
    beforeEach(() => {
        documentModule.initializeDocument(documentMockModule.document);
        jest.resetAllMocks();
    }); 

    test("calls getElementById method called with supplied element selector", () => {
        documentModule.getElementById("#test");
        expect(documentMockModule.getElementById).toHaveBeenCalledWith("#test");
    });
});

describe("document → createElement", () => {
    beforeEach(() => {
        documentModule.initializeDocument(documentMockModule.document);
        jest.resetAllMocks();
    }); 

    test("calls createElement method with supplied html tag name", () => {
        documentModule.createElement("div");
        expect(documentMockModule.createElement).toHaveBeenCalledWith("div");
    });
});

describe("document → appendChild", () => {
    beforeEach(() => {
        documentModule.initializeDocument(documentMockModule.document);
        jest.resetAllMocks();
    }); 

    test("calls appendChild method with supplied child element", () => {
        var abc = {
            appendChild: documentMockModule.appendChild
        };
        var xyz;
        
        documentModule.appendChild(abc, xyz);

        expect(documentMockModule.appendChild).toHaveBeenCalledWith(xyz);
    });
});

