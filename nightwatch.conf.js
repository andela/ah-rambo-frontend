const chromedriver = require('chromedriver');

module.exports = {
  src_folders : ["e2e-tests"],
  output_folder: "test_reports",
  test_settings: {
    default: {
      webdriver: {
        start_process: true,
        server_path: chromedriver.path,
        port: 4444,
        log_path: "./test_reports",
        cli_args: ['--port=4444']
      },
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
      }
    }
  }
};
