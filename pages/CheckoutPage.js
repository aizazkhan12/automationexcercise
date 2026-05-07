class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.messageBox = page.locator('textarea[name="message"]');
    this.placeOrderLink = page.locator('a[href="/payment"]');
  }

  async addCommentAndGoToPayment(message) {
    await this.messageBox.fill(message);
    await this.placeOrderLink.click();
  }
}

module.exports = { CheckoutPage };
