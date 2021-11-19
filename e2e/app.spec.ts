import { BrowserContext, ElectronApplication, Page, _electron as electron } from 'playwright';
import { test, expect } from '@playwright/test';
import { delay } from 'rxjs';
const PATH = require('path');

test.describe('Check Home Page', async () => {
  let app: ElectronApplication;
  let firstWindow: Page;
  let context: BrowserContext;

  test.beforeAll( async () => {
    app = await electron.launch({ args: [PATH.join(__dirname, '../app/main.js'), PATH.join(__dirname, '../app/package.json')] });
    context = app.context();
    await context.tracing.start({ screenshots: true, snapshots: true });
    firstWindow = await app.firstWindow();
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

  test('Check Home Page design', async ({ browserName}) => {
    await firstWindow.waitForTimeout(4000);
    // Uncomment if you change the design of Home Page in order to create a new screenshot
    const screenshot = await firstWindow.screenshot({ path: '/tmp/home.png' });
    expect(screenshot).toMatchSnapshot(`hello-${browserName}.png`);
  });

  test('Redirects from welcome to desktop after 23 seconds', async () => {

    expect(firstWindow.url()).toMatch(/\/welcome$/);
    await firstWindow.waitForTimeout(23000);
    
    expect(firstWindow.url()).toMatch(/\/desktop$/);
  });

  test.afterAll( async () => {
    await context.tracing.stop({ path: 'e2e/tracing/trace.zip' });
    await app.close();
  });
});
