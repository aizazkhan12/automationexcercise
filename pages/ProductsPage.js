class ProductsPage {
  constructor(page) {
    this.page = page;

    this.firstAddToCart = page.locator('.add-to-cart').first();
    this.continueShoppingBtn = page.locator('.btn-block'); // your current locator
  }

  async addFirstProductToCart() {
    await this.firstAddToCart.click();
    await this.continueShoppingBtn.click();
  }
}

module.exports = { ProductsPage };
