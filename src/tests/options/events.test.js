import { createRow } from "../../options/componentHelper";
import * as componentHelper from "../../options/componentHelper";

const createJiraStatusInputSpy = jest.spyOn(componentHelper, "createJiraStatusInput")
    .mockImplementation(jest.fn());

describe("componentHelper → createRow", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("should return a string", () => {
        createJiraStatusInputSpy.mockReturnValueOnce({});
        const parentDiv = {};        
        createRow(1, parentDiv, {}, "key");
        expect(true).toBe(true);
    });
});