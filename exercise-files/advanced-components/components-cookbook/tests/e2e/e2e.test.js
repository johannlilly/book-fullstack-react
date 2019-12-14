module.exports = {
  "step one": function(browser) {
    browser
      .pause(5000)
      .url("http://localhost:6060/")
      .waitForElementVisible("body", 10000)
      .useXpath()

      .waitForElementPresent("//a[normalize-space(text())='Messages']", 10000)
      .click("//a[normalize-space(text())='Messages']")
      .waitForElementPresent("//a[normalize-space(text())='SimpleInput']", 1000)
      .click("//a[normalize-space(text())='SimpleInput']")
      .waitForElementPresent("//a[normalize-space(text())='SpreadSheet']", 1000)
      .click("//a[normalize-space(text())='SpreadSheet']")
      .waitForElementPresent("//a[normalize-space(text())='Switch']", 1000)
      .click("//a[normalize-space(text())='Switch']")

      .assert.elementPresent("//*[contains(text(), 'Pay with:')]")

      .assert.elementPresent("//*[contains(text(), 'Paying with:')]")
      .waitForElementPresent("//a[normalize-space(text())='Weather']", 1000)
      .click("//a[normalize-space(text())='Weather']")

      .useCss()
      .waitForElementPresent("button", 3000)
      .click("button")

      .useXpath()
      .waitForElementPresent("//a[normalize-space(text())='Wizard']", 1000)
      .click("//a[normalize-space(text())='Wizard']")

      .pause(1000)
      .end();
  }
};
