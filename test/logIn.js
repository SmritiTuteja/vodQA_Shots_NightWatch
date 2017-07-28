let homePage;
let loginPage;
let myWordPressPage;
const env = require('env2')('./.env');

export default {
    before(client) {
        console.log('## Launching Wordpress Application ##');
        homePage = client.page.homePage();
        loginPage = client.page.loginPage();
        myWordPressPage = client.page.myWordPressPage();
    },

    after(client) {
        console.log('## Tests complete ##');
        client.end();
    },

    'Launch App': (client) => {
        console.log('## Launching app ##');
        homePage.navigate();
        client.waitForElementPresent('body');
    },

    'Login': () => {
        console.log('## Logging In ##');
        homePage.clickLoginInButton();
        loginPage
            .waitForElementPresent('@username')
            .logIn(process.env.LOGIN_USER, process.env.LOGIN_PASS);
        myWordPressPage.waitForElementPresent('@readerButton');
    }
};






