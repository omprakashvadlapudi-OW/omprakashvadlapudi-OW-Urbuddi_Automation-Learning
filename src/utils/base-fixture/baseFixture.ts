import { test as base } from "@playwright/test";
import {config} from "../../resources/config/config"


type TestFixtures = {
  adminCredentials: { email: string; password: string };
};

export const test = base.extend<TestFixtures>({
  adminCredentials: async ({}, use) => {
    await use(config.admin);
  },

});

export { expect } from "@playwright/test";
