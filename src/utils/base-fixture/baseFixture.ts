import { test as base } from "@playwright/test";
import { DataGenerator } from "../utilities/DataGenerator";
import {config} from "../../resources/config/config"


type TestFixtures = {
  adminCredentials: { email: string; password: string };
  employeeCredentials: { email: string; password: string };
};

export const test = base.extend<TestFixtures>({
  adminCredentials: async ({}, use) => {
    await use(config.admin);
  },

  employeeCredentials: [
    async ({}, use) => {
      const generator = new DataGenerator();
      const creds = generator.getCredentials("empUser");
      console.log("Generated employee creds for this run:", creds);
      await use(creds);
    },
    { scope: "worker"}, 
  ]as any,
});

export { expect } from "@playwright/test";
