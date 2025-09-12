import {Page, Locator,} from "@playwright/test";


export class AlterPage{
    private page:Page;
    readonly simpleAlert:Locator;
    readonly confirmAlert:Locator;
    readonly promptAlert:Locator;


    constructor(page:Page){
        this.page=page;

        this.simpleAlert=this.page.locator("#accept");
        this.confirmAlert=this.page.locator("#confirm");
        this.promptAlert=this.page.locator("#prompt");
        
    }

    async handleSimpleAlert(){
        this.page.once("dialog", async(dialog)=>{
            await dialog.accept();
        })
        await this.simpleAlert.click();
    }

    async openWebsite(url:string){
        await this.page.goto(url);
    }

    async handleConfirmAlert(accept:boolean=true){
        this.page.once("dialog",async(dialog)=>{
            if(accept){
                await dialog.accept();
            }
            else{
                await dialog.dismiss();
            }
        });

        await this.confirmAlert.click();
    }

    async handlePromptAlert(prompt:string){
        this.page.once("dialog",async(dialog)=>{
            await dialog.accept(prompt);

        });

        await this.promptAlert.click();
    }
}