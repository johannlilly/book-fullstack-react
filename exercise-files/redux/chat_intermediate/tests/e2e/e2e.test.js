var fs = require("fs");

var path = require("path");
var indexPath = path.join(__dirname, "../../", "src/index.js");

function switchApp(filePath, client) {
  var data = fs.readFileSync(indexPath, "utf-8");
  var newContents = data.replace(
    /^import App from .*/m,
    'import App from "' + filePath + '";'
  );

  fs.writeFileSync(indexPath, newContents, "utf-8");

  client.pause(500);
}

function assertInitialState(client) {
  client.expect
    .element("div.ui.comments > div:nth-child(1)")
    .text.to.match(/Twelve minutes to ignition/);
}

function createMessage(client, message) {
  client.setValue("input[type=text]", message);

  client.click(".primary.button");
}

function assertCanCreateMessagesNoInitialState(client) {
  client.assert
    .elementPresent("input")
    .assert.elementPresent(".ui.primary.button");

  createMessage(client, "message1");

  client.expect.element(".comment").text.to.match(/message1/);

  client.expect.element("input[type=text]").text.to.equal("");

  createMessage(client, "message2");

  client.expect
    .element("div.ui.comments > div:nth-child(1)")
    .text.to.match(/message1/);
  client.expect
    .element("div.ui.comments > div:nth-child(2)")
    .text.to.match(/message2/);
}

function assertCanCreateMessagesWithInitialState(client) {
  client.assert
    .elementPresent("input")
    .assert.elementPresent(".ui.primary.button");

  createMessage(client, "message1");

  client.expect
    .element("div.ui.comments > div:nth-child(2)")
    .text.to.match(/message1/);

  client.expect.element("input[type=text]").text.to.equal("");

  createMessage(client, "message2");

  client.expect
    .element("div.ui.comments > div:nth-child(2)")
    .text.to.match(/message1/);
  client.expect
    .element("div.ui.comments > div:nth-child(3)")
    .text.to.match(/message2/);
}

function assertTabularMenu(client) {
  client.assert.elementPresent(".ui.top.attached.tabular.menu");
  client.expect
    .element("div.tabular.menu > div.active.item")
    .text.to.equal("Buzz Aldrin");
  client.expect
    .element("div.tabular.menu > div:nth-child(2)")
    .text.to.equal("Michael Collins");
}

function assertWorkingTabularMenu(client) {
  assertTabularMenu(client);

  client.expect
    .element("div.tabular.menu > div.active.item")
    .text.to.equal("Buzz Aldrin");

  // switch to mike
  client.click("div.tabular.menu > div:nth-child(2)");

  client.expect
    .element("div.tabular.menu > div.active.item")
    .text.to.equal("Michael Collins");

  // switch back
  client.click("div.tabular.menu > div:nth-child(1)");

  client.expect
    .element("div.tabular.menu > div.active.item")
    .text.to.equal("Buzz Aldrin");
}

function assertFullyFunctional(client, initialState = false) {
  if (initialState) {
    assertCanCreateAndDeleteMessagesWithInitialState(client);
  } else {
    assertCanCreateAndDeleteMessagesNoInitialState(client);
  }

  // switch to mike
  client.click("div.tabular.menu > div:nth-child(2)");

  client.expect
    .element("div.tabular.menu > div.active.item")
    .text.to.equal("Michael Collins");

  // no messages here
  client.assert.elementNotPresent("div.ui.comments > div");

  client.setValue("input[type=text]", "mike-message1");

  client.click(".primary.button");

  // we added a message
  client.expect.element(".comment").text.to.match(/mike\-message1/);

  // switch back to tab for Buzz
  client.click("div.tabular.menu > div:nth-child(1)");

  if (initialState) {
    // we expect his message to still be here
    client.expect
      .element("div.ui.comments > div:nth-child(2)")
      .text.to.match(/message2/);

    // we don't exepct any more than these first two messages
    client.assert.elementNotPresent("div.ui.comments > div:nth-child(3)");

    // click/delete the messages
    client.click(".comment");
    client.click(".comment");

    // no messages here
    client.assert.elementNotPresent("div.ui.comments > div");
  } else {
    // we expect his message to still be here
    client.expect.element(".comment").text.to.match(/message2/);

    // we don't exepct any more than this message
    client.assert.elementNotPresent("div.ui.comments > div:nth-child(2)");

    // click/delete the message
    client.click(".comment");

    // no messages here
    client.assert.elementNotPresent("div.ui.comments > div");
  }

  // switch back to Mike
  client.click("div.tabular.menu > div:nth-child(2)");

  // this message is still here
  client.expect.element(".comment").text.to.match(/mike\-message1/);
}

function assertCanCreateAndDeleteMessagesWithInitialState(client) {
  assertCanCreateMessagesWithInitialState(client);

  client.click("div.ui.comments > div:nth-child(2)");
  client.expect
    .element("div.ui.comments > div:nth-child(2)")
    .text.to.match(/message2/);
}

function assertCanCreateAndDeleteMessagesNoInitialState(client) {
  assertCanCreateMessagesNoInitialState(client);

  client.click("div.ui.comments > div:nth-child(1)");
  client.expect
    .element("div.ui.comments > div:nth-child(1)")
    .text.to.match(/message2/);
}

