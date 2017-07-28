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

