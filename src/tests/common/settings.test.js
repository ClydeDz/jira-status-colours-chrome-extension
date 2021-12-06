import * as settingsModule from "../../common/settings";

describe("settings", () => {
  beforeEach(() => {
      jest.resetAllMocks();
  }); 

  test("chrome storage key is set to the right value", () => {      
    expect(settingsModule.CHROME_SYNC_STORAGE_KEY).toBe("Jira-Status-Colours-Configuration");
  });

  test("can fetch row count value", () => {      
    expect(settingsModule.ROW_COUNT).toBe(0);
  });

  test("can increment row count", () => {      
    settingsModule.ROW_COUNT = 0;
    settingsModule.incrementRowCount()
    expect(settingsModule.ROW_COUNT).toBe(1);
  });

  test("has preset configuration", () => {      
    expect(settingsModule.PRESET_CONFIGURATION["IN PROGRESS"]).toBeDefined();
    expect(settingsModule.PRESET_CONFIGURATION["DONE"]).toBeDefined();
    expect(settingsModule.PRESET_CONFIGURATION["BACKLOG"]).toBeDefined();
  });

  test("placeholder configuration is defined", () => {      
    expect(settingsModule.PLACEHOLDER_CONFIGURATION.jiraStatusLabel).toBeDefined();
    expect(settingsModule.PLACEHOLDER_CONFIGURATION.textColour).toBeDefined();
    expect(settingsModule.PLACEHOLDER_CONFIGURATION.backgroundColour).toBeDefined();
  });
});
