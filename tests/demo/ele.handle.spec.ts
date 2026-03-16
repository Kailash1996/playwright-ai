import { test, expect } from "@playwright/test";
test.describe("make appointment scenarios", () => {
  test.beforeEach("Go to the Login page ", async ({ page }) => {
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
    // Button click types
    //await page.getByRole("link", { name: "Make Appointment" }).click();
    await page.getByRole("link", { name: "Make Appointment" }).press("Enter");
    await expect(page.getByText("Please login to make")).toBeVisible();
    await page.getByText("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "login" }).click();
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });
  test("making appointment", async ({ page }) => {
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await page.getByRole("link", { name: "Make Appointment" }).click();
    //Drop down handling
    //  await expect (
    //   page.getByLabel("Facility")).toHaveValue("Hongkong CURA Healthcare Center");

    //asserthe default value of the dropdown
    let facilityOptions = await page.getByLabel("Facility").locator("option");
        await expect(facilityOptions).toHaveCount(3);

    let listOfOptions = await facilityOptions.allTextContents();
    console.log(listOfOptions);
  
    await page
      .getByLabel("Facility")
      .selectOption("Hongkong CURA Healthcare Center");
    await page
      .getByRole("checkbox", { name: "Apply for hospital readmission" })
      .check();
    await page.getByRole("radio", { name: "Medicaid" }).check();
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
    await page
      .getByRole("textbox", { name: "Visit Date (Required)" })
      .fill("05/10/2026");
    await page
      .getByRole("textbox", { name: "Visit Date (Required)" })
      .press("Enter");

    await page
      .getByRole("textbox", { name: "Comment" })
      .fill("new commect\ncdcsdcvsdvsdv");
    await page.getByRole("button", { name: "Book Appointment" }).click();
    await expect(page.locator("#summary")).toContainText(
      "Please be informed that your appointment has been booked as following:",
    );
    await expect(page.locator("#summary")).toContainText("Go to Homepage");
  });
});
