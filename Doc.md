## File Structure

📂 main ⇢ index.ts ( application's entry point. it has the ability to require modules and use all of Node.js APIs.)
    ↳ conatins `IPC channels`

📂 preload ⇢ index.ts (scripts which are injected before a web page loads in the renderer);
    ↳ conatins `API's` which are exposed to mainWorld

📂 renderer ⇢ It is responsible for rendering web content.

## Flow Chart
`https://lucid.app/lucidchart/887988c7-9fc3-4398-919c-b6fe7a79d123/edit?viewport_loc=-55%2C7%2C2535%2C1212%2C0_0&invitationId=inv_5ea27eab-ea45-46a3-a995-d769af122ab8` 

## FileBuffer
→FileBuffer.jsx

### MAP
|key  : value|
Filename : fileBufferObject


### Methods
*addToBuffer*  → Creates a new FileBuffer object with the provided information and adds it to the Map `FileBufferTable`.

*writeDataToBuffer* → After the (FileBuffer) Object has been created and when user writes on edtior the data is saved using `writeDataToBuffer`.

FileBuffer.jsx → → *USES → IN* → opendFiles.jsx
whenever a new fle is opened, via filetree.jsx .the same file also shown in the opened files status bar`openedFiles.jsx` .from there the path of opened file is get via `selectedFile` and fileBuffer object is created.

FileBuffer.jsx → → *USES → IN* → MonacoEditor.jsx

whenever the users type in the editor the value is stored to the fileBuffer via`writeDataToBuffer`. when the user
saves the file to the disk , the data from the filebuffer is cleared via `clearDataFromBuffer`.




