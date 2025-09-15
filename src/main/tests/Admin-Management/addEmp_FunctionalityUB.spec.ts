import fs from "fs";
import path from "path";
import { test, expect } from "../../../utils/base-fixture/baseFixture";
import * as empData from "../../../resources/test-data/add_functionalityData.json";

test.describe.serial("Add Functionality Suite", () => {
    let email: string;
    let password: string;

    test.beforeAll(async ({ dataGen }) => {
        const cred = dataGen.getCredentials(empData.firstName);
        email = cred.email;
        password = cred.password;
    });

    test("Add Employee Test", async ({ adminStorage, adminHomePage, empPageAdmin, dataGen }) => {
        await adminHomePage.clickOnEmployees();
        await expect(adminStorage).toHaveURL(/allemployees/);
        await expect(empPageAdmin.addEmployeeButton).toBeVisible();

        await empPageAdmin.addEmployees(
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
            empData.address
        );

        await expect(empPageAdmin.successMessage).toHaveText("Saved Successfully");

        const filePath = path.join(__dirname, "../../resources/test-data/generatedEmployee.json");
        const data = { email, password };
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
        console.log("Employee credentials saved to:", filePath);
    });

    test("Apply Leave with fresh page", async ({ globalSetup }) => {
        const page = globalSetup.getPage();


        await page.click("#leaveManagementLink");
    });

});
