class PaymentPage {
  constructor(page) {
    this.page = page;

    this.nameOnCard = page.locator('input[name="name_on_card"]');
    this.cardNumber = page.locator('input[name="card_number"]');
    this.cvc = page.locator('input[name="cvc"]');
    this.expiryMonth = page.locator('input[name="expiry_month"]');
    this.expiryYear = page.locator('input[name="expiry_year"]');

    this.payBtn = page.locator('button[data-qa="pay-button"]');

    this.downloadInvoiceBtn = page.getByText('Download Invoice');
    this.continueAfterInvoiceBtn = page.getByText('Continue');
  }

  async pay({ nameOnCard, cardNumber, cvc, expiryMonth, expiryYear }) {
    await this.nameOnCard.fill(nameOnCard);
    await this.cardNumber.fill(cardNumber);
    await this.cvc.fill(cvc);
    await this.expiryMonth.fill(expiryMonth);
    await this.expiryYear.fill(expiryYear);

    await this.payBtn.click();
  }

  async clickDownloadInvoice() {
    await this.downloadInvoiceBtn.click();
  }

  async clickContinue() {
    await this.continueAfterInvoiceBtn.click();
  }
}

module.exports = { PaymentPage };
