import { test, expect, Page } from "@playwright/test";
import { Homepage } from "../pages/Homepage";
import { LeaveManagementPage } from "../pages/LeaveManagementPage";
import * as leaveData from "../test-data/applyLeaveFunctionalityData.json";

let page: Page;
const leave_index: number = leaveData[0].number!;

test.describe.serial("Leave Management Suite", () => {
  test.beforeAll(async ({ browser }) => {
    const context=await browser.newContext({storageState:"storage/adminState.json"});
    page=await context.newPage();
    await page.goto("https://dev.urbuddi.com");
    await expect(page).toHaveURL(/dev\.urbuddi\.com/);
  });

  test("Apply Leave Test", async () => {
    const homepage = new Homepage(page);
    await homepage.clickOnLeaveManagement();
    await expect(page).toHaveURL(/leave_management/);
    const leavePage = new LeaveManagementPage(page);




    await leavePage.applyLeave(
      leaveData[leave_index].email!,
      leaveData[leave_index].reason!,
      leaveData[leave_index].remarks!,
      leaveData[leave_index].leaveType as "leave" | "workFromHome"
    );


    const warningText = await leavePage.existWarning_applyLeave.textContent();

    if (warningText?.trim() !== "No of Days : 0") {
      await leavePage.close_applyLeave.click();
      await leavePage.applyLeave(
        leaveData[leave_index].email!,
        leaveData[leave_index].reason!,
        leaveData[leave_index].remarks!,
        leaveData[leave_index].leaveType as "leave" | "workFromHome"
      );

    }
    else {
      if (leaveData[leave_index].leaveType == "workFromHome") {
        await expect(page.locator("#root .leave-history-container [aria-live='polite']")).toHaveText("WFH Applied Successfully");

      }
      else {
        await expect(page.locator("#root .leave-history-container [aria-live='polite']")).toHaveText("Leave Applied Successfully");
      }

    }


  });

  test.afterAll(async () => {
    await page.close();
  });
});
