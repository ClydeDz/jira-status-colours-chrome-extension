import * as settingsModule from "../../common/settings";

describe("settings", () => {
  beforeEach(() => {
      jest.resetAllMocks();
  }); 

  test("chrome storage key is set to the right value", () => {      
    expect(settingsModule.CHROME_SYNC_STORAGE_KEY).toBe("Jira-Status-Colours-Configuration");
  });

  test("background script interval is set to the right value", () => {      
    expect(settingsModule.BACKGROUND_SCRIPT_INTERVAL).toBe(1000);
  });

  test("can fetch row count value", () => {      
    expect(settingsModule.ROW_COUNT).toBe(0);
  });

  test("can increment row count", () => {      
    settingsModule.ROW_COUNT = 0;
    settingsModule.incrementRowCount()
    expect(settingsModule.ROW_COUNT).toBe(1);
  });

  test("has six preset configuration keys", () => {      
    const presetConfig = settingsModule.PRESET_CONFIGURATION;
    const keys = Object.keys(presetConfig);
    expect(keys.length).toBe(6);
  });

  test("placeholder configuration is defined", () => {      
    expect(settingsModule.PLACEHOLDER_CONFIGURATION.jiraStatusLabel).toBeDefined();
    expect(settingsModule.PLACEHOLDER_CONFIGURATION.textColour).toBeDefined();
    expect(settingsModule.PLACEHOLDER_CONFIGURATION.backgroundColour).toBeDefined();
  });
});
