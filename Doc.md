## File Structure

📂 main ⇢ index.ts ( application's entry point. it has the ability to require modules and use all of Node.js APIs.)
    ↳ conatins `IPC channels`

📂 preload ⇢ index.ts (scripts which are injected before a web page loads in the renderer);
    ↳ conatins `API's` which are exposed to mainWorld

📂 renderer ⇢ It is responsible for rendering web content.

## Flow Chart
`https://lucid.app/lucidchart/887988c7-9fc3-4398-919c-b6fe7a79d123/edit?viewport_loc=-55%2C7%2C2535%2C1212%2C0_0&invitationId=inv_5ea27eab-ea45-46a3-a995-d769af122ab8` 