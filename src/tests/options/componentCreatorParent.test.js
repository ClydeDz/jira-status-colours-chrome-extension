import { createRow } from "../../options/componentCreator";
import * as componentCreatorSpy from "../../options/componentCreator";
import * as documentModuleSpy from "../../common/document";

const createJiraStatusInputSpy = jest.spyOn(componentCreatorSpy, "createJiraStatusInput")
    .mockImplementation(jest.fn());
const createBackgroundColourPickerInputSpy = jest.spyOn(componentCreatorSpy, "createBackgroundColourPickerInput")
    .mockImplementation(jest.fn());
const createTextColourPickerInputSpy = jest.spyOn(componentCreatorSpy, "createTextColourPickerInput")
    .mockImplementation(jest.fn());
const createDeleteButtonSpy = jest.spyOn(componentCreatorSpy, "createDeleteButton")
    .mockImplementation(jest.fn());
const createPreviewLabelSpy = jest.spyOn(componentCreatorSpy, "createPreviewLabel")
    .mockImplementation(jest.fn());
const createLineBreakSpy = jest.spyOn(componentCreatorSpy, "createLineBreak")
    .mockImplementation(jest.fn());
const createDivSpy = jest.spyOn(componentCreatorSpy, "createDiv")
    .mockImplementation(jest.fn());

const appendChildSpy = jest.spyOn(documentModuleSpy, "appendChild")
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

        createRow(1, parentDiv, {}, "key");

        expect(appendChildSpy).toHaveBeenCalledTimes(7);
        expect(appendChildSpy).toHaveBeenNthCalledWith(7, parentDiv, {});
    });
});
