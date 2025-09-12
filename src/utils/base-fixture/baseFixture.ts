import { test as base, Page } from "@playwright/test";
import { config } from "../../resources/config/config";
import { LoginPage } from "../../main/pages/LoginPage";
import { HomePage } from "../../main/pages/HomePage";
import { EmployeesPage } from "../../main/pages/EmployeesPage";
import { DataGenerator } from "../utilities/DataGenerator";
import { LeaveManagementPage } from "../../main/pages/LeaveManagementPage";
import { GlobalSetup } from "../../main/setups/admin.global"

type TestFixtures = {
  adminCredentials: { email: string; password: string };
  loginPage: LoginPage;
  homePage: HomePage;
  empPage: EmployeesPage;
  dataGen: DataGenerator;
  leavePage: LeaveManagementPage;
  globalPage: Page;
  globalSetup: GlobalSetup;
  
};

export const test = base.extend<TestFixtures>({
  // Shared globalPage per worker (= per spec file usually)
  globalPage: [
    async ({ browser }, use) => {
      const context = await browser.newContext();
      const page = await context.newPage();
      await use(page);
      await context.close();
    },
    { scope: "worker" }as any,
  ],
  globalSetup: async ({}, use) => {
    const setup = new GlobalSetup();
    await setup.init();
    await use(setup);
    await setup.close();
  },

  adminCredentials: async ({}, use) => {
    await use(config.admin);
  },

  loginPage: async ({ globalPage }, use) => {
    const loginPage = new LoginPage(globalPage);
    await use(loginPage);
  },

  homePage: async ({ globalPage }, use) => {
    const homePage = new HomePage(globalPage);
    await use(homePage);
  },

  empPage: async ({ globalPage }, use) => {
    const empPage = new EmployeesPage(globalPage);
    await use(empPage);
  },

  dataGen: async ({}, use) => {
    const dataGen = new DataGenerator();
    await use(dataGen);
  },

  leavePage: async ({ globalPage }, use) => {
    const leavePage = new LeaveManagementPage(globalPage);
    await use(leavePage);
  },
});

export { expect } from "@playwright/test";
