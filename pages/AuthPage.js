class AuthPage {
  constructor(page) {
    this.page = page;

    this.nameInput = page.getByPlaceholder('Name');
    this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
    this.signupBtn = page.locator('button[data-qa="signup-button"]');
  }

  async startSignup(name, email) {
    await this.nameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupBtn.click();
  }
}

module.exports = { AuthPage };
