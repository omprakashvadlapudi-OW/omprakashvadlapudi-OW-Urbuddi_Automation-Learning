import { chromium, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import * as loginData from "../test-data/login.json";

async function globalSetup() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Use Page Object for login
  const login = new LoginPage(page);
  await login.openWebsite(loginData[0].url!);
  await login.loginToApplication(loginData[1].email!, loginData[1].password!);

  // Verify dashboard visible
  await expect(login.dashboardTitle).toContainText("Dashboard");

  // Save storage state
  await page.context().storageState({ path: "storage/adminState.json" });

  await browser.close();
}

export default globalSetup;
