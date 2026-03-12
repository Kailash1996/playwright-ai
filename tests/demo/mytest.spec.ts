import { test, expect } from "@playwright/test";

test("new Title assertion", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await expect(page).toHaveTitle("CURA Healthcare Service");
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
});

//test("test funtion",{tag:"@smoke, @regression"},async({page}, testinfo)=>{
//  //steps..
// })

test.only("locator demo", async ({ page }, testinfo) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  let makeappbtn =  page.getByRole("link", { name: "Make Appointment" })
  await makeappbtn.click();
  await expect(page.getByText("Please login to make")).toBeVisible();
});
