import { app, BrowserWindow } from 'electron';
const path = require('path');
const url = require('url');

export class CameraProcess {
    /**
     *
     */
    constructor() { }

    public Run() {
        app.on('ready', this.OpenWindow);
    }

    private OpenWindow() {
        // Create the browser window.
        let win = new BrowserWindow({ width: 300, height: 300});

        // and load the index.html of the app.
        const siteLocation = path.join('localhost:4200/camera');
        win.loadURL(url.format({
            pathname: siteLocation,
            protocol: 'http:',
            slashes: true
        }));

        // Open the DevTools.
        win.webContents.openDevTools();

        // Emitted when the window is closed.
        win.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            win = null;
        });
    }

}
