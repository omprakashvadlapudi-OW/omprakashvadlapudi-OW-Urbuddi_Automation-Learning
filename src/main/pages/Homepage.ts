import { Page, Locator } from "@playwright/test";

export class HomePage {
  private page: Page;

  readonly employeesLink: Locator;
  readonly leaveManagementLink:Locator;

  constructor(page: Page) {
    this.page = page;
    this.employeesLink = this.page.locator("//p[.='Employees']");
    this.leaveManagementLink=this.page.locator("//p[.='Leave Management']");
  }

  async clickOnEmployees() {
    await this.employeesLink.click();
  }

  async clickOnLeaveManagement(){
    await this.leaveManagementLink.click();
  }
}
