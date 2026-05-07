const { test, expect } = require('@playwright/test');
const fs = require('fs');

const { randomEmail } = require('../utils/data');
const { downloadFileByClick } = require('../utils/downloadHelper');

const { HomePage } = require('../pages/HomePage');
const { AuthPage } = require('../pages/AuthPage');
const { SignupPage } = require('../pages/SignupPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { PaymentPage } = require('../pages/PaymentPage');

test('automation (POM)', async ({ page }) => {
  const email = randomEmail();

  const home = new HomePage(page);
  const auth = new AuthPage(page);
  const signup = new SignupPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);
  const payment = new PaymentPage(page);

  await home.goto();
  await home.openSignupLogin();

  await auth.startSignup('aizaz', email);

  await signup.fillAccountInfo({
    password: 'aizaz123',
    day: 10,
    month: 1,
    year: 2001,
    subscribeNewsletter: true,
  });

  await signup.fillAddressInfo({
    firstName: 'Aizaz Ali',
    lastName: 'Khan',
    company: 'Centric',
    address:
      'Office No. 1318, 13th Floor, Shahra-e-Faisal, Karachi Cantonment Fowler Lines, Karachi',
    country: 'Canada',
    state: 'Ontario',
    city: 'Milton',
    zipcode: '75300',
    mobile: '03149880311',
  });

  await signup.createAccountAndContinue();

  await home.openProducts();
  await products.addFirstProductToCart();

  await home.openCart();
  await cart.proceedCheckout();

  await checkout.addCommentAndGoToPayment('This is the automation Testing');

  await payment.pay({
    nameOnCard: 'Aizaz Ali Khan',
    cardNumber: '5425233430109903',
    cvc: '599',
    expiryMonth: '03',
    expiryYear: '2030',
  });

  const downloadDir = 'C:\\Users\\aizaz\\Downloads\\PlayWrightAutomation\\invoivce';

  const filePath = await downloadFileByClick(
    page,
    () => payment.clickDownloadInvoice(),
    downloadDir,
    30000
  );

  console.log(`✅ Invoice downloaded successfully at: ${filePath}`);
  expect(fs.existsSync(filePath)).toBeTruthy();

  await payment.clickContinue();
});
