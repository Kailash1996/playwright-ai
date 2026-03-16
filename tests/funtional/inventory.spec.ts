import { test, expect } from "@playwright/test";

/**
 * scenario
 * 1. login
 * 2. list of product witjh price
 * 3. assert all the products are listed with nn zero price
 */

test.describe("Inventory list", () => {
  test.beforeEach("login", async ({ page }) => {
   await page.goto('https://www.saucedemo.com/');
  await expect(page.locator('#root')).toContainText('Swag Labs');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="title"]')).toContainText('Products');
  await expect(page).toHaveURL(/.*\/inventory/)
  });
  test("inventory with nonzero price", async ({ page }) => {

     let productele =  page.locator(".inventory_item")
     await expect(productele).toHaveCount(6);

     let totalProducts = await productele.count()
     console.log(totalProducts)

     let priceArr = []
     for (let i=0; i < totalProducts; i++){
        let eleNode = productele.nth(i)
        let productName = await eleNode.locator(".inventory_item_name").innerText()
        let productPrice = await eleNode.locator(".inventory_item_price").innerText()

        console.log(`Products: ${productName},Price: ${productPrice}`)
        priceArr.push(productPrice)

     }

     console.log(`Prices:${priceArr}` )

     let pricearraynum = priceArr.map((item)=>parseFloat(item.replace("$","")))
     console.log(`onlunum:${pricearraynum}`)

     let invalidprice = pricearraynum.filter((item)=>item<=0)

     if(invalidprice.length > 0){
        console.log(`error zero prices: ${invalidprice}`)
     }
     else{
        console.log(`No errors:`)
     }
  });

  
});
