import {expect,Browser,test,Page} from "@playwright/test";
import { AlterPage } from "../pages/AlterPage";


test.describe.serial("Alter test suit",async()=>{
    let alert:AlterPage;
    let page:Page;
    test.beforeAll(async ({browser})=>{
        const context =await browser.newContext();
        page=await context.newPage();

        alert=new AlterPage(page);
        await alert.openWebsite("https://letcode.in/alert");
        await expect(page).toHaveURL(/alert/);
    })

    test("simple alert",async()=>{

        await alert.handleSimpleAlert();
    });

    test("confirm alert", async()=>{
        await alert.handleConfirmAlert(false);

    });

    test("prompt alert",async()=>{
        await alert.handlePromptAlert("Om Prakash");
    });

    test.afterAll(async()=>{
        await page.close();
    });


})


