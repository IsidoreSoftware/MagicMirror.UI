'use strict';

import {ElectronMainProcess} from './electron-main-process';
const path = require('path');

if(process.env.NODE_ENV === 'development'){
    const electron_path = path.join( __dirname, '..', 'node_modules', '.bin', 'electron');

    require('electron-reload')(__dirname, {
    electron: electron_path,
    hardResetMethod: 'exit'
    });
}

const electron = new ElectronMainProcess();
electron.Run();