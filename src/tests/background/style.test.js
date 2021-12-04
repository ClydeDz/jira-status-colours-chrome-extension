import { applyStyle } from "../../background/style";
import { presetConfiguration } from "../../common/settings";
import * as document from "../../common/document";

const getJiraStatusLabelsSpy = jest.spyOn(document, "getJiraStatusLabels")
    .mockImplementation(jest.fn());
const updateJiraStatusStyleSpy = jest.spyOn(document, "updateJiraStatusStyle")
    .mockImplementation(jest.fn());
    
describe("style → applyStyle", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it.each([
        [null], 
        [presetConfiguration]
    ])("should not apply style if no labels found", (savedConfiguration) => {
        getJiraStatusLabelsSpy.mockReturnValue([]);

        applyStyle(savedConfiguration);

        expect(updateJiraStatusStyleSpy).not.toHaveBeenCalled();
    });

    it.each([
        [null], 
        [presetConfiguration]
    ])("should apply style for one label after matching %s", (savedConfiguration) => {
        const mockJiraStatusLabels = [
            {
                innerText: "In Progress",
            },
            {
                innerText: "Other",
            }
        ];
        const inProgress = presetConfiguration["IN PROGRESS"];
        getJiraStatusLabelsSpy.mockReturnValue(mockJiraStatusLabels);

        applyStyle(savedConfiguration);

        expect(updateJiraStatusStyleSpy).toHaveBeenCalledWith(mockJiraStatusLabels[0], inProgress);
    });

    it.each([
        [null], 
        [presetConfiguration]
    ])("should apply style to two labels after matching", (savedConfiguration) => {
        const mockJiraStatusLabels = [
            {
                innerText: "In Progress",
            },
            {
                innerText: "Backlog",
            }
        ];
        const inProgress = presetConfiguration["IN PROGRESS"];
        const backlog = presetConfiguration["BACKLOG"];
        getJiraStatusLabelsSpy.mockReturnValue(mockJiraStatusLabels);

        applyStyle(savedConfiguration);

        expect(updateJiraStatusStyleSpy).toHaveBeenCalledWith(mockJiraStatusLabels[0], inProgress);
        expect(updateJiraStatusStyleSpy).toHaveBeenCalledWith(mockJiraStatusLabels[1], backlog);
    });

    it.each([
        [null], 
        [presetConfiguration]
    ])("should not apply style to labels after no match found", (savedConfiguration) => {
        const mockJiraStatusLabels = [
            {
                innerText: "Test",
            },
            {
                innerText: "Other",
            }
        ];
        getJiraStatusLabelsSpy.mockReturnValue(mockJiraStatusLabels);

        applyStyle(savedConfiguration);

        expect(updateJiraStatusStyleSpy).not.toHaveBeenCalled();
    });

    it("should not update style when no config was supplied or preset config not found", () => {
        getJiraStatusLabelsSpy.mockReturnValue([]);

        applyStyle([]); 

        expect(updateJiraStatusStyleSpy).not.toHaveBeenCalled();
    });
});