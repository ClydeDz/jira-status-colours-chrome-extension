import { initializeDocument } from "../common/document";
import { chromeSyncStorageKey } from "../common/settings";
import { getStorage } from "../common/storage";
import { initializeEventListenersForOptions, startup } from "./events";

window.onload = function() {
    initializeDocument(document);
    initializeEventListenersForOptions();
    getStorage(chromeSyncStorageKey, startup);
};
