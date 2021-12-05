import { addConfigurationRow, startup } from "../../options/events";
import * as documentModuleSpy from "../../common/document";
import * as settingsModuleSpy from "../../common/settings";
import * as componentCreatorModuleSpy from "../../options/componentCreator";

const getElementByIdSpy = jest.spyOn(documentModuleSpy, "getElementById")
    .mockImplementation(jest.fn());

const createRowSpy = jest.spyOn(componentCreatorModuleSpy, "createRow")
    .mockImplementation(jest.fn());

const incrementRowCountSpy = jest.spyOn(settingsModuleSpy, "incrementRowCount")
    .mockImplementation(jest.fn());

describe("events → addConfigurationRow", () => {
    beforeEach(() => {
        settingsModuleSpy.rowCount = 0;
        jest.resetAllMocks();
    });

    it("should call create row with relevant parameters", () => {
        incrementRowCountSpy.mockImplementation(() => {
            settingsModuleSpy.rowCount++;
        });
        const mockParentDiv = { element: "parent"};
        getElementByIdSpy.mockReturnValueOnce(mockParentDiv);
        
        addConfigurationRow();
        
        expect(incrementRowCountSpy).toHaveBeenCalledTimes(1);
        expect(getElementByIdSpy).toHaveBeenCalledWith("Configuration");
        expect(createRowSpy).toHaveBeenCalledWith(1, mockParentDiv, undefined);
    });
});


describe("events → startup", () => {
    const mockConfiguration = {
        ...settingsModuleSpy.presetConfiguration,
        "OTHER": {
            backgroundColour: "other",
            textColour: "other"
        }
    }
    beforeEach(() => {
        settingsModuleSpy.rowCount = 0;
        jest.resetAllMocks();
    });

    it.each([
        [null, 3], 
        [mockConfiguration, 4]
    ])("should execute loop when relevant configuration found", (savedConfiguration, rowCounter) => {
        const mockParentDiv = { element: "parent"};
        getElementByIdSpy.mockReturnValueOnce(mockParentDiv);
        
        startup(savedConfiguration);
        
        expect(getElementByIdSpy).toHaveBeenCalledWith("Configuration");
        expect(incrementRowCountSpy).toHaveBeenCalledTimes(rowCounter);
        expect(createRowSpy).toHaveBeenCalledTimes(rowCounter);
    });

    it("should not execute loop when no configuration or parent element found", () => {
        getElementByIdSpy.mockReturnValueOnce([]);
        
        startup([]);
        
        expect(getElementByIdSpy).toHaveBeenCalledWith("Configuration");
        expect(incrementRowCountSpy).toHaveBeenCalledTimes(0);
        expect(createRowSpy).toHaveBeenCalledTimes(0);
    });

    it("should call create row with relevant parameters", () => {
        incrementRowCountSpy.mockImplementation(() => {
            settingsModuleSpy.rowCount++;
        });
        const mockParentDiv = { element: "parent"};
        getElementByIdSpy.mockReturnValueOnce(mockParentDiv);
        const mockConfiguration = {
            "OTHER": {
                backgroundColour: "other",
                textColour: "other"
            }
        }

        startup(mockConfiguration);
        
        expect(getElementByIdSpy).toHaveBeenCalledWith("Configuration");
        expect(incrementRowCountSpy).toHaveBeenCalledTimes(1);
        expect(createRowSpy).toHaveBeenCalledTimes(1);
        expect(createRowSpy).toHaveBeenCalledWith(1, mockParentDiv, mockConfiguration["OTHER"], "OTHER");
    });
});