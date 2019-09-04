describe('Editor App', () => {
  it('should display add todo on submit button', async () => {
    await page.goto('https://localhost:3100/editorApp');
    await page.waitForSelector('button[type="submit"]');

    expect(
      await page.$eval('button[type="submit"]', e => e.textContent),
    ).toEqual('Add Todo');
  });
});
