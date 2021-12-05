import * as settingsModule from "../../common/settings";

describe("settings", () => {
  beforeEach(() => {
      jest.resetAllMocks();
  }); 

  test("chrome storage key is set to the right value", () => {      
    expect(settingsModule.chromeSyncStorageKey).toBe("Jira-Status-Colours-Configuration");
  });

  test("can fetch row count value", () => {      
    expect(settingsModule.rowCount).toBe(0);
  });

  test("can increment row count", () => {      
    settingsModule.rowCount = 0;
    settingsModule.incrementRowCount()
    expect(settingsModule.rowCount).toBe(1);
  });

  test("has preset configuration", () => {      
    expect(settingsModule.presetConfiguration["IN PROGRESS"]).toBeDefined();
    expect(settingsModule.presetConfiguration["DONE"]).toBeDefined();
    expect(settingsModule.presetConfiguration["BACKLOG"]).toBeDefined();
  });
});
