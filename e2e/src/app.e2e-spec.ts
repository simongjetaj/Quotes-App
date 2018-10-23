import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  /*
  it('should display welcome message', () => {
    page.navigateTo();
    //browser.pause();
    expect(page.getParagraphText()).toEqual('Welcome to quotes-app!');
  });
  */

  /*
    it('should display add quote button', () => {
      page.navigateTo();
      //browser.pause();
      expect(page.getAddQuoteButton().getText()).toEqual('Add New Quote');
    });
  */

  /*
    it('should route to api quote page and the nav link should have the text equal to "API Quotes"', () => {
      page.navigateTo();
      page.getApiNavLink().click();
      expect(page.getApiNavLink().getText()).toEqual('API Quotes');
    });
  */
});
