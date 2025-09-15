import { chromium, Page, Browser, BrowserContext, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { config } from "../../resources/config/config";

export class AdminGlobalSetup {
    private browser: Browser | undefined;
    private context: BrowserContext | undefined;
    private page: Page | undefined;

    async init() {
        this.browser = await chromium.launch({ headless: true });
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();

        console.log("Base URL:", config.baseURL);
        console.log("Admin Email:", config.admin.email);


        const loginPage = new LoginPage(this.page);
        await loginPage.openWebsite(config.baseURL);
        await loginPage.loginToApplication(config.admin.email, config.admin.password);
        await expect(loginPage.dashboardTitle).toContainText("Dashboard");

        await this.context.storageState({
            path: "src/resources/storage/adminState.json",
        });
    }

    getPage(): Page {
        if (!this.page) throw new Error("Page not initialized. Call init() first.");
        return this.page;
    }

    async close(): Promise<void> {
        if (this.context) await this.context.close();
        if (this.browser) await this.browser.close();
    }
}


(async () => {
    const setup = new AdminGlobalSetup();
    await setup.init();
    await setup.close();
})();



//npx ts-node src/main/setups/admin.global.ts