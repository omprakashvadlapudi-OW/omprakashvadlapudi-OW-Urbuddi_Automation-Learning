import { MultipleTabsPage } from "../pages/MultipleTabsPage";
import { test,expect,Browser,Page,BrowserContext } from "@playwright/test";
import * as MTdata from "../test-data/handleMultiTabs.json";


test.describe.serial("Multiple Tab Suite",async()=>{

    let page:Page;
    let context:BrowserContext;
    let multiTab:MultipleTabsPage;

    test.beforeAll(async({browser})=>{
        context=await browser.newContext();
        page=await context.newPage();
        multiTab=new MultipleTabsPage(page);

        await multiTab.openWeb(MTdata.url);
    })

    test("Perfrom actions of selenium tab",async()=>{
        await multiTab.handlleMultipleTabs("Index");
        //expect (seleniumPage).not.toBeNull();
        //await expect(seleniumPage!).toHaveTitle("Downloads | Selenium");

    });

    test.afterAll(async()=>{
        await page.close();
    })

})