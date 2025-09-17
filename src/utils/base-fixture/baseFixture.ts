import { test as base, Page } from "@playwright/test";
import { config } from "../../resources/config/config";
import { HomePage } from "../../main/pages/HomePage";
import { EmployeesPage } from "../../main/pages/EmployeesPage";
import { DataGenerator } from "../utilities/DataGenerator";
import { LeaveManagementPage } from "../../main/pages/LeaveManagementPage";
import { Reimbursement } from "../../main/pages/Reimbursement";

type TestFixtures = {
  adminCredentials: { email: string; password: string };
  empHomePage: HomePage;
  adminHomePage: HomePage;
  empPageAdmin: EmployeesPage;
  dataGen: DataGenerator;
  empLeavePage: LeaveManagementPage;
  adminStorage: Page;
  empStorage: Page;
  empReimbursement:Reimbursement;
};

export const test = base.extend<TestFixtures>({
  adminStorage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: "src/resources/storage/adminState.json",
      recordVideo: { dir: "video/"},
     });
    const page = await context.newPage();
    await page.goto(config.baseURL);
    await use(page);
    await context.close();
  },

  empStorage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: "src/resources/storage/empState.json",
    
      recordVideo: { dir: "video/"},
     });
    const page = await context.newPage();
    await page.goto(config.baseURL);
    await use(page);
    await context.close();
  },



  adminCredentials: async ({ }, use) => {
    await use(config.admin);
  },

  adminHomePage: async ({ adminStorage }, use) => {
    const homePage = new HomePage(adminStorage);
    await use(homePage);
  },

  empHomePage: async ({ empStorage }, use) => {
    const homePage = new HomePage(empStorage);
    await use(homePage);
  },

  empLeavePage: async ({ empStorage }, use) => {
    const leavePage = new LeaveManagementPage(empStorage);
    await use(leavePage);
  },


  empPageAdmin: async ({ adminStorage }, use) => {
    await use(new EmployeesPage(adminStorage));
  },

  dataGen: async ({ }, use) => {
    await use(new DataGenerator());
  },

  empReimbursement:async({empStorage},use)=>{
    const reimbursement=new Reimbursement(empStorage);
    await use(reimbursement);
  }

});


test.afterEach(async ({ adminStorage, empStorage }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    const storages = [adminStorage, empStorage];
    for (const page of storages) {
      const video = page?.video?.();
      if (video) {
        const path = await video.path();
        testInfo.attach('Test video', {
          path,
          contentType: 'video/mp4',  
        });
      }
    }
  }
});


export { expect } from "@playwright/test";
