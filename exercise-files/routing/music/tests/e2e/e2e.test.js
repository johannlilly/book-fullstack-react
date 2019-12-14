function assertVerticalMenuPresent(client) {
  client.assert
    .containsText(".vertical.menu > a:nth-of-type(1)", "Daydream Nation")
    .assert.containsText(".vertical.menu > a:nth-of-type(2)", "Remain In Light")
    .assert.containsText(".vertical.menu > a:nth-of-type(3)", "Paul's Boutique")
    .assert.containsText(".vertical.menu > a:nth-of-type(4)", "Doolittle")
    .assert.containsText(".vertical.menu > a:nth-of-type(5)", "Murmur");
}

function openAndAssertFirstAlbum(client) {
  client.click(".vertical.menu > a:nth-of-type(1)");

  client.waitForElementVisible(".Album", 10000);

  client.assert
    .urlContains("albums/23O4F21GDWiGd33tFN3ZgI")
    .assert.containsText("body", "By Sonic Youth")
    .assert.containsText("body", "Teen Age Riot");
}

function openAndAssertSecondAlbum(client) {
  client.click(".vertical.menu > a:nth-of-type(2)");

  client.waitForElementVisible(".Album", 10000);

  client.assert
    .urlContains("albums/3AQgdwMNCiN7awXch5fAaG")
    .assert.containsText("body", "By Talking Heads")
    .assert.containsText("body", "Born Under Punches");
}

function assertCloseWorks(client) {
  client
    .click(".button")
    .assert.urlEquals("http://localhost:3000/albums")
    .assert.elementNotPresent(".Album");
}

function assertRedirectsFromRootToAlbums(client, componentId) {
  client
    // visit URL
    .url("http://localhost:3000/?app_slug=App-" + componentId)
    .waitForElementVisible("body", 5000)

  client.assert.urlContains('/albums')
  .waitForElementVisible(".vertical.menu", 10000); // assert this loads
}

function deleteTokenFromLocalStorage(client) {
  client.execute(function() {
    localStorage.removeItem('fsr-spotify-fake-auth')
  });
}

function pushUrl(client, url) {
  client.execute(function() {
    history.pushState({}, "", "http://localhost:3000/" + url);
  })
}

// function assertTokenInLocalStorage(client) {
//   client.execute(function() {
//     // Welp.
//     return Object.assign({}, window.localStorage);
//   }, [], function(result) {
//     client.assert(
//       result.value.getItem('fsr-spotify-fake-auth'),
//       'D6W69PRgCoDKgHZGJmRUNA'
//     )
//   })
// }
//
// function assertTokenNotInLocalStorage(client) {
//   client.execute(function() {
//     // Welp.
//     return Object.assign({}, window.localStorage);
//   }, [], function(result) {
//     client.assert(
//       result.value.getItem('fsr-spotify-fake-auth'),
//       null
//     )
//   })
// }

