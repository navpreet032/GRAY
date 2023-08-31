const fs = window.require('fs');
const path = window.require('path');

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

export const getFileTree = (rootPath) => {
  return generateFileTree(rootPath);
};

export const watchFileChanges = (rootPath, onChange) => {
  fs.watch(rootPath, { recursive: true }, (event, filename) => {
    onChange(getFileTree(rootPath));
  });
};

