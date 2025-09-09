import { test, expect,Page } from "@playwright/test"
import { IFramesPage } from "../pages/IFramesPage"

test.describe.serial("IFrame test Suit", () => {
    let page!:Page;
    let IFrame: IFramesPage;
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        IFrame = new IFramesPage(page);

        await IFrame.openWebsite("https://demo.automationtesting.in/Frames.html");

        await expect(page).toHaveTitle("Frames");
    })


    test("IFrame through FrameLocator", async () => {
        await IFrame.iFrameActions("using Frame Locator");
        await expect(IFrame.searchBar).toHaveValue("using Frame Locator");
        await page.reload();
        await expect(IFrame.searchBar).toHaveValue("");
    })

    test("IFrame through name Attribute",async()=>{
        await IFrame.iFrameAction_UsingNameAttribute("using 'name' Attribute");
        await expect(IFrame.searchBar).toHaveValue("using 'name' Attribute");
    })

    test.afterAll(async()=>{
        await page.close();
    })
})