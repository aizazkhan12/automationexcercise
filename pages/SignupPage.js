class SignupPage {
  constructor(page) {
    this.page = page;

    this.genderMr = page.locator('#id_gender1');
    this.password = page.locator('input[data-qa="password"]');

    this.days = page.locator('[data-qa="days"]');
    this.months = page.locator('[data-qa="months"]');
    this.years = page.locator('[data-qa="years"]');

    this.newsletter = page.locator('#newsletter');

    this.firstName = page.locator('input[data-qa="first_name"]');
    this.lastName = page.locator('input[data-qa="last_name"]');
    this.company = page.locator('input[data-qa="company"]');
    this.address = page.locator('input[data-qa="address"]');

    this.country = page.locator('[data-qa="country"]');
    this.state = page.locator('input[data-qa="state"]');
    this.city = page.locator('input[data-qa="city"]');
    this.zipcode = page.locator('input[data-qa="zipcode"]');
    this.mobile = page.locator('input[data-qa="mobile_number"]');

    this.createAccountBtn = page.locator('button[data-qa="create-account"]');
    this.continueBtn = page.locator('a[data-qa="continue-button"]');
  }

  async fillAccountInfo({ password, day, month, year, subscribeNewsletter = true }) {
    await this.genderMr.click();
    await this.password.fill(password);

    await this.days.selectOption(String(day));
    await this.months.selectOption(String(month));
    await this.years.selectOption(String(year));

    if (subscribeNewsletter) {
      await this.newsletter.click();
    }
  }

  async fillAddressInfo({
    firstName,
    lastName,
    company,
    address,
    country,
    state,
    city,
    zipcode,
    mobile,
  }) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.company.fill(company);
    await this.address.fill(address);

    
    await this.country.selectOption({ label: country });

    await this.state.fill(state);
    await this.city.fill(city);
    await this.zipcode.fill(zipcode);
    await this.mobile.fill(mobile);
  }

  async createAccountAndContinue() {
    await this.createAccountBtn.click();
    await this.continueBtn.click();
  }
}

module.exports = { SignupPage };
