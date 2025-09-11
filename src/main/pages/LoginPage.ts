import { Page, Locator } from '@playwright/test';

export class LoginPage {
  page: Page;

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly dashboardTitle:Locator;


  constructor(page: Page) {
    this.page = page;
    this.usernameInput = this.page.locator('#userEmail');
    this.passwordInput = this.page.locator('#userPassword');
    this.loginButton = this.page.locator("button[type='submit']");
    this.dashboardTitle=this.page.locator(".page-header-container>p");
  }

  async openWebsite(url: string) {
    await this.page.goto(url);
  }

  async loginToApplication(email: string, password: string) {
    await this.enterUsername(email);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async enterUsername(email: string) {
    await this.usernameInput.fill(email);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }
}
