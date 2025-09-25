import { test, expect } from "../../../utils/base-fixture/baseFixture";
import * as leaveData from "../../../resources/test-data/applyLeaveFunctionalityData.json";

test.describe.serial("Leave Management Suite", () => {
  test("Apply Leave Test", async ({ empStorage, empHomePage, empLeavePage }) => {
    await empHomePage.clickOnMenu("Leave Management");
    await expect.soft(empStorage).toHaveURL(/leave_management/);

    await empLeavePage.applyLeave(
      leaveData.reason,
      leaveData.remarks,
      leaveData.leaveType
    );

    if (leaveData.leaveType === "workFromHome") {
      await expect.soft(empLeavePage.wfhSuccessMessage).toHaveText(
        "WFH Applied Successfully",
        { timeout: 10000 }
      );
    } else {
      await expect.soft(empLeavePage.leaveSuccessMessage).toHaveText(
        "Leave Applied Successfully",
        { timeout: 10000 }
      );
    }
  });

  test.afterAll(async ({ empStorage }) => {
    await empStorage.close();
  });
});
