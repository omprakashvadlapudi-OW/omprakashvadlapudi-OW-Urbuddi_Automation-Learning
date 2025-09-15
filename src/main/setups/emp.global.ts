import { chromium, Page, Browser, BrowserContext, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import * as loginData from "../../resources/test-data/generatedEmployee.json";
import { config } from "../../resources/config/config";

export class GlobalSetup {
  private browser: Browser | undefined;
  private context: BrowserContext | undefined;
  private page: Page | undefined;

  async init() {
    this.browser = await chromium.launch({ headless: true });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    const loginPage = new LoginPage(this.page);
    await loginPage.openWebsite(config.baseURL);
    await loginPage.loginToApplication(loginData.email, loginData.password);
    await expect(loginPage.dashboardTitle).toContainText("Dashboard");

    await this.context.storageState({
      path: "src/resources/storage/empState.json",
    });
  }

  getPage(): Page {
    if (!this.page) throw new Error("Page not initialized. Call init() first.");
    return this.page;
  }

  async close(): Promise<void> {
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }
}
