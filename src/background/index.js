import { getStorage } from "../common/storage";
import { chromeSyncStorageKey } from "../common/settings";
import { initializeDocument } from "../common/document";
import { applyStyle} from "./style";

window.onload = function() {
    initializeDocument(document);
    getStorage(chromeSyncStorageKey, applyStyle);
}
