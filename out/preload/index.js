"use strict";
const electron = require("electron");
const preload = require("@electron-toolkit/preload");
const promises = require("fs/promises");
const fs$1 = require("fs");
const fs = window.require("fs");
const path = window.require("path");
const generateFileTree = (folderPath) => {
  const stats = fs.statSync(folderPath);
  const node = {
    label: path.basename(folderPath),
    id: folderPath,
    isDirectory: stats.isDirectory(),
    children: []
  };
  if (stats.isDirectory()) {
    const files = fs.readdirSync(folderPath);
    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      node.children.push(generateFileTree(filePath));
    });
  }
  return node;
};
const getFileTree = (rootPath) => {
  return generateFileTree(rootPath);
};
const watchFileChanges = (rootPath, onChange) => {
  fs.watch(rootPath, { recursive: true }, (event, filename) => {
    onChange(getFileTree(rootPath));
  });
};
const api = {
  readConfig: () => promises.readFile("/path/to/config.json", { encoding: "utf-8" })
};
electron.contextBridge.exposeInMainWorld("electron", api);
electron.contextBridge.exposeInMainWorld("electronAPI", {
  GET_selected_folder_path: async () => {
    const selectedFolderPath = await electron.ipcRenderer.invoke("open-folder-dialog");
    return selectedFolderPath;
  },
  GET_file_tree: (path2) => {
    const a = getFileTree(path2);
    return a;
  },
  WATCH_fileChanges: (path2, onChange) => {
    return watchFileChanges(path2, onChange);
  },
  READ_selected_file: async (path2) => {
    try {
      const data = await promises.readFile(path2, { encoding: "utf8" });
      return data.toString();
    } catch (error) {
      console.log("CANT READ FILE ", error);
      return null;
    }
  },
  SAVE_file: async (data, path2) => {
    try {
      await promises.writeFile(path2, data);
    } catch (error) {
      console.log("CAN'T SAVE FILE ", error);
    }
  },
  CREATE_newFile: async (path2) => {
    try {
      await promises.writeFile(path2, "");
    } catch (error) {
      console.log("CAN'T CREATE FILE : ", error);
    }
  },
  CREATE_newFolder: (path2) => {
    try {
      if (!fs$1.existsSync(path2)) {
        promises.mkdir(path2);
      }
    } catch (error) {
      console.log("CAN'T CREATE FOLDER : ", error);
    }
  }
});
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
