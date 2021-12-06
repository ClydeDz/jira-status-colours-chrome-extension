import * as eventsModule from "../../options/events";
import * as documentModule from "../../common/document";
import * as settingsModule from "../../common/settings";
import * as componentCreatorModule from "../../options/componentCreator";
import * as storageModule from "../../common/storage";

const getElementByIdSpy = jest.spyOn(documentModule, "getElementById")
    .mockImplementation(jest.fn());

const createRowSpy = jest.spyOn(componentCreatorModule, "createRow")
    .mockImplementation(jest.fn());

const incrementRowCountSpy = jest.spyOn(settingsModule, "incrementRowCount")
    .mockImplementation(jest.fn());

const setStorageSpy = jest.spyOn(storageModule, "setStorage")
    .mockImplementation(jest.fn());

describe("events → addConfigurationRow", () => {
    beforeEach(() => {
        settingsModule.ROW_COUNT = 0;
        jest.resetAllMocks();
    });

    it("should call create row with relevant parameters", () => {
        incrementRowCountSpy.mockImplementation(() => {
            settingsModule.ROW_COUNT++;
        });
        const mockParentDiv = { element: "parent"};
        getElementByIdSpy.mockReturnValueOnce(mockParentDiv);
        
        eventsModule.addConfigurationRow();
        
        expect(incrementRowCountSpy).toHaveBeenCalledTimes(1);
        expect(getElementByIdSpy).toHaveBeenCalledWith("Configuration");
        expect(createRowSpy).toHaveBeenCalledWith(1, mockParentDiv, undefined);
    });
});

describe("events → startup", () => {
    const mockConfiguration = {
        ...settingsModule.presetConfiguration,
        "OTHER": {
            backgroundColour: "other",
            textColour: "other"
        }
    }
    beforeEach(() => {
        settingsModule.ROW_COUNT = 0;
        jest.resetAllMocks();
    });

    it.each([
        [null, 3], 
        [mockConfiguration, 4]
    ])("should execute loop when relevant configuration found", (savedConfiguration, rowCounter) => {
        const mockParentDiv = { element: "parent"};
        getElementByIdSpy.mockReturnValueOnce(mockParentDiv);
        
        eventsModule.startup(savedConfiguration);
        
        expect(getElementByIdSpy).toHaveBeenCalledWith("Configuration");
        expect(incrementRowCountSpy).toHaveBeenCalledTimes(rowCounter);
        expect(createRowSpy).toHaveBeenCalledTimes(rowCounter);
    });

    it("should not execute loop when no configuration or parent element found", () => {
        getElementByIdSpy.mockReturnValueOnce([]);
        
        eventsModule.startup([]);
        
        expect(getElementByIdSpy).toHaveBeenCalledWith("Configuration");
        expect(incrementRowCountSpy).toHaveBeenCalledTimes(0);
        expect(createRowSpy).toHaveBeenCalledTimes(0);
    });

    it("should call create row with relevant parameters", () => {
        incrementRowCountSpy.mockImplementation(() => {
            settingsModule.ROW_COUNT++;
        });
        const mockParentDiv = { element: "parent"};
        getElementByIdSpy.mockReturnValueOnce(mockParentDiv);
        const mockConfiguration = {
            "OTHER": {
                backgroundColour: "other",
                textColour: "other"
            }
        }

        eventsModule.startup(mockConfiguration);
        
        expect(getElementByIdSpy).toHaveBeenCalledWith("Configuration");
        expect(incrementRowCountSpy).toHaveBeenCalledTimes(1);
        expect(createRowSpy).toHaveBeenCalledTimes(1);
        expect(createRowSpy).toHaveBeenCalledWith(1, mockParentDiv, mockConfiguration["OTHER"], "OTHER");
    });
});

describe("events → initializeEventListenersForOptions", () => {
    beforeEach(() => {
        settingsModule.ROW_COUNT = 0;
        jest.resetAllMocks();
    });

    it("initializes the correct listeners with the correct methods", () => {
        const mockEventListener = jest.fn();
        const mockParentDiv = { addEventListener: mockEventListener};
        getElementByIdSpy.mockReturnValue(mockParentDiv);
        
        eventsModule.initializeEventListenersForOptions();
        
        expect(getElementByIdSpy).toHaveBeenCalledWith("SaveConfiguration");
        expect(getElementByIdSpy).toHaveBeenCalledWith("AddConfigurationRow");
        expect(mockEventListener).toHaveBeenCalledWith("click", eventsModule.saveConfiguration);
        expect(mockEventListener).toHaveBeenCalledWith("click", eventsModule.addConfigurationRow);
    });
});

describe("events → saveConfiguration", () => {
    beforeEach(() => {
        settingsModule.ROW_COUNT = 0;
        jest.resetAllMocks();
    });

    it("saves empty configuration when no rows found", () => {
        settingsModule.ROW_COUNT = 0;
        
        eventsModule.saveConfiguration();
        
        expect(setStorageSpy).toHaveBeenCalledWith(settingsModule.CHROME_SYNC_STORAGE_KEY, {});        
    });

    it("saves configuration when row found", () => {
        settingsModule.ROW_COUNT = 1;
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
        
        eventsModule.saveConfiguration();
        
        expect(setStorageSpy).toHaveBeenCalledWith(settingsModule.CHROME_SYNC_STORAGE_KEY, { "TEST" : {
            backgroundColour: "backgroundColor",
            textColour: "textColor"
        }});        
    });

    it("saves configuration when multiple rows found", () => {
        settingsModule.ROW_COUNT = 2;
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
        
        eventsModule.saveConfiguration();
        
        expect(setStorageSpy).toHaveBeenCalledWith(settingsModule.CHROME_SYNC_STORAGE_KEY, expectedOutput);        
    });

    it.each([
        [undefined, { value: "backgroundColor"}, { value: "textColor"}],
        [undefined, undefined, { value: "textColor"}],
        [{}, undefined, { value: "textColor"}],
        [undefined, undefined, undefined]
    ])("saves empty configuration when one or more elements are undefined %o, %o, %o", (previewLabelElement, backgroundColourPickerElement, textColourPickerElement) => {
        settingsModule.ROW_COUNT = 1;
        getElementByIdSpy.mockReturnValueOnce(previewLabelElement);
        getElementByIdSpy.mockReturnValueOnce(backgroundColourPickerElement);
        getElementByIdSpy.mockReturnValueOnce(textColourPickerElement);
        
        eventsModule.saveConfiguration();
        
        expect(setStorageSpy).toHaveBeenCalledWith(settingsModule.CHROME_SYNC_STORAGE_KEY, {});        
    });

    it("saves empty configuration when preview panel doesn't have required properties", () => {
        settingsModule.ROW_COUNT = 1;
        const mockPreviewLabel = { 
            style: {
                backgroundColor: "red",
            },
            innerText: "test" 
        };
        getElementByIdSpy.mockReturnValueOnce(mockPreviewLabel);
        getElementByIdSpy.mockReturnValueOnce({ value: "backgroundColor"});
        getElementByIdSpy.mockReturnValueOnce({ value: "textColor"});
        
        eventsModule.saveConfiguration();
        
        expect(setStorageSpy).toHaveBeenCalledWith(settingsModule.CHROME_SYNC_STORAGE_KEY, {});        
    });
});
