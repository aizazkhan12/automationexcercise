class CartPage {
  constructor(page) {
    this.page = page;

    this.proceedToCheckout = page.getByText('Proceed To Checkout');
  }

  async proceedCheckout() {
    await this.proceedToCheckout.click();
  }
}

module.exports = { CartPage };
