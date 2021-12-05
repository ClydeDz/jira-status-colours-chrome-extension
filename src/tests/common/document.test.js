import * as documentModule from "../../common/document";
import {
    document,
    getElementById,
    querySelectorAll,
    createElement,
    appendChild
} from "../mocks/documentMock";

describe("document → getJiraStatusLabels", () => {
    beforeEach(() => {
        documentModule.initializeDocument(document);
        jest.resetAllMocks();
    }); 

    test("getJiraStatusLabels method called", () => {
        documentModule.getJiraStatusLabels();
        expect(querySelectorAll).toHaveBeenCalledWith(".ghx-heading .ghx-info > span");
    });
});

describe("document → updateJiraStatusStyle", () => {
    beforeEach(() => {
        documentModule.initializeDocument(document);
        jest.resetAllMocks();
    }); 

    test("updateJiraStatusStyle method called", () => {
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
        documentModule.initializeDocument(document);
        jest.resetAllMocks();
    }); 

    test("getElementById method called", () => {
        documentModule.getElementById("#test");
        expect(getElementById).toHaveBeenCalledWith("#test");
    });
});

describe("document → createElement", () => {
    beforeEach(() => {
        documentModule.initializeDocument(document);
        jest.resetAllMocks();
    }); 

    test("createElement method called", () => {
        documentModule.createElement("div");
        expect(createElement).toHaveBeenCalledWith("div");
    });
});

describe("document → appendChild", () => {
    beforeEach(() => {
        documentModule.initializeDocument(document);
        jest.resetAllMocks();
    }); 

    test("appendChild method called", () => {
        var abc = {
            appendChild
        };
        var xyz;
        documentModule.appendChild(abc, xyz);
        expect(appendChild).toHaveBeenCalledWith(xyz);
    });
});

