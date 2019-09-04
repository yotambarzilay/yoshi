const { viewerUrl } = require('../../dev/sites');

describe('Viewer App', () => {
  it('should display the title text', async () => {
    await page.goto(viewerUrl);
    await page.waitForSelector('button[type="submit"]');

    expect(
      await page.$eval('button[type="submit"]', e => e.textContent),
    ).toEqual('Add Todo');
  });
});
