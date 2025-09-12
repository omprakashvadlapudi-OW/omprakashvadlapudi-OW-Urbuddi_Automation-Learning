import { test, expect } from "../../utils/base-fixture/baseFixture";
import * as leaveData from "../../resources/test-data/applyLeaveFunctionalityData.json";
import { config } from "../../resources/config/config";

test.describe.serial("Leave Management Suite", () => {

  // No need for beforeAll to create page manually; storagePage fixture handles it

  test("Apply Leave Test", async ({ storagePage, homePage, leavePage }) => {
    // Navigate to Leave Management
    await homePage.clickOnLeaveManagement();

    // storagePage is already logged in with storageState
    await expect(storagePage).toHaveURL(/leave_management/);

    // Apply leave
    await leavePage.applyLeave(
      leaveData.reason,
      leaveData.remarks,
      leaveData.leaveType
    );

    // Assert success message
    if (leaveData.leaveType === "workFromHome") {
      await expect(leavePage.wfhSuccessMessage).toHaveText("WFH Applied Successfully");
    } else {
      await expect(leavePage.leaveSuccessMessage).toHaveText("Leave Applied Successfully");
    }
  });

  // No need for afterAll to close page; fixture handles cleanup

});
