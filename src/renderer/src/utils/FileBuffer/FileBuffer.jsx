//TODO : when clicked on topbar files the selected file should also updated on fileExplorer
/**
 * @description Adds a file to the buffer for temporary storage.
 */



function FileBuffer (filename, filepath, filedata, isOpened, isSaved)  {
    this.filename = filename;
    this.filepath = filepath;
    this.filedata = filedata;
    this.isOpened = isOpened;
    this.isSaved = isSaved;
}

const FileBufferTable = new Map();


export function addToBuffer(filename, filepath, filedata, isOpened, isSaved) {
    /**
       * @description Creates a new FileBuffer object with the provided information and adds it to the buffer.
       * @description The FileBuffer object contains metadata about the file, such as its name, path, content, and open/save status.
       * @typedef {Object} FileBuffer
       * @property {string} filename - The name of the file.
       * @property {string} filepath - The path to the file.
       * @property {string} filedata - The content of the file.
       * @property {boolean} isOpened - Indicates if the file is currently open.
       * @property {boolean} isSaved - Indicates if the file has been saved.
       */

    const BufferData = new FileBuffer(filename, filepath, filedata, isOpened, isSaved);
    FileBufferTable.set(filename, BufferData);
}

export function getDataFromBuffer(filename) {
    /**
 * @description Retrieves the data associated with a file in the buffer.
 *
 * @param {string} filename - The name of the file.
 * @returns {FileBuffer | undefined} The metadata of the file in the buffer, or undefined if not found.
 */

    return FileBufferTable.get(filename);
}

export function bufferHasFile(filename) {
    /**
     * @description Checks if a file with a specific name exists in the buffer.
     * @param {string} filename - The name of the file to check.
     * @returns {boolean} True if the file exists in the buffer, false otherwise.
     */
    return FileBufferTable.has(filename);
}

export function writeDataToBuffer(fileName, data){
    if( FileBufferTable.has(fileName)){
       const newData = FileBufferTable.get(fileName)
       
       const filename = newData.filename;
       const filepath = newData.filepath;
      
       const isOpened = newData.isOpened;
       const isSaved = newData.isSaved;

       addToBuffer(filename, filepath,data, isOpened, isSaved)

    }
}

export function clearDataFromBuffer(fileName){
    /**
     * @description Clear the @property {filedata} of object based on given filename.
     * @param {string} fileName - The name of the file to clear data of.
     
     */
    if( FileBufferTable.has(fileName)){
        const newData = FileBufferTable.get(fileName)
        
        const filename = newData.filename;
        const filepath = newData.filepath;
       
        const isOpened = newData.isOpened;
        const isSaved = newData.isSaved;
 
        addToBuffer(filename, filepath,"", isOpened, isSaved)
 
     }
}