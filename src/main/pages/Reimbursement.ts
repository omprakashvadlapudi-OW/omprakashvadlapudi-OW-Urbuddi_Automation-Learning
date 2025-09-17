import { Page ,Locator} from "@playwright/test";

export class Reimbursement{
    page:Page;
    
    
    readonly applyExtraWorkButton:Locator;
    readonly dateField:Locator;
    readonly hoursField:Locator;
    readonly selectLeadDropdown:Locator;
    readonly submitButton:Locator;
    readonly workAppliedMessage:Locator;

    constructor(page:Page){
        this.page=page;
        
        this.applyExtraWorkButton=this.page.locator("//button[.='Apply Extra Work']");
        this.dateField=this.page.locator("[name='date']");
        this.hoursField=this.page.locator("[name='hours']");
        this.selectLeadDropdown=this.page.locator("[name='lead']");
        this.submitButton=this.page.locator("[type='submit']");
        this.workAppliedMessage=this.page.locator("//div[text()='Extra work Applied Successfully']");
    }

    async applyExtraWork(date:string, hours:string){
        await this.openApplyExtraWorkForm();
        await this.selectDate(date);
        await this.enterHours(hours);
        await this.selectLead();
        await this.clickSubmit();

    }

    async openApplyExtraWorkForm(){
        await this.page.waitForLoadState("networkidle");
        await this.page.waitForSelector("//button[.='Apply Extra Work']");
        await this.applyExtraWorkButton.click();
    }

    async selectDate(date:string){
        await this.dateField.fill(date);
    }
    async enterHours(hours:string){
        await this.hoursField.fill(hours);
    }
    async selectLead(){
        await this.selectLeadDropdown.selectOption({index:4});
    }
    async clickSubmit(){
        await this.submitButton.click();
    }
}