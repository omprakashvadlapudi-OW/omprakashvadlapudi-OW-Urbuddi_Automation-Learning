import { Browser, BrowserContext, Locator, Page,expect } from "@playwright/test";


export class MultipleTabsPage {
    page: Page;
    context: BrowserContext
    initialPages!: number;

    readonly multiTabButton: Locator;
    readonly clickButton: Locator;
    readonly downloadLink_SeleniumTab: Locator;

    constructor(page: Page) {
        this.page = page;
        this.context = page.context();
        this.multiTabButton = page.locator("[href='#Multiple']");
        this.clickButton = page.locator("[onclick='multiwindow()']");
        this.downloadLink_SeleniumTab = page.locator("[href='/downloads']");

    }



    async handlleMultipleTabs(tab: "Selenium" | "Index") {

        await this.clickOnMultiTab();
        await this.clickOnClick();

        const newPages = await this.getWindows();

        if (tab === "Selenium") {
            const seleniumPage = await this.actionOnSeleniumPage(newPages);
            return seleniumPage;
        }
        else {
            const indexPage = await this.actionOnIndexPage(newPages);
            return indexPage;
        }
    }








    async openWeb(url: string) {
        await this.page.goto(url);
    }
    async clickOnClick() {
        await this.clickButton.click();
    }
    async clickOnMultiTab() {
        this.initialPages = this.context.pages().length;
        await this.multiTabButton.click();
    }
    async getWindows() {
        const allPages: Page[] = this.context.pages();
        const newPages = allPages.slice(this.initialPages);
        await Promise.all(allPages.map(p => p.waitForLoadState("load")));
        return newPages;
    }

    async actionOnSeleniumPage(newPages: Page[]) {
        for (const [index, newPage] of newPages.entries()) {
            const title = await newPage.title();
            if (title === "Selenium") {
                await Promise.all([
                    newPage.waitForLoadState("load"), 
                    newPage.locator("//span[text()='Search']").click()
                ]);
                await expect(newPage).toHaveTitle("Downloads | Selenium");
            }

        }
        

    }
    async actionOnIndexPage(newPages: Page[]) {
        for (const [index, newPage] of newPages.entries()) {
            const title = await newPage.title();
            if (title === "Index") {
                await Promise.all([
                    newPage.waitForLoadState("load"), 
                    newPage.locator("#email").fill("OmPrakash")
                ]);
                this.page.pause();
            }
        }
    }
    // async actionOnSeleniumPage(newPages: Page[]) {
    //     for (const [index, newPage] of newPages.entries()) {
    //         const title = await newPage.title();
    //         if (title == "Selenium") {
    //             await Promise.all([
    //                 newPage.waitForLoadState("load"), // wait for navigation/load after click
    //                 newPage.locator("//span[.='Downloads']").click()
    //             ]);
    //             return newPage;
    //         }
    //     }
    //     return null;

    // }
    // async actionOnIndexPage(newPages: Page[]) {
    //     for (const [index, newPage] of newPages.entries()) {
    //         const title = await newPage.title();
    //         if (title == "Index") {
    //             await Promise.all([
    //                 newPage.waitForLoadState("load"), 
    //                 newPage.locator("#email").fill("OmPrakash")
    //             ]);
    //             return newPage;
    //         }
    //     }
    //     return null;
    // }

}