module.exports = {
  before: function(client) {
    console.log("App takes a little while to boot. Waiting for 30 seconds ...");
    // client.pause(10000).resizeWindow(1024, 636);
  },

  // The app defaults to completed version
  completed: function(client) {
    client
      .url("http://localhost:3000")
      .waitForElementVisible(".ui.segment", 5000);

    assertFullyFunctional(client);
  },

  // Matches state of chat app at end of last chapter
  "./App.js": function(client) {
    switchApp("./App", client);
    client
      .url("http://localhost:3000")
      .waitForElementVisible(".ui.segment", 5000);

    assertCanCreateAndDeleteMessagesNoInitialState(client);
  },

  // All we do is switch to using create store
  "./complete/App-1.js": function(client) {
    switchApp("./complete/App-1", client);
    client
      .url("http://localhost:3000")
      .waitForElementVisible(".ui.segment", 5000);

    assertCanCreateAndDeleteMessagesNoInitialState(client);
  },

  // Surface doesn't change, we move to using message _objects_ with uuids
  // we also add timestamps
  "./complete/App-2.js": function(client) {
    switchApp("./complete/App-2", client);
    client
      .url("http://localhost:3000")
      .waitForElementVisible(".ui.segment", 5000);

    assertCanCreateAndDeleteMessagesNoInitialState(client);
    client.expect
      .element("div.ui.comments > div:nth-child(1)")
      .text.to.match(/@\d{13}/);
  },

  // Now we initialize the state with an object
  "./complete/App-3.js": function(client) {
    switchApp("./complete/App-3", client);
    client
      .url("http://localhost:3000")
      .waitForElementVisible(".ui.segment", 5000);

    assertInitialState(client);

    // but nothing else works
  },

  // Tabs present! But nothing else works
  "./complete/App-4.js": function(client) {
    switchApp("./complete/App-4", client);
    client
      .url("http://localhost:3000")
      .waitForElementVisible(".ui.segment", 5000);

    assertInitialState(client);

    assertTabularMenu(client);
  },

  // Now we can add messages to the first thread
  "./complete/App-5.js": function(client) {
    switchApp("./complete/App-5", client);
    client
      .url("http://localhost:3000")
      .waitForElementVisible(".ui.segment", 5000);

    assertInitialState(client);

    assertCanCreateMessagesWithInitialState(client);
  },

  // Now we can add and delete messages from the first thread
  "./complete/App-6.js": function(client) {
    switchApp("./complete/App-6", client);
    client
      .url("http://localhost:3000")
      .waitForElementVisible(".ui.segment", 5000);

    assertInitialState(client);

    assertCanCreateAndDeleteMessagesWithInitialState(client);
  },

  // Now we can switch between threads and add and delete messages from them!!!
  "./complete/App-7.js": function(client) {
    switchApp("./complete/App-7", client);
    client
      .url("http://localhost:3000")
      .waitForElementVisible(".ui.segment", 5000);

    assertInitialState(client);

    assertFullyFunctional(client, true);
  },

  // Internal refactor
  "./complete/App-8.js": function(client) {
    switchApp("./complete/App-8", client);
    client
      .url("http://localhost:3000")
      .waitForElementVisible(".ui.segment", 5000);

    assertInitialState(client);

    assertFullyFunctional(client, true);
  },

  // Deletes don't work because we're using an incomplete messagesReducer()
  "./complete/App-9.js": function(client) {
    switchApp("./complete/App-9", client);
    client
      .url("http://localhost:3000")
      .waitForElementVisible(".ui.segment", 5000);

    assertInitialState(client);

    assertCanCreateMessagesWithInitialState(client, true);
  },

  // Internal refactor
  "./complete/App-10.js": function(client) {
    switchApp("./complete/App-10", client);
    client
      .url("http://localhost:3000")
      .waitForElementVisible(".ui.segment", 5000);

    assertInitialState(client);
    assertFullyFunctional(client, true);
  },

  // Works except no initial state
  "./complete/App-11.js": function(client) {
    switchApp("./complete/App-11", client);
    client
      .url("http://localhost:3000")
      .waitForElementVisible(".ui.segment", 5000);

    assertFullyFunctional(client);
  },

  // All changes under the hood, works
  "./complete/App-12.js": function(client) {
    switchApp("./complete/App-12", client);
    client
      .url("http://localhost:3000")
      .waitForElementVisible(".ui.segment", 5000);

    assertFullyFunctional(client);
  },

  // All changes under the hood, works
  "./complete/App-13.js": function(client) {
    switchApp("./complete/App-13", client);
    client
      .url("http://localhost:3000")
      .waitForElementVisible(".ui.segment", 5000);

    assertFullyFunctional(client);
  },

  // Breaks, tabs work
  "./complete/App-14.js": function(client) {
    switchApp("./complete/App-14", client);
    client
      .url("http://localhost:3000")
      .waitForElementVisible(".ui.segment", 5000);

    assertWorkingTabularMenu(client);
  },

  // Back
  "./complete/App-15.js": function(client) {
    switchApp("./complete/App-15", client);
    client
      .url("http://localhost:3000")
      .waitForElementVisible(".ui.segment", 5000);

    assertFullyFunctional(client);
  },

  "./App-16.js": function(client) {
    switchApp("./complete/App-16", client);
    client
      .url("http://localhost:3000")
      .waitForElementVisible(".ui.segment", 5000);

    assertFullyFunctional(client);
  },

  "./App-17.js": function(client) {
    switchApp("./complete/App-17", client);
    client
      .url("http://localhost:3000")
      .waitForElementVisible(".ui.segment", 5000);

    //assertFullyFunctional(client);
  },

  after: function(client) {
    console.log("After");
    // switchApp("./complete/App-17", client);
    client.end();
  }
};
