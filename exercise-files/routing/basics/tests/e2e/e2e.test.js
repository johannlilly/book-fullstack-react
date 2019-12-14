module.exports = {
  before: function(client) {
    console.log('App takes a little while to boot. Waiting for 30 seconds ...')
    client.pause(30000).resizeWindow(1024, 636);
  },

  // The links route to /atlantic and /pacific, but no components
  // are rendered. And they are not controlled by router
  "./App.js": function(client) {
    client
      .url("http://localhost:3000/?app_slug=App")
      .waitForElementVisible("body", 10000)

    client.assert
      .containsText(".text.container", "Which body of water?")
      .click("a")
      .waitForElementVisible("body", 10000)
      .assert.urlContains("/atlantic");
  },

  // Now we are rendering a component for /atlantic
  // But any clicks will cause the browser to visit the link
  "./complete/App-1.js": function(client) {
    client
      .url("http://localhost:3000/atlantic?app_slug=App-1")
      .waitForElementVisible("body", 10000)
      // component should be present
      .assert.containsText("h3", "Atlantic Ocean");
  },

  // Now, we're pushing to browser history so everything works
  "./complete/App-2.js": function(client) {
    client
      .url("http://localhost:3000/atlantic?app_slug=App-2")
      .waitForElementVisible("body", 10000)
      .assert.containsText("h3", "Atlantic Ocean")
      .click("li:nth-child(2) > a")
      .assert.containsText("h3", "Pacific Ocean")
      .assert.urlContains("/pacific");
  },

  // All changes are under the hood -- we just added our own Router component
  "./complete/App-3.js": function(client) {
    client
      .url("http://localhost:3000/atlantic?app_slug=App-3")
      .waitForElementVisible("body", 10000)
      .assert.containsText("h3", "Atlantic Ocean")
      .assert.urlContains("/atlantic")
      .click("li:nth-child(2) > a")
      .assert.containsText("h3", "Pacific Ocean")
      .assert.urlContains("/pacific");
  },

  // black-sea added which redirects to '/' after a delay
  "./complete/App-4.js": function(client) {
    client
      .url("http://localhost:3000/?app_slug=App-4")
      .waitForElementVisible("body", 10000)
      .assert.containsText("li:nth-child(3)", "/black-sea")
      // Verify pacific still works OK
      .click("li:nth-child(2) > a")
      .assert.containsText("h3", "Pacific Ocean")
      .assert.urlContains("/pacific")
      // Click on black-sea
      .click("li:nth-child(3) > a")
      .assert.containsText("h3", "Black Sea")
      .assert.urlContains("/black-sea")
      // ensure countdown is happening
      .pause(1000)
      .assert.urlContains("/black-sea")
      // wait for redirect
      .pause(4000)
      .assert.urlContains("/");
  },

  // Displays a welcome on every page
  // Also adds another /atlantic component
  "./complete/App-5.js": function(client) {
    client
      .url("http://localhost:3000/?app_slug=App-5")
      .waitForElementVisible("body", 10000)
      .assert.containsText(
        "h3",
        "Welcome! Select a body of saline water above."
      )
      .url("http://localhost:3000/atlantic/ocean?app_slug=App-5")
      .waitForElementVisible("body", 10000)
      .assert.containsText("h3", "Atlantic Ocean")
      .expect.element(".text.container")
      .text.to.match(/Welcome\!/) // message is still here
      // this one is here
      client.expect.element(".text.container").text.to.match(/The Pond/)
      // but so is the orig one!
      client.expect.element(".text.container").text.to.match(/surface of the earth/)
  },

  // Displays a welcome only on '/'
  "./complete/App-6.js": function(client) {
    client
      .url("http://localhost:3000/atlantic?app_slug=App-6")
      .waitForElementVisible("body", 10000)

    client.assert.urlContains("/atlantic");
    client.assert.containsText("h3", "Atlantic Ocean");
    // Welcome should not be displayed on /Atlantic
    client.expect.element(".text.container").text.to.not.match(/Welcome\!/);

    client
      .click("li:nth-child(3) > a")
      .assert.containsText("h3", "Black Sea")
      .assert.urlContains("/black-sea")
      .pause(4000)
      // after redirect, verify that welcome is displayed
      .assert.urlContains("/");

    client.expect.element(".text.container").text.to.match(/Welcome\!/);
  },

  // Displays a component on "miss"
  "./complete/App-7.js": function(client) {
    client
      .url("http://localhost:3000/atlantic?app_slug=App-7")
      .waitForElementVisible("body", 10000)
      .assert.containsText("h3", "Atlantic Ocean")
      .assert.urlContains("/atlantic")
      .expect.element(".text.container").text.to.not.match(/The Pond/)
    client
      .url("http://localhost:3000/atlantic/ocean?app_slug=App-7")
      .waitForElementVisible("body", 10000)
      .expect.element("h3").text.to.match(/Atlantic Ocean .* Again/)
    client
      .expect.element(".text.container").text.to.match(/The Pond/)
    client
      .expect.element(".text.container").text.to.not.match(/surface of the earth/)
    client
      .click("li:nth-child(2) > a")
    client
      .assert.containsText("h3", "Pacific Ocean")
      .assert.urlContains("/pacific")
      // then visit non-existent URL
    client
      .url("http://localhost:3000/does/not/exist?app_slug=App-7")
      .waitForElementVisible("body", 10000)
      // we have to select App-7 again

    client.expect.element("h3").text.to.match(/Error\!/);

    client.end();
  }
};
