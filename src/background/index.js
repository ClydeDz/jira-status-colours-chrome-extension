import { getStorage } from "../common/storage";
import { CHROME_SYNC_STORAGE_KEY, BACKGROUND_SCRIPT_INTERVAL } from "../common/settings";
import { initializeDocument } from "../common/document";
import { applyStyle} from "./style";

window.onload = function() {
    initializeDocument(document);
    setInterval(function() {
        getStorage(CHROME_SYNC_STORAGE_KEY, applyStyle);
    }, BACKGROUND_SCRIPT_INTERVAL);    
}
