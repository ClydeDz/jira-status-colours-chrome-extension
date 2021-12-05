import * as componentCreatorModule from "../../options/componentCreator";
import * as componentCreatorSelfModule from "../../options/componentCreator";
import * as documentModule from "../../common/document";

const createJiraStatusInputSpy = jest.spyOn(componentCreatorSelfModule, "createJiraStatusInput")
    .mockImplementation(jest.fn());
const createBackgroundColourPickerInputSpy = jest.spyOn(componentCreatorSelfModule, "createBackgroundColourPickerInput")
    .mockImplementation(jest.fn());
const createTextColourPickerInputSpy = jest.spyOn(componentCreatorSelfModule, "createTextColourPickerInput")
    .mockImplementation(jest.fn());
const createDeleteButtonSpy = jest.spyOn(componentCreatorSelfModule, "createDeleteButton")
    .mockImplementation(jest.fn());
const createPreviewLabelSpy = jest.spyOn(componentCreatorSelfModule, "createPreviewLabel")
    .mockImplementation(jest.fn());
const createLineBreakSpy = jest.spyOn(componentCreatorSelfModule, "createLineBreak")
    .mockImplementation(jest.fn());
const createDivSpy = jest.spyOn(componentCreatorSelfModule, "createDiv")
    .mockImplementation(jest.fn());

const appendChildSpy = jest.spyOn(documentModule, "appendChild")
    .mockImplementation(jest.fn());

describe("componentCreator → createRow", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("should call all methods as expected", () => {
        createJiraStatusInputSpy.mockReturnValueOnce({});
        createBackgroundColourPickerInputSpy.mockReturnValueOnce({});
        createTextColourPickerInputSpy.mockReturnValueOnce({});
        createDeleteButtonSpy.mockReturnValueOnce({});
        createPreviewLabelSpy.mockReturnValueOnce({});
        createLineBreakSpy.mockReturnValueOnce({});
        createDivSpy.mockReturnValueOnce({});
        appendChildSpy.mockImplementation(jest.fn());        
        const parentDiv = {};        

        componentCreatorModule.createRow(1, parentDiv, {}, "key");

        expect(appendChildSpy).toHaveBeenCalledTimes(7);
        expect(appendChildSpy).toHaveBeenNthCalledWith(7, parentDiv, {});
    });
});
