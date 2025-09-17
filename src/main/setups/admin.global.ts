import { FullConfig, Browser, BrowserContext, Page, chromium, firefox, webkit, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { config } from "../../resources/config/config";

async function globalSetup(fullConfig: FullConfig) {
  const projectArgIndex = process.argv.findIndex(arg => arg.startsWith("--project="));
  const projectName = projectArgIndex !== -1 ? process.argv[projectArgIndex].split("=")[1] : "chromium";

  const project = fullConfig.projects.find(p => p.name === projectName);
  if (!project) throw new Error(`Project ${projectName} not found in config`);

  let browser: Browser;
  const browserName = project.use?.browserName || "chromium";

  if (browserName === "firefox") browser = await firefox.launch({ headless: true });
  else if (browserName === "webkit") browser = await webkit.launch({ headless: true });
  else browser = await chromium.launch({ headless: true });

  const context: BrowserContext = await browser.newContext();
  const page: Page = await context.newPage();
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
