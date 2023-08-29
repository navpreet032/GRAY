"use strict";
const electron = require("electron");
const preload = require("@electron-toolkit/preload");
const promises = require("fs/promises");
const api = {
  readConfig: () => promises.readFile("/path/to/config.json", { encoding: "utf-8" })
};
electron.contextBridge.exposeInMainWorld("electron", api);
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("electron", preload.electronAPI);
    electron.contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = preload.electronAPI;
  window.api = api;
}
