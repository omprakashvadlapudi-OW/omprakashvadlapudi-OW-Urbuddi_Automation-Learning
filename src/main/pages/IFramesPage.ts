import { Page, FrameLocator, Locator, Frame } from "@playwright/test";


export class IFramesPage {

    private page: Page;

    readonly iframe: FrameLocator;
    readonly searchBar: Locator;
    readonly iframe_NameAttr: Frame | null;
    //readonly searchBar1: Locator;

    constructor(page: Page) {
        this.page = page;
        this.iframe = this.page.frameLocator("#singleframe");
        this.searchBar = this.iframe.locator("input[type='text']");
        this.iframe_NameAttr = this.page.frame({ name: "SingleFrame" });
        //this.searchBar1=this.iframe_NameAttr.locator("input[type='text']");
    }

    async iFrameActions(searchVal: string) {

        await this.searchBar.waitFor({ state: "visible" });
        await this.searchBar.fill(searchVal);
    }

    async iFrameAction_UsingNameAttribute(searchVal: string) {
        await this.page.waitForSelector("iframe[name='SingleFrame']");

        const frame = this.page.frame({ name: "SingleFrame" });
        const input = await frame!.waitForSelector("input[type='text']");
        await input.fill(searchVal);
    }

    async openWebsite(url: string) {
        await this.page.goto(url);
    }
}


