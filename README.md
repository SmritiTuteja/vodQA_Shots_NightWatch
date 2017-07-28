# vodQA_Shots_NightWatch
Join the Night's Watch to test web apps!!

# Requirements:
1. Java JDK >= 7 : http://www.oracle.com/technetwork/java/javase/downloads/index.html
2. Install Node.js: https://nodejs.org/en/ 
3. Install NightWatch: npm install nightwatch --save-dev
4. Install selenium-download jar: npm i selenium-download --save-dev 
    - this will install both selenium-server-standalone and chromedriver
5. To run tests in Firefox:
    - If you are using selenium 2.x and have firefox < v48, you should use firefoxdriver
    - If you are using selenium 3.x and have firefox >= v48, you should use geckodriver (https://github.com/mozilla/geckodriver)
    
    
# SetUp:
### 1. Once you have everything installed, create a nightwatch.conf.js file:
You can either have config file a json file as 'nightwatch.json' file or a js file as 'nightwatch.conf.js'

Sample nightwatch.conf.js file:

```
require('babel-core/register');
module.exports = require('./nightwatch.json');
const SCREENSHOT_PATH = "./screenshots/";

//save screenshots in case of failures
let FILECOUNT = 0;

function padLeft(count) {
    return count < 10 ? '0' + count : count.toString();
}

function imgpath(browser) {
    let desiredCapabilities = browser.options.desiredCapabilities;
    let meta = [desiredCapabilities.platform];
    meta.push(desiredCapabilities.browserName ? desiredCapabilities.browserName : 'any');
    meta.push(desiredCapabilities.version ? desiredCapabilities.version : 'any');
    let metadata = meta.join('~').toLowerCase().replace(/ /g, '');
    return SCREENSHOT_PATH + metadata + '_' + padLeft(FILECOUNT++) + '_';
}

module.exports.imgpath = imgpath;
module.exports.SCREENSHOT_PATH = SCREENSHOT_PATH;

```
This would take care of:
  - taking screenshots in case of error/failures.
  - taking config file into account where all settings are mentioned - require('./nightwatch.json');
  - writing tests in ES6 - require('babel-core/register')
  
### 2. Now, create a nightwatch.json file with all settings:

```
{
  "src_folders": [
    "test"
  ],
  "output_folder": "./reports",
  "page_objects_path": "pages",
  "live_output" : true,
  "globals_path": "./globals.js",
  "selenium": {
    "start_process": true,
    "server_path": "./node_modules/nightwatch/bin/selenium.jar",
    "host": "127.0.0.1",
    "port": 4444,
    "cli_args": {
      "webdriver.chrome.driver": "./node_modules/nightwatch/bin/chromedriver"
    }
  },
  "test_settings": {
    "default": {
      "launch_url": "https://wordpress.com/",
      "test_workers": {
        "enabled": true,
        "workers": "auto"
      },
      "screenshots": {
        "enabled": true,
        "path": "./screenshots",
        "on_error": true,
        "on_failure": true
      }
    },
    "localChrome": {
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    }
  }
}

```

### 3. Create a tests folder in the project and write your first test file:

```
export default {
    before(client) {
        console.log('## Launching Wordpress Application ##');
    },

    after(client) {
        console.log('## Tests complete ##');
        client.end();
    },

    'Launch App': (client) => {
        console.log('## Launching app ##');
        client.url("https://wordpress.com/");
        client.waitForElementPresent('body');
        client.expect.element('a[href$="/wordpress.com/"]').to.contain.text('WordPress.com');
        client.end();
    }
};
```

### 4. Run your tests:
npm run test-local-chrome

test-local-chrome is the script mentioned in the package.json file


