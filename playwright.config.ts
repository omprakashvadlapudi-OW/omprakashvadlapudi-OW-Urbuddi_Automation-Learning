import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config({ path: ".env" });

const browserName = process.env.BROWSER?.toLowerCase() || null;

const allProjects = [
  {
    name: "setup chromium",
    use: { ...devices['Desktop Chrome'] },
    testMatch: ["**/tests/Admin-Management/addEmp_FunctionalityUB.spec.ts"],
  },
  {
    name: "setup firefox",
    use: { ...devices['Desktop Firefox'] },
    testMatch: ["**/tests/Admin-Management/addEmp_FunctionalityUB.spec.ts"],
  },
  {
    name: "setup webkit",
    use: { ...devices['Desktop Safari'] },
    testMatch: ["**/tests/Admin-Management/addEmp_FunctionalityUB.spec.ts"],
  },
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'], storageState: "src/resources/storage/adminState.json" },
    dependencies: ["setup chromium"],
    testIgnore: ["**/tests/Admin-Management/addEmp_FunctionalityUB.spec.ts"],
  },
  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'], storageState: "src/resources/storage/adminState.json" },
    dependencies: ["setup firefox"],
    testIgnore: ["**/tests/Admin-Management/addEmp_FunctionalityUB.spec.ts"],
  },
  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'], storageState: "src/resources/storage/adminState.json" },
    dependencies: ["setup webkit"],
    testIgnore: ["**/tests/Admin-Management/addEmp_FunctionalityUB.spec.ts"],
  },
];

// Filter projects based on BROWSER env
const projects = browserName
  ? allProjects.filter(p => p.name.toLowerCase().includes(browserName))
  : allProjects;

export default defineConfig({
  globalTimeout: 60000,
  globalSetup: require.resolve("./src/main/setups/admin.global"),
  testDir: './src/main/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['html'], ['list'], ['allure-playwright', { outputFolder: 'allure-results' }]],
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on',
    screenshot: 'on',
    video: 'on',
  },
  projects,
});
