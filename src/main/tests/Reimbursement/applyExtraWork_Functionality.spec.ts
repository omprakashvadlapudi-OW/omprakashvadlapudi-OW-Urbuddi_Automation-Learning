import { test, expect } from "../../../utils/base-fixture/baseFixture";
import * as testData from "../../../resources/test-data/reimbursementData.json"

test.describe.serial("Apply Extra Work Suite", ()=>{
    test("Apply Extra Work", async ({empStorage, empHomePage,empReimbursement,dataGen})=>{
        await empHomePage.clickOnReimbersement();
        await expect(empStorage).toHaveURL(/reimbursement/);

        await empReimbursement.applyExtraWork(dataGen.getTodayDate(),testData.hours);

        await expect(empReimbursement.workAppliedMessage).toHaveText("Extra work Applied Successfully",{timeout:10000});
    });

    test.afterAll(async ({ empStorage }) => {
    await empStorage.close();
  });
})