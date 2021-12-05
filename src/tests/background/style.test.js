import * as styleModule from "../../background/style";
import * as settingsModule from "../../common/settings";
import * as documentModule from "../../common/document";

const getJiraStatusLabelsSpy = jest.spyOn(documentModule, "getJiraStatusLabels")
    .mockImplementation(jest.fn());
const updateJiraStatusStyleSpy = jest.spyOn(documentModule, "updateJiraStatusStyle")
    .mockImplementation(jest.fn());
    
describe("style → applyStyle", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it.each([
        [null], 
        [settingsModule.presetConfiguration]
    ])("should not apply style if no jira status labels found", (savedConfiguration) => {
        getJiraStatusLabelsSpy.mockReturnValue([]);

        styleModule.applyStyle(savedConfiguration);

        expect(updateJiraStatusStyleSpy).not.toHaveBeenCalled();
    });

    it.each([
        [null], 
        [settingsModule.presetConfiguration]
    ])("should apply style for one jira status label after matching %s", (savedConfiguration) => {
        const mockJiraStatusLabels = [
            {
                innerText: "In Progress",
            },
            {
                innerText: "Other",
            }
        ];
        const inProgress = settingsModule.presetConfiguration["IN PROGRESS"];
        getJiraStatusLabelsSpy.mockReturnValue(mockJiraStatusLabels);

        styleModule.applyStyle(savedConfiguration);

        expect(updateJiraStatusStyleSpy).toHaveBeenCalledWith(mockJiraStatusLabels[0], inProgress);
    });

    it.each([
        [null], 
        [settingsModule.presetConfiguration]
    ])("should apply style to two jira status labels after matching", (savedConfiguration) => {
        const mockJiraStatusLabels = [
            {
                innerText: "In Progress",
            },
            {
                innerText: "Backlog",
            }
        ];
        const inProgress = settingsModule.presetConfiguration["IN PROGRESS"];
        const backlog = settingsModule.presetConfiguration["BACKLOG"];
        getJiraStatusLabelsSpy.mockReturnValue(mockJiraStatusLabels);

        styleModule.applyStyle(savedConfiguration);

        expect(updateJiraStatusStyleSpy).toHaveBeenCalledWith(mockJiraStatusLabels[0], inProgress);
        expect(updateJiraStatusStyleSpy).toHaveBeenCalledWith(mockJiraStatusLabels[1], backlog);
    });

    it.each([
        [null], 
        [settingsModule.presetConfiguration]
    ])("should not apply style to jira status labels after no match found", (savedConfiguration) => {
        const mockJiraStatusLabels = [
            {
                innerText: "Test",
            },
            {
                innerText: "Other",
            }
        ];
        getJiraStatusLabelsSpy.mockReturnValue(mockJiraStatusLabels);

        styleModule.applyStyle(savedConfiguration);

        expect(updateJiraStatusStyleSpy).not.toHaveBeenCalled();
    });

    it("should not update style when no config was supplied or preset config not found", () => {
        getJiraStatusLabelsSpy.mockReturnValue([]);

        styleModule.applyStyle([]); 

        expect(updateJiraStatusStyleSpy).not.toHaveBeenCalled();
    });
});