import { test, expect, Page } from "@playwright/test";
import { Homepage } from "../pages/Homepage";
import { LeaveManagementPage } from "../pages/LeaveManagementPage";
import * as leaveData from "../../resources/test-data/applyLeaveFunctionalityData.json";
import { config } from "../../resources/config/config";

let page: Page;

test.describe.serial("Leave Management Suite", () => {
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext({ storageState: "src/resources/storage/adminState.json" });
    page = await context.newPage();
    await page.goto(config.baseURL);
    await expect(page).toHaveURL(/dev\.urbuddi\.com/);
  });

  test("Apply Leave Test", async () => {
    const homepage = new Homepage(page);
    await homepage.clickOnLeaveManagement();
    await expect(page).toHaveURL(/leave_management/);
    const leavePage = new LeaveManagementPage(page);




    await leavePage.applyLeave(

      leaveData[0].reason!,
      leaveData[0].remarks!,
      leaveData[0].leaveType as "leave" | "workFromHome"
    );

    if(leaveData[0].leaveType=="workFromHome"){
      await expect(page.locator("#root .leave-history-container [aria-live='polite']")).toHaveText("WFH Applied Successfully");

    }
    else{
      await expect(page.locator("#root .leave-history-container [aria-live='polite']")).toHaveText("Leave Applied Successfully");
    }

    
  });

  test.afterAll(async () => {
    await page.close();
  });
});
