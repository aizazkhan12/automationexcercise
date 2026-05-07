const {test, expect} = require('@playwright/test');

test('First test', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
    await context.close();
}

);

test('Second test', async ({page})=>
    {
        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
        await page.locator('#username').fill('rahulshettyacademy');
        await page.locator('#password').fill('Learning@830$3mK2');
        await page.locator('#terms').click();
        await page.locator('#signInBtn').click();
        

        
    }
    
    );


    