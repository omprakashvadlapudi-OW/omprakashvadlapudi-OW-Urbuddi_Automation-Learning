import { Page, Locator } from "@playwright/test";

export class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  private getMenuLink(menuName: string): Locator {
    return this.page.locator(`//p[text()='${menuName}']`);
  }

  async clickOnMenu(menuName: string) {
    await this.getMenuLink(menuName).click();
  }
}
