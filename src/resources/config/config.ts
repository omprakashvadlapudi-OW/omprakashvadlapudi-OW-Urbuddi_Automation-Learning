import * as dotenv from "dotenv";
dotenv.config();

const ENV = process.env.ENV?.toUpperCase() || "DEV";

const baseURLMap: Record<string, string> = {
  DEV: process.env.DEV_URL!,
  UAT: process.env.UAT_URL!,
};

export const config = {
  baseURL: baseURLMap[ENV],
  admin: {
    email: process.env[`${ENV}_ADMIN_EMAIL`],
    password: process.env[`${ENV}_ADMIN_PASSWORD`],
  },
};
