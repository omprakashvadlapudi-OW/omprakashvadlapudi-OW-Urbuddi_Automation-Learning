import { FullConfig, Browser, BrowserContext, Page, chromium, firefox, webkit, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { config } from "../../resources/config/config";

async function globalSetup(fullConfig: FullConfig) {

  const browserName = process.env.BROWSER?.toLowerCase() || "chromium";

  let browser: Browser;
  if (browserName === "firefox") {
    browser = await firefox.launch({ headless: true });
  } else if (browserName === "webkit") {
    browser = await webkit.launch({ headless: true });
  } else {
    browser = await chromium.launch({ headless: true });
  }

  const context: BrowserContext = await browser.newContext();
  const page: Page = await context.newPage();

  const loginPage = new LoginPage(page);
  await loginPage.openWebsite(config.baseURL);
  await loginPage.loginToApplication(config.admin.email, config.admin.password);
  await expect(loginPage.dashboardTitle).toContainText("Logout");

  await context.storageState({ path: "src/resources/storage/adminState.json" });
  await browser.close();
}

export default globalSetup;
