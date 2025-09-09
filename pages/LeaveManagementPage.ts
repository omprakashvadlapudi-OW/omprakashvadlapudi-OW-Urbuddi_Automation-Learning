import { Page, Locator } from "@playwright/test";
import { DataGenerator } from "../data-generator/DataGenerator";

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
  readonly leadOption_wait:Locator;

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
    this.leadOption_wait=this.page.locator("[name='lead']>option")
  }

  async applyLeave(
    lead: string,
    subject: string,
    reason: string,
    leaveType: "leave" | "workFromHome"
  ) {
    await this.openApplyLeaveForm();
    await this.confirmSubmission();
    const minAttr = await this.fromDate_applyLeave.getAttribute("min");
    const maxAttr = await this.fromDate_applyLeave.getAttribute("max");

    const { fromDate, toDate } = this.dataGen.getFromAndToDate(minAttr!, maxAttr!);

    await this.fillFromDate(fromDate);
    await this.fillToDate(toDate);
    await this.selectLead(lead);
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

  async selectLead(lead: string) {
    //await this.selectLead_applyLeave.waitFor({ state: "visible" });
    
    //await this.leadOption_wait.waitFor({ state: 'visible' });
    //await this.selectLead_applyLeave.selectOption(lead);

      // Wait for the dropdown to be visible and click it
  await this.selectLead_applyLeave.waitFor({ state: "visible", timeout: 10000 });
  await this.selectLead_applyLeave.click();

  const leadOption = this.page.locator("[name='lead']>option", { hasText: lead });
  await leadOption.waitFor({ state: "visible", timeout: 10000 });

  await leadOption.click();
  }

  async fillSubject(subject: string) {
    await this.subjectFeild_applyLeave.fill(subject);
  }

  async fillReason(reason: string) {
    await this.reasonTextArea_applyLeave.fill(reason);
  }

  async selectLeaveType(type: "leave" | "workFromHome") {
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
    await this.okButton_applyLeave.click();
  }
}
