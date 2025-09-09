import { Page, Locator } from '@playwright/test';

export class EmployeesPage {
  private page: Page;

  readonly addEmployeeButton: Locator;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private empIdInput: Locator;
  private emailInput: Locator;
  private roleDropdown: Locator;
  private passwordInput: Locator;
  private dobCalendar: Locator;
  private joiningDateCalendar: Locator;
  private qualificationsDropdown: Locator;
  private departmentInput: Locator;
  private genderDropdown: Locator;
  private mobileInput: Locator;
  private bloodGroupDropdown: Locator;
  private designationInput: Locator;
  private salaryInput: Locator;
  private locationInput: Locator;
  private reportToDropdown: Locator;
  private addButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.addEmployeeButton = this.page.locator("//button[.='Add Employee']");
    this.firstNameInput = this.page.locator("input[name='firstName']");
    this.lastNameInput = this.page.locator("input[name='lastName']");
    this.empIdInput = this.page.locator("#employeeID");
    this.emailInput = this.page.locator("input[name='email']");
    this.roleDropdown = this.page.locator("#role");
    this.passwordInput = this.page.locator("input[name='password']");
    this.dobCalendar = this.page.locator("input[name='dob']");
    this.joiningDateCalendar = this.page.locator("input[name='joiningDate']");
    this.qualificationsDropdown = this.page.locator("#qualifications");
    this.departmentInput = this.page.locator("input[name='department']");
    this.genderDropdown = this.page.locator("#gender");
    this.mobileInput = this.page.locator("input[name='mobileNumber']");
    this.bloodGroupDropdown = this.page.locator("#bloodGroup");
    this.designationInput = this.page.locator("input[name='designation']");
    this.salaryInput = this.page.locator("#salary");
    this.locationInput = this.page.locator("input[name='location']");
    this.reportToDropdown = this.page.locator("#reportingTo");
    this.addButton = this.page.locator("button[type='submit']");
  }

  async addEmployees(
    firstName: string,
    lastName: string,
    empId: string,
    email: string,
    role: string,
    password: string,
    dob: string,
    joiningDate: string,
    qualification: string,
    department: string,
    gender: string,
    mobile: string,
    bloodGroup: string,
    designation: string,
    salary: string,
    location: string,
  ) {
    await this.open_AddEmployee_section();

    await this.enterFirstName(firstName);
    await this.enterLastName(lastName);
    await this.enterEmpID(empId);
    await this.enterEmail(email);
    await this.selectRole(role);
    await this.enterPassword(password);
    await this.enterDOB(dob);
    await this.enterJoinDate(joiningDate);
    await this.selectQualification(qualification);
    await this.enterDepartment(department);
    await this.selectGender(gender);
    await this.enterMobileNumber(mobile);
    await this.selectBloodGroup(bloodGroup);
    await this.enterDesignation(designation);
    await this.enterSalary(salary);
    await this.enterLocation(location);
    await this.select_ReportTo();
    await this.clickAddButton();
  }

  async open_AddEmployee_section(){
    await this.addEmployeeButton.click();
  }

  async enterFirstName(firstName: string){
    await this.firstNameInput.fill(firstName);
  }

  async enterLastName(lastName: string){
    await this.lastNameInput.fill(lastName);
  }

  async enterEmpID(empId: string){
    await this.empIdInput.fill(empId);
  }

  async enterEmail(email: string){
    await this.emailInput.fill(email);
  }

  async selectRole(role: string){
    await this.roleDropdown.selectOption({ label: role });
  }

  async enterPassword(password: string){
    await this.passwordInput.fill(password);
  }

  async enterDOB(dob: string){
    await this.dobCalendar.fill(dob);
  }

  async enterJoinDate(joiningDate: string){
    await this.joiningDateCalendar.fill(joiningDate);
  }

  async selectQualification(qualification: string){
    await this.qualificationsDropdown.selectOption({ label: qualification });
  }

  async enterDepartment(department: string){
    await this.departmentInput.fill(department);
  }

  async selectGender(gender: string){
    await this.genderDropdown.selectOption({ label: gender });
  }

  async enterMobileNumber(mobile: string){
    await this.mobileInput.fill(mobile);
  }

  async selectBloodGroup(bloodGroup: string){
    await this.bloodGroupDropdown.selectOption({ label: bloodGroup });
  }

  async enterDesignation(designation: string){
    await this.designationInput.fill(designation);
  }

  async enterSalary(salary: string){
    await this.salaryInput.fill(salary);
  }

  async enterLocation(location: string){
    await this.locationInput.fill(location);
  }

  async select_ReportTo(){
    await this.reportToDropdown.selectOption({ index: 3 });
  }

  async clickAddButton(){
    await this.addButton.click();
  }
}
