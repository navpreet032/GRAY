/**
 * Generates a tree-like representation of files and folders starting from a given folder path.
 *
 * @param {string} folderPath - The path to the root folder.
 * @returns {object} A tree-like object representing the folder structure.
 */
const fs = window.require('fs');
const path = window.require('path');
/**
 * statSync = get the info of file or directory
 * if given path is a directory then 
 *  statSync = It is used to retrieve the list of files and directories within a given directory
 *  then push the contents to the children property
 */
const generateFileTree = (folderPath) => {
  const stats = fs.statSync(folderPath);
  const node = {
    label: path.basename(folderPath),
    id: folderPath,
    isDirectory: stats.isDirectory(),
    children: [],
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

/**
 * Retrieves a file tree representation starting from a root folder path.
 *
 * @param {string} rootPath - The path to the root folder.
 * @returns {object} A tree-like object representing the folder structure.
 */
export const getFileTree = (rootPath) => {
  return generateFileTree(rootPath);
};

/**
 * Watches for file changes within a folder and its subfolders, and invokes the provided
 * callback whenever a change occurs.
 *
 * @param {string} rootPath - The path to the root folder to watch.
 * @param {function} onChange - A callback function to be called on file changes.
 */
export const watchFileChanges = (rootPath, onChange) => {
  fs.watch(rootPath, { recursive: true }, (event, filename) => {
    onChange(getFileTree(rootPath));
    //handleChange is passed then the codewill look like => handleChange(getFileTree(rootPath)) instead of  onChange(getFileTree(rootPath));
  });
};
