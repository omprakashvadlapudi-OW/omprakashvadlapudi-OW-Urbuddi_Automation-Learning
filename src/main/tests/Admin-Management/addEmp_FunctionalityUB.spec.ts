import { test, expect } from "../../../utils/base-fixture/baseFixture";
import * as empData from "../../../resources/test-data/add_functionalityData.json";
import { createEmployeeStorageState } from "../../setups/emp.global";

test.describe.serial("Add Functionality Suite", () => {
    let email: string;
    let password: string;

    test.beforeAll(async ({ dataGen }) => {
        const cred = dataGen.getCredentials(empData.firstName);
        email = cred.email;
        password = cred.password;
    });

    test("Add Employee Test", async ({ adminStorage, adminHomePage, empPageAdmin, dataGen, browser }) => {
        await adminHomePage.clickOnMenu("Employees");
        await expect.soft(adminStorage).toHaveURL(/allemployees/);
        await expect.soft(empPageAdmin.addEmployeeButton).toBeVisible();
        const empID = dataGen.getRandomInt(100000, 1000000).toString();

        await empPageAdmin.addEmployees(
            empData.firstName,
            empData.lastName,
            empID,
            email,
            empData.role,
            password,
            empData.dob,
            empData.doj,
            empData.qualification,
            empData.department,
            empData.gender,
            empData.phone,
            empData.bloodGroup,
            empData.designation,
            empData.salary,
            empData.address
        );
        await expect.soft(empPageAdmin.successMessage).toHaveText("Saved Successfully", { timeout: 3000 });
        await createEmployeeStorageState(email, password, browser);
    });


    test.afterAll(async ({ adminStorage }) => {
        await adminStorage.close();
    });

});
