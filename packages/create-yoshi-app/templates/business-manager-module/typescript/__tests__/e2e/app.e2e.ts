import { appDriver, AppDriver } from './drivers/app.driver';

describe('React application', () => {
  let driver: AppDriver;

  beforeEach(() => {
    driver = appDriver();
  });

  it('should display title', async () => {
    await driver.navigateToApp();
    await driver.waitForSelector('h1');

    expect(await driver.getAppTitleText()).toEqual('Todo!');
  });
});
