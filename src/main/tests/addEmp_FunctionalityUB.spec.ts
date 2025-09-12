import fs from "fs";
import path from "path";
import { config } from "../../resources/config/config";
import { test, expect } from "../../utils/base-fixture/baseFixture";
import * as empData from "../../resources/test-data/add_functionalityData.json";



test.describe.serial('Add Functionality Suite', () => {

    test.use({ storageState: undefined });
    let email: string;
    let password: string;



    test.beforeAll(async ({ globalPage, adminCredentials, loginPage, dataGen }) => {


        await loginPage.openWebsite(config.baseURL);
        await loginPage.loginToApplication(adminCredentials.email, adminCredentials.password);
        await expect(globalPage).toHaveURL(/dev\.urbuddi\.com/);
        const cred = dataGen.getCredentials(empData.firstName);
        email = cred.email;
        password = cred.password;
    });


    test('Add Employee Test', async ({ globalPage, homePage, empPage, dataGen }) => {
        await homePage.clickOnEmployees();
        await expect(globalPage).toHaveURL(/allemployees/);
        await expect(empPage.addEmployeeButton).toBeVisible();

        await empPage.addEmployees(
            empData.firstName,
            empData.lastName,
            dataGen.getRandomInt(100000, 1000000).toString(),
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
            empData.address,

        );

        await expect(empPage.successMessage).toHaveText("Saved Successfully");
        const filePath = path.join(__dirname, "../../resources/test-data/generatedEmployee.json");
        const data = { email, password };
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
        console.log("Employee credentials saved to:", filePath);
    });


    test("Apply Leave with fresh page", async ({ globalSetup }) => {
        const page = globalSetup.getPage();


        await page.click("#leaveManagementLink");
    });


    test.afterAll(async ({ globalPage }) => {
        await globalPage.close();
    });
});
