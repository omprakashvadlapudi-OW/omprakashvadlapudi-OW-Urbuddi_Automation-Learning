import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';



dotenv.config({path:".env"});

export default defineConfig({
  timeout: 60000, 
  globalSetup: require.resolve("./src/main/setups/admin.global"),
  testDir: './src/main/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['html'],['list']],
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'on',
    video:'retain-on-failure',
    //storageState: 'src/resources/storage/adminState.json',
  },
  projects: [
     {
      name: "setup",
      testMatch: ["**/tests/Admin-Management/addEmp_FunctionalityUB.spec.ts"],
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        
        storageState: "src/resources/storage/adminState.json"
       },
       dependencies: ["setup"],
       testIgnore: ["**/tests/Admin-Management/addEmp_FunctionalityUB.spec.ts"],
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] ,
         storageState: "src/resources/storage/adminState.json"
      },
      dependencies: ["setup"],
      testIgnore: ["**/tests/Admin-Management/addEmp_FunctionalityUB.spec.ts"],
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testIgnore: ["**/tests/Admin-Management/addEmp_FunctionalityUB.spec.ts"],
    },

  ],

 
});
