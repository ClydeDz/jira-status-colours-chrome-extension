import * as componentCreatorModule from "../../options/componentCreator";
import * as documentModule from "../../common/document";

const createElementSpy = jest.spyOn(documentModule, "createElement")
    .mockImplementation(jest.fn());

describe("componentCreator → createJiraStatusInput", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it.each([
        [null],
        [undefined],
        ["key"]
    ])("should create a jira status text box %o", (mockKey) => {
        const mockEventListener = jest.fn();
        const mockInput = {element: "input", addEventListener: mockEventListener};
        createElementSpy.mockReturnValueOnce(mockInput);

        const jiraStatusInput = componentCreatorModule.createJiraStatusInput(1, mockKey);

        expect(createElementSpy).toHaveBeenCalledWith("input");
        expect(jiraStatusInput).toBe(mockInput);
        expect(jiraStatusInput.id).toBe("JiraStatus-1");
        expect(jiraStatusInput.type).toBe("text");
        expect(mockEventListener).toHaveBeenCalledWith("change", expect.any(Function));
    });

    it("should not set value", () => {
        const mockEventListener = jest.fn();
        const mockInput = {element: "input", addEventListener: mockEventListener};
        createElementSpy.mockReturnValueOnce(mockInput);

        const jiraStatusInput = componentCreatorModule.createJiraStatusInput(1, undefined);

        expect(jiraStatusInput.value).not.toBeDefined();
    });

    it("should set value", () => {
        const mockEventListener = jest.fn();
        const mockInput = {element: "input", addEventListener: mockEventListener};
        createElementSpy.mockReturnValueOnce(mockInput);

        const jiraStatusInput = componentCreatorModule.createJiraStatusInput(1, "done");

        expect(jiraStatusInput.value).toBe("done");
    });
});

describe("componentCreator → createBackgroundColourPickerInput", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it.each([
        [null],
        [undefined],
        [{ backgroundColour: "red", textColour: "blue"}]
    ])("should create a colour picker input %o", (mockConfiguration) => {
        const mockEventListener = jest.fn();
        const mockInput = {element: "input", addEventListener: mockEventListener};
        createElementSpy.mockReturnValueOnce(mockInput);

        const backgroundColourPicker = componentCreatorModule.createBackgroundColourPickerInput(1, mockConfiguration);

        expect(createElementSpy).toHaveBeenCalledWith("input");
        expect(backgroundColourPicker).toBe(mockInput);
        expect(backgroundColourPicker.type).toBe("color");
        expect(backgroundColourPicker.id).toBe("BackgroundColour-1");
        expect(mockEventListener).toHaveBeenCalledWith("change", expect.any(Function));
    });

    it("should not set value", () => {
        const mockEventListener = jest.fn();
        const mockInput = {element: "input", addEventListener: mockEventListener};
        createElementSpy.mockReturnValueOnce(mockInput);

        const backgroundColourPicker = componentCreatorModule.createBackgroundColourPickerInput(1, undefined);

        expect(backgroundColourPicker.value).not.toBeDefined();
    });

    it("should set value", () => {
        const mockEventListener = jest.fn();
        const mockInput = {element: "input", addEventListener: mockEventListener};
        createElementSpy.mockReturnValueOnce(mockInput);

        const backgroundColourPicker = componentCreatorModule.createBackgroundColourPickerInput(1, { backgroundColour: "red", textColour: "blue"});

        expect(backgroundColourPicker.value).toBe("red");
    });
});

describe("componentCreator → createTextColourPickerInput", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it.each([
        [null],
        [undefined],
        [{ backgroundColour: "red", textColour: "blue"}]
    ])("should create a colour picker input %o", (mockConfiguration) => {
        const mockEventListener = jest.fn();
        const mockInput = {element: "deleteButton", addEventListener: mockEventListener};
        createElementSpy.mockReturnValueOnce(mockInput);

        const textColourPicker = componentCreatorModule.createTextColourPickerInput(1, mockConfiguration);

        expect(createElementSpy).toHaveBeenCalledWith("input");
        expect(textColourPicker).toBe(mockInput);
        expect(textColourPicker.id).toBe("TextColour-1");
        expect(textColourPicker.type).toBe("color");
        expect(mockEventListener).toHaveBeenCalledWith("change", expect.any(Function));
    });

    it("should not set value", () => {
        const mockEventListener = jest.fn();
        const mockInput = {element: "deleteButton", addEventListener: mockEventListener};
        createElementSpy.mockReturnValueOnce(mockInput);

        const textColourPicker = componentCreatorModule.createTextColourPickerInput(1, undefined);

        expect(textColourPicker.value).not.toBeDefined();
    });

    it("should set value", () => {
        const mockEventListener = jest.fn();
        const mockInput = {element: "deleteButton", addEventListener: mockEventListener};
        createElementSpy.mockReturnValueOnce(mockInput);

        const textColourPicker = componentCreatorModule.createTextColourPickerInput(1, { backgroundColour: "red", textColour: "blue"});

        expect(textColourPicker.value).toBe("blue");
    });
});

