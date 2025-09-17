import fs from "fs";
import path from "path";
import { Browser, BrowserContext, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { config } from "../../resources/config/config";

export async function createEmployeeStorageState(email: string, password: string,browser:Browser) {
  const storagePath = "src/resources/storage/empState.json";
  const dir = path.dirname(storagePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const context: BrowserContext = await browser.newContext();
  const page = await context.newPage();

  console.log("Running Employee UI Setup...");
  console.log("Base URL:", config.baseURL);
  console.log("Employee Email:", email);
  const loginPage = new LoginPage(page);
  await loginPage.openWebsite(config.baseURL);
  await loginPage.loginToApplication(email, password);
  await expect(loginPage.dashboardTitle).toContainText("Logout");

  await context.storageState({ path: storagePath });
  console.log(`Employee storage state saved to: ${storagePath}`);

  await context.close();
}
