import { app, BrowserWindow } from 'electron';
const path = require('path');
const url = require('url');

export class ElectronMainProcess {
    /**
     *
     */
    constructor() { }

    public Run() {
        // This method will be called when Electron has finished
        // initialization and is ready to create browser windows.
        // Some APIs can only be used after this event occurs.
        app.on('ready', this.OpenMainWindow);

        // Quit when all windows are closed.
        app.on('window-all-closed', () => {
            // On macOS it is common for applications and their menu bar
            // to stay active until the user quits explicitly with Cmd + Q
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });
    }

    public OpenMainWindow() {
        // Create the browser window.
        let win = new BrowserWindow({ width: 900, height: 900, frame: false, titleBarStyle: 'hidden' });

        // and load the index.html of the app.
        const siteLocation = path.join('localhost:4200');
        win.loadURL(url.format({
            pathname: siteLocation,
            protocol: 'http:',
            slashes: true
        }));

        // Open the DevTools.
        if (process.env.NODE_ENV === 'development') {
            win.webContents.openDevTools();
        }

        // Emitted when the window is closed.
        win.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            win = null;
        });
    }

}
