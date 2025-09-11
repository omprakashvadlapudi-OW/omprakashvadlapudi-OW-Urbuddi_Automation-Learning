//import { test, expect, Page } from "@playwright/test";
import { test, expect } from "../../utils/base-fixture/baseFixture";
import { Homepage } from "../pages/Homepage";
import { DataGenerator } from "../../utils/utilities/DataGenerator";
import { EmployeesPage } from "../pages/EmployeesPage";
import * as empData from "../../resources/test-data/add_functionalityData.json";
import { LoginPage } from "../pages/LoginPage";
import { config } from "../../resources/config/config"
import fs from "fs";
import path from "path";




let page;


test.describe.serial('Add Functionality Suite', () => {
    test.beforeAll(async ({ browser, adminCredentials }) => {
        const context = await browser.newContext();  // create 1 context
        page = await context.newPage();
        const loginPage = new LoginPage(page);
        await loginPage.openWebsite(config.baseURL);
        await loginPage.loginToApplication(adminCredentials.email, adminCredentials.password);
        await expect(page).toHaveURL(/dev\.urbuddi\.com/);
    });

    test('Add Employee Test', async () => {
        const homepage = new Homepage(page);
        await homepage.clickOnEmployees();
        await expect(page).toHaveURL(/allemployees/);
        const dummy = new DataGenerator();
        const empPage = new EmployeesPage(page);
        const { email, password } = dummy.getCredentials(empData[0].firstName);

        await expect(empPage.addEmployeeButton).toBeVisible();

        await empPage.addEmployees(
            empData[0].firstName!,
            empData[0].lastName!,
            dummy.getRandomInt(100000, 1000000).toString(),
            email,
            empData[0].role!,
            password,
            empData[0].dob!,
            empData[0].doj!,
            empData[0].qualification!,
            empData[0].department!,
            empData[0].gender!,
            empData[0].phone!,
            empData[0].bloodGroup!,
            empData[0].designation!,
            empData[0].salary!,
            empData[0].address!,

        );

        await expect(page.locator("#root .all-employees-page div[role='status']")).toHaveText("Saved Successfully");
        const filePath = path.join(__dirname, "../../resources/test-data/generatedEmployee.json");
        const data = { email, password };
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
        console.log("Employee credentials saved to:", filePath);
    });

    test.afterAll(async () => {
        await page.close();
    });
});
