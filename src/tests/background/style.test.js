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

    it("should return a string", () => {
        getJiraStatusLabelsSpy.mockReturnValue([]);
        applyStyle(null);
        expect(updateJiraStatusStyleSpy).not.toHaveBeenCalled();
    });

    it("should return a string", () => {
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
        applyStyle(null);
        expect(updateJiraStatusStyleSpy).toHaveBeenCalledWith(mockJiraStatusLabels[0], inProgress);
    });
});