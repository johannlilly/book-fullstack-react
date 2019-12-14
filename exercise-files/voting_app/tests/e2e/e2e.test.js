module.exports = {
  'step one' : function (browser) {
    browser
      .url('http://localhost:3000/')
      .waitForElementVisible('body', 1000)

      // vote on stuff
      .waitForElementPresent(".item:nth-child(2) i", 1000)
      .click(".item:nth-child(2) i")
      .waitForElementPresent(".item:nth-child(2) i", 1000)
      .click(".item:nth-child(2) i")
      .waitForElementPresent(".item:nth-child(2) i", 1000)
      .click(".item:nth-child(2) i")
      .waitForElementPresent(".item:nth-child(2) i", 1000)
      .click(".item:nth-child(2) i")
      .waitForElementPresent(".item:nth-child(2) i", 1000)
      .click(".item:nth-child(2) i")
      .waitForElementPresent(".item:nth-child(1) i", 1000)
      .click(".item:nth-child(1) i")

      .useXpath()
      .waitForElementPresent("//*[contains(text(), \'Popular Products\')]", 1000)
      .assert.elementPresent("//*[contains(text(), \'Popular Products\')]")
      .waitForElementPresent("//*[contains(text(), \'Tinfoild: Tailored tinfoil hats\')]", 1000)
      .assert.elementPresent("//*[contains(text(), \'Tinfoild: Tailored tinfoil hats\')]")
      .pause(1000)
      .end();
  },

  // 'step two' : function (browser) {
  //   browser
  //     .click('button[name=btnG]')
  //     .pause(1000)
  //     .assert.containsText('#main', 'Night Watch')
  //     .end();
  // }
};
