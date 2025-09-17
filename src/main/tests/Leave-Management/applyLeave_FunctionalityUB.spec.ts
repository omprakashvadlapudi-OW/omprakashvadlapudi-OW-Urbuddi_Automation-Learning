import { test, expect } from "../../../utils/base-fixture/baseFixture";
import * as leaveData from "../../../resources/test-data/applyLeaveFunctionalityData.json";

test.describe.serial("Leave Management Suite", () => {
  test("Apply Leave Test", async ({ empStorage, empHomePage, empLeavePage }) => {
    await empHomePage.clickOnLeaveManagement();
    await expect(empStorage).toHaveURL(/leave_management/);

    await empLeavePage.applyLeave(
      leaveData.reason,
      leaveData.remarks,
      leaveData.leaveType
    );

    if (leaveData.leaveType === "workFromHome") {
      await expect(empLeavePage.wfhSuccessMessage).toHaveText(
        "WFH Applied Successfully",
        {timeout: 10000}
      );
    } else {
      await expect(empLeavePage.leaveSuccessMessage).toHaveText(
        "Leave Applied Successfully",
        {timeout:10000}
      );
    }
  });

  test.afterAll(async ({ empStorage }) => {
    await empStorage.close();
  });
});
