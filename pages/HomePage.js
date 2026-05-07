class HomePage {
  constructor(page) {
    this.page = page;
    this.signupLoginLink = page.locator('li a[href="/login"]');
    this.productsLink = page.locator('li a[href="/products"]');
    this.viewCartLink = page.locator('li a[href="/view_cart"]');
  }

  async goto() {
    await this.page.goto('https://automationexercise.com/');
  }

  async openSignupLogin() {
    await this.signupLoginLink.click();
  }

  async openProducts() {
    await this.productsLink.click();
  }

  async openCart() {
    await this.viewCartLink.click();
  }
}

module.exports = { HomePage };
