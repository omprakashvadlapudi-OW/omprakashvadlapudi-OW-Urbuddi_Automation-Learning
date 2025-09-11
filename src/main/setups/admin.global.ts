import { chromium, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import * as loginData from "../../resources/test-data/generatedEmployee.json";
import { config } from "../../resources/config/config";

async function globalSetup() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();


  const login = new LoginPage(page);
  await login.openWebsite(config.baseURL);
  await login.loginToApplication(loginData[0].email, loginData[0].password);
  await expect(login.dashboardTitle).toContainText("Dashboard");

  await page.context().storageState({ path: "src/resources/storage/adminState.json" });

  await browser.close();
}

export default globalSetup;
