import { Page, Locator } from "@playwright/test";
import { DataGenerator } from "../../utils/utilities/DataGenerator";

export class LeaveManagementPage {
  readonly page: Page;
  readonly applyLeaveButton: Locator;
  readonly okButton_applyLeave: Locator;
  readonly fromDate_applyLeave: Locator;
  readonly toDate_applyLeave: Locator;
  readonly subjectFeild_applyLeave: Locator;
  readonly reasonTextArea_applyLeave: Locator;
  readonly leaveCheckbox_applyLeave: Locator;
  readonly workfromhomeCheckbox_applyLeave: Locator;
  readonly submitButton_applyLeave: Locator;
  readonly selectLead_applyLeave: Locator;
  readonly existWarning_applyLeave: Locator;
  readonly close_applyLeave: Locator;
  readonly leadOption_wait: Locator;
  readonly wfhSuccessMessage:Locator;
  readonly leaveSuccessMessage:Locator;

  readonly dataGen: DataGenerator;

  constructor(page: Page) {
    this.page = page;
    this.applyLeaveButton = this.page.locator("//button[text()='Apply Leave']");
    this.okButton_applyLeave = this.page.locator(
      "//div[@class='modal']/descendant::button[text()='Ok']"
    );
    this.fromDate_applyLeave = this.page.locator("#fromDate");
    this.toDate_applyLeave = this.page.locator("#toDate");
    this.subjectFeild_applyLeave = this.page.locator("input[name='subject']");
    this.selectLead_applyLeave = this.page.locator("[name='lead']");
    this.reasonTextArea_applyLeave = this.page.locator("textarea[name='reason']");
    this.leaveCheckbox_applyLeave = this.page.locator("#leave");
    this.workfromhomeCheckbox_applyLeave = this.page.locator("#workFromHome");
    this.submitButton_applyLeave = this.page.locator("//button[text()='Submit']");
    this.dataGen = new DataGenerator();
    this.existWarning_applyLeave = this.page.locator(".modal-container .modal-children p:last-of-type");
    this.close_applyLeave = this.page.locator(".modal-container svg");
    this.leadOption_wait = this.page.locator("[name='lead']>option");
    this.wfhSuccessMessage=this.page.locator("#root .leave-history-container [aria-live='polite']");
    this.leaveSuccessMessage=this.page.locator("#root .leave-history-container [aria-live='polite']");
  }

  async applyLeave(
    subject: string,
    reason: string,
    leaveType: string
  ) {
    await this.openApplyLeaveForm();
    await this.confirmSubmission();
    const minAttr = await this.fromDate_applyLeave.getAttribute("min");
    const maxAttr = await this.fromDate_applyLeave.getAttribute("max");

    const { fromDate, toDate } = this.dataGen.getFromAndToDate(minAttr!, maxAttr!);

    await this.fillFromDate(fromDate);
    await this.fillToDate(toDate);
    await this.selectLead();
    await this.fillSubject(subject);
    await this.fillReason(reason);
    await this.selectLeaveType(leaveType);
    await this.submitLeaveForm();
  }

  async openApplyLeaveForm() {
    await this.page.waitForSelector("//button[text()='Apply Leave']")
    await this.applyLeaveButton.click();
  }

  async fillFromDate(date: string) {
    await this.fromDate_applyLeave.fill(date);
  }

  async fillToDate(date: string) {
    await this.toDate_applyLeave.fill(date);
  }

  async selectLead() {
    await this.selectLead_applyLeave.selectOption({ index:0 });
  }


  async fillSubject(subject: string) {
    await this.subjectFeild_applyLeave.fill(subject);
  }

  async fillReason(reason: string) {
    await this.reasonTextArea_applyLeave.fill(reason);
  }

  async selectLeaveType(type:string) {
    if (type === "leave") {
      await this.leaveCheckbox_applyLeave.check();
    } else {
      await this.workfromhomeCheckbox_applyLeave.check();
    }
  }

  async submitLeaveForm() {
    await this.submitButton_applyLeave.click();
  }

  async confirmSubmission() {
    try {
      await this.okButton_applyLeave.waitFor({ state: 'visible', timeout: 2000 });
      await this.okButton_applyLeave.click();
    } catch {
      console.log("No confirmation modal appeared, continuing...");
    }
  }
}