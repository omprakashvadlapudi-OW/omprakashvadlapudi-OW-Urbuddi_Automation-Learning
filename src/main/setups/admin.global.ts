import { chromium, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { config } from "../../resources/config/config";

async function globalSetup() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("Running Admin Global Setup...");
  console.log("Base URL:", config.baseURL);
  console.log("Admin Email:", config.admin.email);

  const loginPage = new LoginPage(page);
  await loginPage.openWebsite(config.baseURL);
  await loginPage.loginToApplication(config.admin.email, config.admin.password);
  await expect(loginPage.dashboardTitle).toContainText("Logout");

  await context.storageState({ path: "src/resources/storage/adminState.json" });

  await browser.close();
}

export default globalSetup;
