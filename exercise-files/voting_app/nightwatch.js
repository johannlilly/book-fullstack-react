const seleniumServer = require("selenium-server");
const chromedriver = require("chromedriver");

module.exports = {
  src_folders: ["tests/e2e"],
  custom_commands_path: "",
  custom_assertions_path: "",
  page_objects_path: "",
  globals_path: "",

  selenium: {
    start_process: true,
    server_path: seleniumServer.path,
    log_path: "",
    host: "127.0.0.1",
    port: 4444,
    cli_args: {
      "webdriver.chrome.driver": chromedriver.path
    }
  },

  test_settings: {
    default: {
      launch_url: "http://localhost",
      selenium_port: 4444,
      selenium_host: "localhost",
      silent: true,
      screenshots: {
        enabled: false,
        path: ""
      },
      desiredCapabilities: {
        browserName: "chrome",
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    }
  }
};
