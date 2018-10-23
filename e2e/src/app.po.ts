import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  /* will fail because in the app-root there is no header */
  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getAddQuoteButton() {
    return element(by.className('btn lightBlueBackground'));
  }

  getApiNavLink() {
    return element(by.id('apiRoute')); // added id 'apiRoute' to the nav link just for testing purposes (I removed it then)
  }
}
