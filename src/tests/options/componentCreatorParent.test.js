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
const createTableRowSpy = jest.spyOn(componentCreatorSelfModule, "createTableRow")
    .mockImplementation(jest.fn());
const createTableCellSpy = jest.spyOn(componentCreatorSelfModule, "createTableCell")
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
        createTableRowSpy.mockReturnValueOnce({});
        createTableCellSpy.mockReturnValue({});
        appendChildSpy.mockImplementation(jest.fn());        
        const parentDiv = {};        

        componentCreatorModule.createRow(1, parentDiv, {}, "key");

        expect(appendChildSpy).toHaveBeenCalledTimes(11);
    });
});
