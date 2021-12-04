import { createDiv, createLineBreak, createPreviewLabel } from "../../options/componentCreator";
import * as documentModuleSpy from "../../common/document";

const createElementSpy = jest.spyOn(documentModuleSpy, "createElement")
    .mockImplementation(jest.fn());


describe("componentCreator → createPreviewLabel", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("should create a preview label", () => {
        createElementSpy.mockReturnValueOnce({ element: "span", style: {}});     
        const mockConfiguration = { backgroundColour: "red", textColour: "blue"};   

        const previewLabel = createPreviewLabel(1, mockConfiguration, "key");

        expect(createElementSpy).toHaveBeenCalledWith("span");
        expect(previewLabel).toBeDefined();
        expect(previewLabel.id).toBe("SampleOutput-1");
        expect(previewLabel.style.backgroundColor).toBe("red");
        expect(previewLabel.style.color).toBe("blue");
        expect(previewLabel.innerText).toBe("key");        
    });

    it("should not set preview area when configuration is not supplied", () => {
        createElementSpy.mockReturnValueOnce({ element: "span", style: {}});     
        const mockConfiguration = undefined;

        const previewLabel = createPreviewLabel(1, mockConfiguration, "key");

        expect(createElementSpy).toHaveBeenCalledWith("span");
        expect(previewLabel).toBeDefined();
        expect(previewLabel.style.backgroundColor).not.toBeDefined();
        expect(previewLabel.style.color).not.toBeDefined();
        expect(previewLabel.innerText).not.toBeDefined();
    });

    it("should not set preview area when key is not supplied", () => {
        createElementSpy.mockReturnValueOnce({ element: "span", style: {}});     
        const mockConfiguration = { backgroundColour: "red", textColour: "blue"};   

        const previewLabel = createPreviewLabel(1, mockConfiguration, undefined);

        expect(createElementSpy).toHaveBeenCalledWith("span");
        expect(previewLabel).toBeDefined();
        expect(previewLabel.style.backgroundColor).not.toBeDefined();
        expect(previewLabel.style.color).not.toBeDefined();
        expect(previewLabel.innerText).not.toBeDefined();
    });

    it("should not set preview area when key is not supplied", () => {
        createElementSpy.mockReturnValueOnce({ element: "span", style: {}});     

        const previewLabel = createPreviewLabel(1, undefined, undefined);

        expect(createElementSpy).toHaveBeenCalledWith("span");
        expect(previewLabel).toBeDefined();
        expect(previewLabel.style.backgroundColor).not.toBeDefined();
        expect(previewLabel.style.color).not.toBeDefined();
        expect(previewLabel.innerText).not.toBeDefined();
    });
});
    
describe("componentCreator → createLineBreak", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it.each([
        [{ className: "mockBr" }],
        [null],
        [undefined],
    ])("should create a line break br %o", (mockBrValue) => {
        createElementSpy.mockReturnValueOnce(mockBrValue);        

        const lineBreak = createLineBreak();

        expect(lineBreak).toBe(mockBrValue);
        expect(createElementSpy).toHaveBeenCalledWith("br");
    });
});

describe("componentCreator → createDiv", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it.each([
        [{ className: "mockDiv" }],
        [null],
        [undefined],
    ])("should create a div %o", (mockDivValue) => {
        createElementSpy.mockReturnValueOnce(mockDivValue);        

        const div = createDiv();

        expect(div).toBe(mockDivValue);
        expect(createElementSpy).toHaveBeenCalledWith("div");
    });
});
