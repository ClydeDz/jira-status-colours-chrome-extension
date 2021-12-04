import * as settingsModule from "../../common/settings";

describe("settings", () => {
  beforeEach(() => {
      jest.resetAllMocks();
  }); 

  test("chrome storage key is set to the right value", () => {      
    expect(settingsModule.chromeSyncStorageKey).toBe("Jira-Status-Colours-Configuration");
  });

  test("can increment row count", () => {      
    expect(settingsModule.rowCount).toBe(0);
    settingsModule.rowCount++;
    expect(settingsModule.rowCount).toBe(1);
  });

  test("has preset configuration", () => {      
    expect(settingsModule.presetConfiguration["IN PROGRESS"]).toBeDefined();
    expect(settingsModule.presetConfiguration["DONE"]).toBeDefined();
    expect(settingsModule.presetConfiguration["BACKLOG"]).toBeDefined();
  });
});
