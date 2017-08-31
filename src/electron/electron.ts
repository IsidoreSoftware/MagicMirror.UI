'use strict';

import { ElectronMainProcess } from './electron-main-process';
import { CameraProcess } from './camera/camera-process';
const path = require('path');

if (process.env.NODE_ENV === 'development') {
    const electron_path = path.join(__dirname, '..', 'node_modules', '.bin', 'electron');

    require('electron-reload')(__dirname, {
        electron: electron_path,
        hardResetMethod: 'exit'
    });
}

const electron = new ElectronMainProcess();
const cameraProcess = new CameraProcess();
try {
    electron.Run();
    cameraProcess.Run();
} catch (ex) {
    console.log(ex);
}
