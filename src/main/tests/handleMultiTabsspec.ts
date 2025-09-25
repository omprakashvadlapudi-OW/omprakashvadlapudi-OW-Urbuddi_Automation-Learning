import { MultipleTabsPage } from "../pages/MultipleTabsPage";
import { test, expect, Page, BrowserContext } from "@playwright/test";
import * as MTdata from "../../resources/test-data/handleMultiTabs.json";

test.describe.serial("Multiple Tab Suite", () => {
    let page: Page;
    let context: BrowserContext;
    let multiTab: MultipleTabsPage;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        multiTab = new MultipleTabsPage(page);

        await multiTab.openWeb(MTdata.url);
    });

    test("Perform actions on Selenium tab", async () => {
        const seleniumPage = await multiTab.handleMultipleTabs("Selenium");
        await expect(seleniumPage!).toHaveTitle("Downloads | Selenium");
    });

    test("Perform actions on Index tab", async () => {
        const indexPage = await multiTab.handleMultipleTabs("Index");
        await indexPage!.locator("#email").fill("OmPrakash");
    });

    test.afterAll(async () => {
        await page.close();
    });
});
