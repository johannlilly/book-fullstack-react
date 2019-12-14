const jar = require("selenium-server-standalone-jar");

module.exports = {
  src_folders: ["tests/e2e"],
  custom_commands_path: "",
  custom_assertions_path: "",
  page_objects_path: "",
  globals_path: "",

  selenium: {
    start_process: true,
    server_path: jar.path,
    log_path: "",
    port: 4444,
    cli_args: {
      "webdriver.chrome.driver": "",
      "webdriver.gecko.driver": "node_modules/chromedriver/chromedriver",
      "webdriver.edge.driver": ""
    }
  },

  test_settings: {
    default: {
      launch_url: "http://localhost:3000",
      selenium_port: 4444,
      selenium_host: "localhost",
      silent: true,
      screenshots: {
        enabled: false,
        path: ""
      },
      desiredCapabilities: {
        browserName: "chrome",
        chromeOptions: {
          args: ["--disable-dev-shm-usage", "--no-sandbox"]
        },
        javascriptEnabled: true,
        acceptSslCerts: true
      },
      globals: {
        waitForConditionTimeout: 10000
      }
    }
  }
};
