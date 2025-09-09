import { test, expect, Page } from "@playwright/test";
import { Homepage } from "../pages/Homepage";
import { LeaveManagementPage } from "../pages/LeaveManagementPage";
import * as leaveData from "../test-data/applyLeaveFunctionalityData.json";

let page: Page;
const leave_index: number = leaveData[0].number!;

test.describe.serial("Leave Management Suite", () => {
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext({ storageState: "storage/adminState.json" });
    page = await context.newPage();
    await page.goto("https://dev.urbuddi.com");
    await expect(page).toHaveURL(/dev\.urbuddi\.com/);
  });

  test("Apply Leave Test", async () => {
    const homepage = new Homepage(page);
    await homepage.clickOnLeaveManagement();
    await expect(page).toHaveURL(/leave_management/);
    const leavePage = new LeaveManagementPage(page);

    let success = false;

    for (let attempt = 1; attempt <= 3; attempt++) {
      await leavePage.applyLeave(
        leaveData[leave_index].email!,
        leaveData[leave_index].reason!,
        leaveData[leave_index].remarks!,
        leaveData[leave_index].leaveType as "leave" | "workFromHome"
      );

      const warningText = (await leavePage.existWarning_applyLeave.textContent())?.trim();

      if (warningText !== "No of Days : 0") {
        await leavePage.close_applyLeave.click();
        console.log(`Attempt ${attempt}: Warning received, retrying...`);
      } else {
        // Success
        const expectedMessage =
          leaveData[leave_index].leaveType === "workFromHome"
            ? "WFH Applied Successfully"
            : "Leave Applied Successfully";

        await expect(
          page.locator("#root .leave-history-container [aria-live='polite']")
        ).toHaveText(expectedMessage);

        console.log(`Attempt ${attempt}: Success message received`);
        success = true;
        break; // exit loop on success
      }
    }

    if (!success) {
      throw new Error("Failed to apply leave after 3 attempts");
    }
  });

  test.afterAll(async () => {
    await page.close();
  });
});