describe("componentCreator → createDeleteButton", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("should create a delete button", () => {
        const mockEventListener = jest.fn();
        const mockDeleteButton = {element: "deleteButton", addEventListener: mockEventListener};
        createElementSpy.mockReturnValueOnce(mockDeleteButton);

        const deleteButton = componentCreatorModule.createDeleteButton(1);

        expect(createElementSpy).toHaveBeenCalledWith("span");
        expect(deleteButton).toBe(mockDeleteButton);
        expect(deleteButton.id).toBe("DeleteButton-1");
        expect(deleteButton.className).toBe("icon-btn-secondary icon-delete");
        expect(mockEventListener).toHaveBeenCalledWith("click", expect.any(Function));
    });
});
    
describe("componentCreator → createPreviewLabel", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("should create a preview label", () => {
        createElementSpy.mockReturnValueOnce({ element: "span", style: {}});     
        const mockConfiguration = { backgroundColour: "red", textColour: "blue"};   

        const previewLabel = componentCreatorModule.createPreviewLabel(1, mockConfiguration, "key");

        expect(createElementSpy).toHaveBeenCalledWith("span");
        expect(previewLabel).toBeDefined();
        expect(previewLabel.id).toBe("SampleOutput-1");
        expect(previewLabel.style.backgroundColor).toBe("red");
        expect(previewLabel.style.color).toBe("blue");
        expect(previewLabel.innerText).toBe("key");        
    });

    it("should not set preview label when configuration is not supplied", () => {
        createElementSpy.mockReturnValueOnce({ element: "span", style: {}});     
        const mockConfiguration = undefined;

        const previewLabel = componentCreatorModule.createPreviewLabel(1, mockConfiguration, "key");

        expect(createElementSpy).toHaveBeenCalledWith("span");
        expect(previewLabel).toBeDefined();
        expect(previewLabel.style.backgroundColor).not.toBeDefined();
        expect(previewLabel.style.color).not.toBeDefined();
        expect(previewLabel.innerText).not.toBeDefined();
    });

    it("should not set preview label when key is not supplied", () => {
        createElementSpy.mockReturnValueOnce({ element: "span", style: {}});     
        const mockConfiguration = { backgroundColour: "red", textColour: "blue"};   

        const previewLabel = componentCreatorModule.createPreviewLabel(1, mockConfiguration, undefined);

        expect(createElementSpy).toHaveBeenCalledWith("span");
        expect(previewLabel).toBeDefined();
        expect(previewLabel.style.backgroundColor).not.toBeDefined();
        expect(previewLabel.style.color).not.toBeDefined();
        expect(previewLabel.innerText).not.toBeDefined();
    });

    it("should not set preview label when key and configuration is not supplied", () => {
        createElementSpy.mockReturnValueOnce({ element: "span", style: {}});     

        const previewLabel = componentCreatorModule.createPreviewLabel(1, undefined, undefined);

        expect(createElementSpy).toHaveBeenCalledWith("span");
        expect(previewLabel).toBeDefined();
        expect(previewLabel.style.backgroundColor).not.toBeDefined();
        expect(previewLabel.style.color).not.toBeDefined();
        expect(previewLabel.innerText).not.toBeDefined();
    });
});
    
describe("componentCreator → createTableCell", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it.each([
        [{ className: "td" }],
        [null],
        [undefined],
    ])("should create a table cell td %o", (mockTdValue) => {
        createElementSpy.mockReturnValueOnce(mockTdValue);        

        const lineBreak = componentCreatorModule.createTableCell();

        expect(lineBreak).toBe(mockTdValue);
        expect(createElementSpy).toHaveBeenCalledWith("td");
    });
});

describe("componentCreator → createTableRow", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it.each([
        [{ className: "tr" }],
        [null],
        [undefined],
    ])("should create a table row tr %o", (mockTrValue) => {
        createElementSpy.mockReturnValueOnce(mockTrValue);        

        const div = componentCreatorModule.createTableRow();

        expect(div).toBe(mockTrValue);
        expect(createElementSpy).toHaveBeenCalledWith("tr");
    });
});