module.exports = {
  before: function(client) {
    console.log('App takes a little while to boot. Waiting for 30 seconds ...')
    client.pause(30000).resizeWindow(1024, 636);
  },

  // The app defaults to just listing all the albums on page
  "./App.js": function(client) {
    client.url("http://localhost:3000/?app_slug=App").waitForElementVisible(".Album", 5000);

    client.assert
      .containsText("body", "By Sonic Youth")
      .assert.containsText("body", "By Talking Heads")
      .assert.containsText("body", "By Beastie Boys")
      .assert.containsText("body", "By Pixies")
      .assert.containsText("body", "By R.E.M.")
      .assert.elementPresent(".ui.left.floated.large.button")
  },

  // Now, at `/albums`, we render a sidebar with all the albums listed
  // Clicking on an album shows it in the main window
  "./components-complete/App-1.js": function(client) {
    client
    // visit URL
    .url("http://localhost:3000/albums?app_slug=App-1")
      .waitForElementVisible("body", 5000)
      // displays loader while loading from server
      .assert.elementPresent(".inline.loader")
      // menu should be visible before continuing
      .waitForElementVisible(".vertical.menu", 10000);

    // client.saveScreenshot('/Users/acco/Downloads/nightwatch-test-1.png')
    // client.pause(2000);

    // menu is present
    assertVerticalMenuPresent(client);

    // click and assert on first one
    openAndAssertFirstAlbum(client);
    openAndAssertSecondAlbum(client);

    // "Close" doesn't work yet
    client
      .click(".button")
      .assert.urlContains("/albums/3AQgdwMNCiN7awXch5fAaG")
      .assert.elementPresent(".Album")
      .assert.containsText("body", "By Talking Heads");
  },

  // Now the close button works
  "./components-complete/App-2.js": function(client) {
    client
    // visit URL
    .url("http://localhost:3000/albums?app_slug=App-2")
      .waitForElementVisible("body", 5000)
      // displays loader while loading from server
      .assert.elementPresent(".inline.loader")
      // menu should be visible before continuing
      .waitForElementVisible(".vertical.menu", 10000);

    // menu is present
    assertVerticalMenuPresent(client);

    // click on first one and assert it works
    openAndAssertFirstAlbum(client);
    openAndAssertSecondAlbum(client);

    // "Close" now works
    assertCloseWorks(client);
  },

  // Same as before, except now `/` redirects to `/albums`
  "./components-complete/App-3.js": function(client) {
    client
      // visit URL
      .url("http://localhost:3000/albums?app_slug=App-3")
      .waitForElementVisible("body", 5000)
      // displays loader while loading from server
      .assert.elementPresent(".inline.loader")
      // menu should be visible before continuing
      .waitForElementVisible(".vertical.menu", 10000);

      // menu is present
      assertVerticalMenuPresent(client);

      // click on first one and assert it works
      openAndAssertFirstAlbum(client);
      openAndAssertSecondAlbum(client);

      // "Close" now works
      assertCloseWorks(client);

      assertRedirectsFromRootToAlbums(client, '3')
  },

  // This version adds login !!!
  // Also adds NavLink which displays the albums on the side as active
  "./components-complete/App-4.js": function(client) {
    client
      // visit URL
      .url("http://localhost:3000/albums?app_slug=App-4")
      .waitForElementVisible("body", 5000)
      // displays loader while loading from server
      .assert.elementPresent(".inline.loader")
      // menu should be visible before continuing
      .waitForElementVisible(".vertical.menu", 10000);

      // menu is present
      assertVerticalMenuPresent(client);

      // click on first one and assert it works
      openAndAssertFirstAlbum(client);
      openAndAssertSecondAlbum(client);

      // "Close" now works
      assertCloseWorks(client);

      // redirects from /
      assertRedirectsFromRootToAlbums(client, '4')

      client.click(".right.menu > a") // click logout

      client.waitForElementVisible(".large.green.button", 10000);

      client
        .assert.urlContains('/login')

      client.click(".large.green.button")
      .assert.elementPresent(".inline.loader")
      .waitForElementVisible(".vertical.menu", 10000);

      client.assert.urlContains('/albums')

      client.click(".right.menu > a") // click logout

      client.waitForElementVisible(".large.green.button", 10000);

      client
        .assert.urlContains('/login');


      deleteTokenFromLocalStorage(client);

      // this should hang
      client
        // visit URL
        .url("http://localhost:3000/albums?app_slug=App-4")
        .waitForElementVisible("body", 5000)
        .assert.elementPresent(".inline.loader")

      client.pause(2000);

      client.assert.elementPresent(".inline.loader")
  },

  // Now, if we visit '/albums' without a token in localStorage we should
  // be redirected to '/login'
  // Note that the initial visit to /albums
  "./components-complete/App-5.js": function(client) {
    deleteTokenFromLocalStorage(client);

    client
      // visit URL
      .url("http://localhost:3000/albums?app_slug=App-5")
      .waitForElementVisible("body", 5000)

    client.pause(1000)

    // We should be redirected to '/login'
    client.
      assert.urlContains('/login');

    // Test login / logout functionality
    client.waitForElementVisible(".large.green.button", 10000);

    client.click(".large.green.button")
    .assert.elementPresent(".inline.loader")
    .waitForElementVisible(".vertical.menu", 10000);

    client.assert.urlContains('/albums')

    client.assert.containsText('.right.menu > a', 'Logout')

    client.click(".right.menu > a") // click logout

    client.waitForElementVisible(".large.green.button", 10000);

    client
      .assert.urlContains('/login');

    client.assert.containsText('.right.menu > a', 'Login')

    // Log back in
    client.click(".large.green.button")
    .assert.elementPresent(".inline.loader")
    .waitForElementVisible(".vertical.menu", 10000);

    // Test the rest
    // menu is present
    assertVerticalMenuPresent(client);

    // click on first one and assert it works
    openAndAssertFirstAlbum(client);
    // assert that it is active
    client.assert.cssClassPresent(".vertical.menu > a:nth-of-type(1)", "active");
    // assert that next one is NOT active
    client.assert.cssClassNotPresent(".vertical.menu > a:nth-of-type(2)", "active");
    openAndAssertSecondAlbum(client);

    // "Close" now works
    assertCloseWorks(client);

    assertRedirectsFromRootToAlbums(client, '3')

    // Now, test Miss
    client.url("http://localhost:3000/does/not/exist?app_slug=App-5")
      .waitForElementVisible("body", 5000)
      .assert.elementPresent(".red.container.segment")

    client
      .expect.element(".red.container.segment").text.to.match(/Error\!/)

    // Now, test redirect state
    deleteTokenFromLocalStorage(client);

    client
      // visit URL
      .url("http://localhost:3000/albums/23O4F21GDWiGd33tFN3ZgI?app_slug=App-5")
      .waitForElementVisible("body", 5000)

    client.pause(1000)

    // We should be redirected to '/login'
    client.
      assert.urlContains('/login');

    // Test login / logout functionality
    client.waitForElementVisible(".large.green.button", 10000);

    client.click(".large.green.button")
    .assert.elementPresent(".inline.loader")
    .waitForElementVisible(".vertical.menu", 10000);

    client.assert.urlContains('/albums/23O4F21GDWiGd33tFN3ZgI')
  },

  after: function(client) {
    client.end();
  }
};
