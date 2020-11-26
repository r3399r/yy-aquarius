import { AppPage } from 'e2e/src/app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', (): void => {
  let page: AppPage;

  beforeEach((): void => {
    page = new AppPage();
  });

  it('should display welcome message', async (): Promise<void> => {
    await page.navigateTo();
    expect(await page.getTitleText()).toEqual('app is running!');
  });

  afterEach(
    async (): Promise<void> => {
      // Assert that there are no errors emitted from the browser
      const logs = await browser.manage().logs().get(logging.Type.BROWSER);
      expect(logs).not.toContain(
        jasmine.objectContaining({
          level: logging.Level.SEVERE,
        } as logging.Entry)
      );
    }
  );
});
