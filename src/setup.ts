import dotenv from "dotenv";

const envFile: string = process.env.NODE_ENV === "test" ? ".env.test": ".env";

dotenv.config({
    path: envFile
});