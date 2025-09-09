import { test, expect, Page } from "@playwright/test";
import { Homepage } from "../pages/Homepage";
import { DataGenerator } from "../data-generator/DataGenerator";
import { EmployeesPage } from "../pages/EmployeesPage";
import * as loginData from "../test-data/login.json";
import * as empData from "../test-data/add_functionalityData.json";


let page: Page;
const emp_index: number = empData[0].number!;

test.describe.serial('Add Functionality Suite', () => {
    test.beforeAll(async ({ browser }) => {
        const context=await browser.newContext({storageState:"storage/adminState.json"});
        page=await context.newPage();
        await page.goto("https://dev.urbuddi.com");
        await expect(page).toHaveURL(/dev\.urbuddi\.com/);
    });

    test('Add Employee Test', async () => {
        const homepage = new Homepage(page);
        await homepage.clickOnEmployees();
        await expect(page).toHaveURL(/allemployees/);

        const dummy = new DataGenerator();
        const empPage = new EmployeesPage(page);

        await expect(empPage.addEmployeeButton).toBeVisible();

        await empPage.addEmployees(
            empData[emp_index].firstName!,                       
            empData[emp_index].lastName!,                        
            dummy.getRandomInt(100000, 1000000).toString(),      
            `${empData[emp_index].firstName!.toLowerCase()}${dummy.getRandomInt(10, 99)}@gmail.com`,
            empData[emp_index].role!,                            
            empData[emp_index].password!,                        
            empData[emp_index].dob!,                             
            empData[emp_index].doj!,                             
            empData[emp_index].qualification!,                   
            empData[emp_index].department!,                      
            empData[emp_index].gender!,                          
            empData[emp_index].phone!,            
            empData[emp_index].bloodGroup!,                      
            empData[emp_index].designation!,                   
            empData[emp_index].salary!,                        
            empData[emp_index].address!,                        
                 
        );

        await expect(page.locator("#root .all-employees-page div[role='status']")).toHaveText("Saved Successfully");

    });

    test.afterAll(async () => {
        await page.close();
    });
});
