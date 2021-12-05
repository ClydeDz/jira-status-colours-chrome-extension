import { addConfigurationRow, startup, initializeEventListenersForOptions, saveConfiguration } from "../../options/events";
import * as documentModuleSpy from "../../common/document";
import * as settingsModuleSpy from "../../common/settings";
import * as componentCreatorModuleSpy from "../../options/componentCreator";
import * as storageModuleSpy from "../../common/storage";

const getElementByIdSpy = jest.spyOn(documentModuleSpy, "getElementById")
    .mockImplementation(jest.fn());

const createRowSpy = jest.spyOn(componentCreatorModuleSpy, "createRow")
    .mockImplementation(jest.fn());

const incrementRowCountSpy = jest.spyOn(settingsModuleSpy, "incrementRowCount")
    .mockImplementation(jest.fn());

const setStorageSpy = jest.spyOn(storageModuleSpy, "setStorage")
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

describe("events → initializeEventListenersForOptions", () => {
    beforeEach(() => {
        settingsModuleSpy.rowCount = 0;
        jest.resetAllMocks();
    });

    it("should call create row with relevant parameters", () => {
        const mockEventListener = jest.fn();
        const mockParentDiv = { addEventListener: mockEventListener};
        getElementByIdSpy.mockReturnValue(mockParentDiv);
        
        initializeEventListenersForOptions();
        
        expect(getElementByIdSpy).toHaveBeenCalledWith("SaveConfiguration");
        expect(getElementByIdSpy).toHaveBeenCalledWith("AddConfigurationRow");
        expect(mockEventListener).toHaveBeenCalledWith("click", expect.any(Function));
        expect(mockEventListener).toHaveBeenCalledWith("click", addConfigurationRow);
    });
});

describe("events → initializeEventListenersForOptions", () => {
    beforeEach(() => {
        settingsModuleSpy.rowCount = 0;
        jest.resetAllMocks();
    });

    it("should call create row with relevant parameters", () => {
        settingsModuleSpy.rowCount = 0;
        
        saveConfiguration();
        
        expect(setStorageSpy).toHaveBeenCalledWith(settingsModuleSpy.chromeSyncStorageKey, {});        
    });

    it("should call create row with relevant parameters", () => {
        settingsModuleSpy.rowCount = 1;
        const mockPreviewLabel = { 
            style: {
                backgroundColor: "red", 
                color: "blue",
            },
            innerText: "test" 
        };
        getElementByIdSpy.mockReturnValueOnce(mockPreviewLabel);
        getElementByIdSpy.mockReturnValueOnce({ value: "backgroundColor"});
        getElementByIdSpy.mockReturnValueOnce({ value: "textColor"});
        
        saveConfiguration();
        
        expect(setStorageSpy).toHaveBeenCalledWith(settingsModuleSpy.chromeSyncStorageKey, { "TEST" : {
            backgroundColour: "backgroundColor",
            textColour: "textColor"
        }});        
    });

    it("should call create row with relevant parameters 2", () => {
        settingsModuleSpy.rowCount = 2;
        const mockPreviewLabel = [{ 
            style: {
                backgroundColor: "red", 
                color: "blue",
            },
            innerText: "test" 
        }, { 
            style: {
                backgroundColor: "white", 
                color: "orange",
            },
            innerText: "two" 
        }];
        getElementByIdSpy.mockReturnValueOnce(mockPreviewLabel[0]);
        getElementByIdSpy.mockReturnValueOnce({ value: mockPreviewLabel[0].style.backgroundColor });
        getElementByIdSpy.mockReturnValueOnce({ value: mockPreviewLabel[0].style.color });
        getElementByIdSpy.mockReturnValueOnce(mockPreviewLabel[1]);
        getElementByIdSpy.mockReturnValueOnce({ value: mockPreviewLabel[1].style.backgroundColor });
        getElementByIdSpy.mockReturnValueOnce({ value: mockPreviewLabel[1].style.color });
        const expectedOutput = {
            "TEST": {
                "backgroundColour": "red",
                "textColour": "blue",
            },
            "TWO": {
                "backgroundColour": "white",
                "textColour": "orange",
            }, 
        };
        
        saveConfiguration();
        
        expect(setStorageSpy).toHaveBeenCalledWith(settingsModuleSpy.chromeSyncStorageKey, expectedOutput);        
    });

    it.each([
        [undefined, { value: "backgroundColor"}, { value: "textColor"}],
        [undefined, undefined, { value: "textColor"}],
        [{}, undefined, { value: "textColor"}],
        [undefined, undefined, undefined]
    ])("s23re3rhould call create row with relevant parameters %o, %o, %o", (previewLabelElement, backgroundColourPickerElement, textColourPickerElement) => {
        settingsModuleSpy.rowCount = 1;
        getElementByIdSpy.mockReturnValueOnce(previewLabelElement);
        getElementByIdSpy.mockReturnValueOnce(backgroundColourPickerElement);
        getElementByIdSpy.mockReturnValueOnce(textColourPickerElement);
        
        saveConfiguration();
        
        expect(setStorageSpy).toHaveBeenCalledWith(settingsModuleSpy.chromeSyncStorageKey, {});        
    });

    it("sssssssshould call create row with relevant parameters", () => {
        settingsModuleSpy.rowCount = 1;
        const mockPreviewLabel = { 
            style: {
                backgroundColor: "red",
            },
            innerText: "test" 
        };
        getElementByIdSpy.mockReturnValueOnce(mockPreviewLabel);
        getElementByIdSpy.mockReturnValueOnce({ value: "backgroundColor"});
        getElementByIdSpy.mockReturnValueOnce({ value: "textColor"});
        
        saveConfiguration();
        
        expect(setStorageSpy).toHaveBeenCalledWith(settingsModuleSpy.chromeSyncStorageKey, {});        
    });
});
