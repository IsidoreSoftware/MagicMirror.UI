import { BrowserContext, ElectronApplication, Page, _electron as electron, _electron } from 'playwright';
import { test, expect } from '@playwright/test';
const PATH = require('path');
const viewPortSize =  { width: 1280, height: 720 };

test.use({ viewport: viewPortSize});

test.describe('Check Home Page', async () => {
  let app: ElectronApplication;
  let firstWindow: Page;
  let context: BrowserContext;

  test.beforeAll( async () => {
    app = await electron.launch({ args: [PATH.join(__dirname, '../app/main.js'), PATH.join(__dirname, '../app/package.json')] });
    context = app.context();
    firstWindow = await app.firstWindow();
    firstWindow.setViewportSize(viewPortSize)
    await firstWindow.waitForLoadState('domcontentloaded');
  });

  test('Launch electron app', async () => {

    const windowState: { isVisible: boolean; isDevToolsOpened: boolean; isCrashed: boolean } = await app.evaluate(async (process) => {
      const mainWindow = process.BrowserWindow.getAllWindows()[0];

      const getState = () => ({
        isVisible: mainWindow.isVisible(),
        isDevToolsOpened: mainWindow.webContents.isDevToolsOpened(),
        isCrashed: mainWindow.webContents.isCrashed(),
      });

      return new Promise((resolve) => {
        if (mainWindow.isVisible()) {
          resolve(getState());
        } else {
          mainWindow.once('ready-to-show', () => setTimeout(() => resolve(getState()), 0));
        }
      });
    });

    expect(windowState.isVisible).toBeTruthy();
    expect(windowState.isDevToolsOpened).toBeFalsy();
    expect(windowState.isCrashed).toBeFalsy();
  });

  test('Hello view looks good', async ({ browserName}) => {
    await firstWindow.waitForTimeout(4000);
    // Uncomment if you change the design of Home Page in order to create a new screenshot
    const screenshot = await firstWindow.screenshot({ path: '/tmp/home.png' });
    expect(screenshot).toMatchSnapshot(`hello.png`);
  });

  test('Redirects from welcome to desktop after 24 seconds', async () => {

    expect(firstWindow.url()).toMatch(/\/welcome$/);
    await firstWindow.waitForTimeout(24000);
    
    expect(firstWindow.url()).toMatch(/\/desktop$/);
  });

  test.afterAll( async () => {
    await app.close();
  });
});
