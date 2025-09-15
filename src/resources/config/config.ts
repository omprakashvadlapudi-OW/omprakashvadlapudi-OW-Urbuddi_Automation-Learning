
import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  baseURL: process.env.BASE_URL!,
  admin: {
    email: process.env.ADMIN_EMAIL!,
    password: process.env.ADMIN_PASSWORD!,
  },
};
