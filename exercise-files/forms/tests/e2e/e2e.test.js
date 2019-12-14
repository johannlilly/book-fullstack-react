/*==============================================================================*/
/* Nightwatch Recorder generated Thu Aug 25 2016 10:49:53 GMT-0700 (PDT) */
/*==============================================================================*/

module.exports = {
  "forms test case": function(client) {
    return (
      client
        .pause(3000)
        .resizeWindow(1024, 636)
        .url("http://localhost:3000/")
        .waitForElementVisible("body", 10000)
        .useXpath()

        // 01
        .waitForElementPresent("//a[normalize-space(text())='01-basic-button']")
        .click("//a[normalize-space(text())='01-basic-button']")
        .useCss()
        .waitForElementPresent("button[value='great']")
        .click("button[value='great']")
        .waitForElementPresent("button[value='amazing']")
        .click("button[value='amazing']")
        .useXpath()
        .waitForElementPresent("//a[normalize-space(text())='TOC']")
        .click("//a[normalize-space(text())='TOC']")

        // 02
        .waitForElementPresent("//a[normalize-space(text())='02-basic-button']")
        .click("//a[normalize-space(text())='02-basic-button']")
        .useCss()
        .waitForElementPresent("button[value='great']")
        .click("button[value='great']")
        .waitForElementPresent("button[value='amazing']")
        .click("button[value='amazing']")
        .useXpath()
        .waitForElementPresent("//a[normalize-space(text())='TOC']")
        .click("//a[normalize-space(text())='TOC']")

      // 03
      // .waitForElementPresent("//a[normalize-space(text())='03-basic-input']")
      // .click("//a[normalize-space(text())='03-basic-input']")
      // .waitForElementPresent("/html/body/div[11]/div/div[1]/form/input[1]")
      // .click("/html/body/div[11]/div/div[1]/form/input[1]")
      // .waitForElementPresent("/html/body/div[11]/div/div[1]/form/input[1]")
      // .setValue("/html/body/div[11]/div/div[1]/form/input[1]", "nate")
      // .useCss()
      // .waitForElementPresent("input[type='Submit']")
      // .click("input[type='Submit']")
      // /* submit form */
      // .useXpath()
      // .waitForElementPresent("//a[normalize-space(text())='TOC']")
      // .click("//a[normalize-space(text())='TOC']")

      // 04
      // .waitForElementPresent("//a[normalize-space(text())='04-basic-input']")
      // .click("//a[normalize-space(text())='04-basic-input']")

      // // enter david in the form
      // .waitForElementPresent("/html/body/div[11]/div/div[1]/form/input[1]")
      // .click("/html/body/div[11]/div/div[1]/form/input[1]")
      // .setValue("/html/body/div[11]/div/div[1]/form/input[1]", "david")
      // .click("/html/body/div[11]/div/div[1]/form/input[2]")

      // // enter ari in the form
      // .waitForElementPresent("/html/body/div[11]/div/div[1]/form/input[1]")
      // .click("/html/body/div[11]/div/div[1]/form/input[1]")
      // .setValue("/html/body/div[11]/div/div[1]/form/input[1]", "ari")
      // .click("/html/body/div[11]/div/div[1]/form/input[2]")

      // /* submit form */
      // .waitForElementPresent("//a[normalize-space(text())='TOC']")
      // .click("//a[normalize-space(text())='TOC']")

      // // 05
      // .waitForElementPresent("//a[normalize-space(text())='05-state-input']")
      // .click("//a[normalize-space(text())='05-state-input']")

      // // enter anthony in the form
      // .waitForElementPresent("/html/body/div[11]/div/div[1]/form/input[1]")
      // .click("/html/body/div[11]/div/div[1]/form/input[1]")
      // .setValue("/html/body/div[11]/div/div[1]/form/input[1]", "anthony")
      // .click("/html/body/div[11]/div/div[1]/form/input[2]")

      // // enter ari in the form
      // .waitForElementPresent("/html/body/div[11]/div/div[1]/form/input[1]")
      // .click("/html/body/div[11]/div/div[1]/form/input[1]")
      // .setValue("/html/body/div[11]/div/div[1]/form/input[1]", "ari")
      // .click("/html/body/div[11]/div/div[1]/form/input[2]")

      // .waitForElementPresent("//a[normalize-space(text())='TOC']")
      // .click("//a[normalize-space(text())='TOC']")

      // // 06
      // .waitForElementPresent(
      //   "//a[normalize-space(text())='06-state-input-multi']"
      // )
      // .click("//a[normalize-space(text())='06-state-input-multi']")
      // .useCss()
      // .waitForElementPresent("form input[name='name']")
      // .click("form input[name='name']")
      // .waitForElementPresent("input[name='name']")
      // .clearValue("input[name='name']")
      // .setValue("input[name='name']", "nate")
      // .waitForElementPresent("input[name='email']")
      // .clearValue("input[name='email']")
      // .setValue("input[name='email']", "foobar")
      // .waitForElementPresent("input[type='submit']")
      // .click("input[type='submit']")
      // /* submit form */
      // .waitForElementPresent("input[name='name']")
      // .clearValue("input[name='name']")
      // .setValue("input[name='name']", "david")
      // .waitForElementPresent("input[name='email']")
      // .clearValue("input[name='email']")
      // .setValue("input[name='email']", "baz")
      // .click("input[type='submit']")
      // /* submit form */
      // .useXpath()
      // .waitForElementPresent("//a[normalize-space(text())='TOC']")
      // .click("//a[normalize-space(text())='TOC']")

      // // 07
      // .waitForElementPresent(
      //   "//a[normalize-space(text())='07-basic-validation']"
      // )
      // .click("//a[normalize-space(text())='07-basic-validation']")
      // .useCss()
      // .waitForElementPresent("form input[name='name']")
      // .click("form input[name='name']")
      // .waitForElementPresent("input[name='name']")
      // .clearValue("input[name='name']")
      // .setValue("input[name='name']", "nate")
      // .waitForElementPresent("input[name='email']")
      // .clearValue("input[name='email']")
      // .setValue("input[name='email']", "baz")
      // .waitForElementPresent("input[type='submit']")
      // .click("input[type='submit']")
      // // assert validation failed message TODO
      // /* submit form */
      // .waitForElementPresent("form input[name='email']")
      // .click("form input[name='email']")
      // .waitForElementPresent("input[name='email']")
      // .clearValue("input[name='email']")
      // .setValue("input[name='email']", "nate@foo.com")
      // .click("input[type='submit']")
      // /* submit form */
      // .waitForElementPresent("input[name='name']")
      // .clearValue("input[name='name']")
      // .setValue("input[name='name']", "davodid")
      // .waitForElementPresent("input[name='email']")
      // .clearValue("input[name='email']")
      // .setValue("input[name='email']", "david@js.la")
      // .click("input[type='submit']")
      // /* submit form */
      // .useXpath()
      // .waitForElementPresent("//a[normalize-space(text())='TOC']")
      // .click("//a[normalize-space(text())='TOC']")

      // // 08
      // .waitForElementPresent(
      //   "//a[normalize-space(text())='08-field-component-form']"
      // )
      // .click("//a[normalize-space(text())='08-field-component-form']")
      // .useCss()
      // .waitForElementPresent("input[Placeholder='Name']")
      // .click("input[Placeholder='Name']")
      // .waitForElementPresent("div:nth-child(13) form div:nth-child(1) input")
      // .clearValue("div:nth-child(13) form div:nth-child(1) input")
      // .setValue("div:nth-child(13) form div:nth-child(1) input", "anthony")
      // .waitForElementPresent("div:nth-child(13) form div:nth-child(3) input")
      // .clearValue("div:nth-child(13) form div:nth-child(3) input")
      // .setValue(
      //   "div:nth-child(13) form div:nth-child(3) input",
      //   "acco@mazzo.com"
      // )
      // .waitForElementPresent("input[type='submit']")
      // .click("input[type='submit']")
      // /* submit form */
      // .click("input[Placeholder='Name']")
      // .waitForElementPresent("div:nth-child(13) form div:nth-child(1) input")
      // .clearValue("div:nth-child(13) form div:nth-child(1) input")
      // .setValue("div:nth-child(13) form div:nth-child(1) input", "david")
      // .waitForElementPresent("div:nth-child(13) form div:nth-child(3) input")
      // .clearValue("div:nth-child(13) form div:nth-child(3) input")
      // .setValue(
      //   "div:nth-child(13) form div:nth-child(3) input",
      //   "david@mazzo.com"
      // )
      // .waitForElementPresent("input[type='submit']")
      // .click("input[type='submit']")
      // /* submit form */
      // .useXpath()
      // .waitForElementPresent("//a[normalize-space(text())='TOC']")
      // .click("//a[normalize-space(text())='TOC']")

      // // 09
      // .waitForElementPresent("//a[normalize-space(text())='09-async-fetch']")
      // .click("//a[normalize-space(text())='09-async-fetch']")
      // .useCss()

      // .waitForElementPresent("input[Placeholder='Name']")
      // .click("input[Placeholder='Name']")
      // .clearValue("div:nth-child(13) form div:nth-child(1) input")
      // .setValue("div:nth-child(13) form div:nth-child(1) input", "nate")
      // .waitForElementPresent("div:nth-child(13) form div:nth-child(3) input")
      // .clearValue("div:nth-child(13) form div:nth-child(3) input")
      // .setValue(
      //   "div:nth-child(13) form div:nth-child(3) input",
      //   "nate@natemurray.com"
      // )

      // .waitForElementPresent("select")
      // .click("select")
      // .pause(1000)
      // .click('option[value="core"]') //selects the option but doesn't click
      // .pause(500)
      // .keys(["\uE015", "\uE006"]) // hits enter

      // .pause(1000)
      // .click('option[value="javascripting"]') //selects the option but doesn't click
      // .pause(500)
      // .keys(["\uE015", "\uE006"]) // hits enter
      // .waitForElementPresent("input[type='submit']")
      // .click("input[type='submit']")

      // /* submit form */

      // .clearValue("div:nth-child(13) form div:nth-child(1) input")
      // .setValue("div:nth-child(13) form div:nth-child(1) input", "david")
      // .waitForElementPresent("div:nth-child(13) form div:nth-child(3) input")
      // .clearValue("div:nth-child(13) form div:nth-child(3) input")
      // .setValue(
      //   "div:nth-child(13) form div:nth-child(3) input",
      //   "david@guttman.com"
      // )

      // .waitForElementPresent("select")
      // .click("select")
      // .pause(1000)
      // .click('option[value="electives"]') //selects the option but doesn't click
      // .pause(500)
      // .keys(["\uE015", "\uE006"]) // hits enter

      // .pause(1000)
      // .click('option[value="learn-sass"]') //selects the option but doesn't click
      // .pause(500)
      // .keys(["\uE015", "\uE006"]) // hits enter
      // .waitForElementPresent("input[type='submit']")
      // .click("input[type='submit']")
      // .pause(2000)

      // .useXpath()
      // .waitForElementPresent("//a[normalize-space(text())='TOC']")
      // .click("//a[normalize-space(text())='TOC']")

      // // 10
      // .waitForElementPresent(
      //   "//a[normalize-space(text())='10-remote-persist']"
      // )
      // .click("//a[normalize-space(text())='10-remote-persist']")
      // .useCss()
      // .waitForElementPresent("input[Placeholder='Name']")
      // .click("input[Placeholder='Name']")
      // .clearValue("div:nth-child(13) form div:nth-child(1) input")
      // .setValue("div:nth-child(13) form div:nth-child(1) input", "nate")
      // .waitForElementPresent("div:nth-child(13) form div:nth-child(3) input")
      // .clearValue("div:nth-child(13) form div:nth-child(3) input")
      // .setValue(
      //   "div:nth-child(13) form div:nth-child(3) input",
      //   "nate@natemurray.com"
      // )

      // .waitForElementPresent("select")
      // .click("select")
      // .pause(1000)
      // .click('option[value="core"]') //selects the option but doesn't click
      // .pause(500)
      // .keys(["\uE015", "\uE006"]) // hits enter

      // .pause(1000)
      // .click('option[value="javascripting"]') //selects the option but doesn't click
      // .pause(500)
      // .keys(["\uE015", "\uE006"]) // hits enter
      // .waitForElementPresent("input[type='submit']")
      // .click("input[type='submit']")

      // /* submit form */

      // .clearValue("div:nth-child(13) form div:nth-child(1) input")
      // .setValue("div:nth-child(13) form div:nth-child(1) input", "david")
      // .waitForElementPresent("div:nth-child(13) form div:nth-child(3) input")
      // .clearValue("div:nth-child(13) form div:nth-child(3) input")
      // .setValue(
      //   "div:nth-child(13) form div:nth-child(3) input",
      //   "david@guttman.com"
      // )

      // .waitForElementPresent("select")
      // .click("select")
      // .pause(1000)
      // .click('option[value="electives"]') //selects the option but doesn't click
      // .pause(500)
      // .keys(["\uE015", "\uE006"]) // hits enter

      // .pause(1000)
      // .click('option[value="learn-sass"]') //selects the option but doesn't click
      // .pause(500)
      // .keys(["\uE015", "\uE006"]) // hits enter
      // .pause(1000)

      // .waitForElementPresent("input[type='submit']")
      // .click("input[type='submit']")
      // .pause(2000)

      // .useXpath()
      // .waitForElementPresent("//a[normalize-space(text())='TOC']")
      // .click("//a[normalize-space(text())='TOC']")

      // // 11
      // .waitForElementPresent("//a[normalize-space(text())='11-redux-app']")
      // .click("//a[normalize-space(text())='11-redux-app']")
      // .useCss()
      // .waitForElementPresent("input[Placeholder='Name']")
      // .click("input[Placeholder='Name']")
      // .clearValue("div:nth-child(13) form div:nth-child(1) input")
      // .setValue("div:nth-child(13) form div:nth-child(1) input", "nate")
      // .waitForElementPresent("div:nth-child(13) form div:nth-child(3) input")
      // .clearValue("div:nth-child(13) form div:nth-child(3) input")
      // .setValue(
      //   "div:nth-child(13) form div:nth-child(3) input",
      //   "nate@natemurray.com"
      // )

      // .waitForElementPresent("select")
      // .click("select")
      // .pause(1000)
      // .click('option[value="core"]') //selects the option but doesn't click
      // .pause(500)
      // .keys(["\uE015", "\uE006"]) // hits enter

      // .pause(1000)
      // .click('option[value="javascripting"]') //selects the option but doesn't click
      // .pause(500)
      // .keys(["\uE015", "\uE006"]) // hits enter
      // .waitForElementPresent("input[type='submit']")
      // .click("input[type='submit']")

      // /* submit form */

      // .clearValue("div:nth-child(13) form div:nth-child(1) input")
      // .setValue("div:nth-child(13) form div:nth-child(1) input", "david")
      // .waitForElementPresent("div:nth-child(13) form div:nth-child(3) input")
      // .clearValue("div:nth-child(13) form div:nth-child(3) input")
      // .setValue(
      //   "div:nth-child(13) form div:nth-child(3) input",
      //   "david@guttman.com"
      // )

      // .waitForElementPresent("select")
      // .click("select")
      // .pause(1000)
      // .click('option[value="electives"]') //selects the option but doesn't click
      // .pause(500)
      // .keys(["\uE015", "\uE006"]) // hits enter

      // .pause(1000)
      // .click('option[value="learn-sass"]') //selects the option but doesn't click
      // .pause(500)
      // .keys(["\uE015", "\uE006"]) // hits enter
      // .pause(1000)

      // .waitForElementPresent("input[type='submit']")
      // .click("input[type='submit']")
      // .pause(2000)

      // .useXpath()
      // .waitForElementPresent("//a[normalize-space(text())='TOC']")
      // .click("//a[normalize-space(text())='TOC']")

      // .pause(1000)
      // .end()
    );
  }
};
