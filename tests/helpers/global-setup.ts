import { type FullConfig } from "playwright/test";
import * as path from "path";
import fs from "fs";

export default async function globalSetup(config: FullConfig) {

console.log(`[info]: STarted the Global setup`)
  if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
    console.log(`[info]: detecting the local runs`);

    const resultsDir = path.resolve(process.cwd(), "allure-results");
    console.log(`>>resultsDir: ${resultsDir}`);
    if (fs.existsSync(resultsDir)) {
      fs.rmSync(resultsDir, { recursive: true, force: true });
    }
  }
}
