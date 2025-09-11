import { test, expect, Page } from "@playwright/test";

test.only("Handle multiple unknown tabs", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://demo.automationtesting.in/Windows.html");
  await page.locator("[href='#Multiple']").click();

  const initialPages = context.pages().length;
  await page.click("[onclick='multiwindow()']");
  await page.waitForTimeout(2000);

  const allPages: Page[] = context.pages();
  const newPages = allPages.slice(initialPages); 

  console.log(`Total Tabs Opened: ${newPages.length}`);

  for (const [i, newPage] of newPages.entries()) {
    await newPage.waitForLoadState();
    console.log(`Tab ${i + 1} Title:`, await newPage.title());

    await expect(newPage).not.toHaveTitle("");
  }
  

  await page.waitForTimeout(3000);

  await page.bringToFront();
});
