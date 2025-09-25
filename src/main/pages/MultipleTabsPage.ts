import { BrowserContext, Locator, Page, expect } from "@playwright/test";

export class MultipleTabsPage {
    page: Page;
    context: BrowserContext;

    readonly multiTabButton: Locator;
    readonly clickButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.context = page.context();
        this.multiTabButton = page.locator("[href='#Multiple']");
        this.clickButton = page.locator("[onclick='multiwindow()']");
    }

    async openWeb(url: string) {
        await this.page.goto(url);
    }

    async clickOnMultiTab() {
        await this.multiTabButton.click();
    }

    async clickOnClick() {
        await this.clickButton.click();
    }

    async handleMultipleTabs(tab: "Selenium" | "Index") {
        await this.clickOnMultiTab();

        const newPages: Page[] = [];
        this.context.on("page", async (p) => {
            await p.waitForLoadState();
            newPages.push(p);
        });

        await this.clickOnClick();
        await this.page.waitForTimeout(3000);

        for (const newPage of newPages) {
            const title = await newPage.title();
            if (tab === "Selenium" && title.includes("Selenium")) {
                await newPage.locator("//span[text()='Search']").click();
                await expect(newPage).toHaveTitle("Downloads | Selenium");
                return newPage;
            }
            if (tab === "Index" && title.includes("Index")) {
                await newPage.locator("#email").fill("OmPrakash");
                return newPage;
            }
        }
        return null;
    }
}
