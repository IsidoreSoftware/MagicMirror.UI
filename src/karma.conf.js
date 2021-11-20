// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      'karma-jasmine',
      'karma-coverage',
      'karma-chrome-launcher',
      'karma-electron',
      'karma-jasmine-html-reporter',
      '@angular-devkit/build-angular/plugins/karma'
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: {
      dir: '../coverage',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcovonly', subdir: 'report-lcov' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['AngularElectron','ChromeHeadless'],
    customLaunchers: {
      AngularElectron: {
        base: 'Electron',
        flags: [
          '--remote-debugging-port=9222'
        ],
        browserWindowOptions: {
          webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInSubFrames: true,
            allowRunningInsecureContent: true,
            enableRemoteModule: true,
            contextIsolation: false
          },
        }
      }
    }
  });
};
