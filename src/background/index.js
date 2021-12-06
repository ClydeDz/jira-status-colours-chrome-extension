import { getStorage } from "../common/storage";
import { CHROME_SYNC_STORAGE_KEY } from "../common/settings";
import { initializeDocument } from "../common/document";
import { applyStyle} from "./style";

window.onload = function() {
    initializeDocument(document);
    getStorage(CHROME_SYNC_STORAGE_KEY, applyStyle);
}
