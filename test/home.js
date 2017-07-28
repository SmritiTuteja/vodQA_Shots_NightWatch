let homePage;
let loginPage;
let myWordPressPage;
let newPostPage;
const env = require('env2')('./.env');

export default {
    before(client) {
        console.log('## Launching Wordpress Application ##');
        homePage = client.page.homePage();
        loginPage = client.page.loginPage();
        myWordPressPage = client.page.myWordPressPage();
        newPostPage = client.page.newPostPage();
    },

    after(client) {
        console.log('## Tests complete ##');
        client.end();
    },

    'Launch App': (client) => {
        console.log('## Launching app ##');
        client
            .url(client.launchUrl)
            .waitForElementPresent('body');
        homePage.expect.element('@title').to.contain.text('WordPress.com');
    },

    'Login': (client) => {
        console.log('## Loggging In ##');
        homePage.expect.element('@loginButton').to.be.visible;
        homePage.clickLoginInButton();
        client
            .pause(5000)
            .assert.visible('div.wp-login__container');
        loginPage
            .setUsername(process.env.LOGIN_USER)
            .setPassword(process.env.LOGIN_PASS)
            .logIn();
        client.waitForElementPresent('div.layout__content');
    },

    'Write new post': (client) => {
        console.log('## Writing a New Post ##');
        myWordPressPage
            .waitForElementPresent('@writePost')
            .writeNewPostButton();
        newPostPage
            .waitForElementPresent('@postEditor')
            .enterPostTitle('vodQA-Shots');
        client.waitForElementNotPresent('button[class*="editor-ground-control__preview-button"][disabled]');
        newPostPage
            .clickPreviewButton()
            .waitForElementPresent('@previewModal');
        client.pause(3000);
        newPostPage
            .closePreviewModal()
            .publishPost();
        client
            .waitForElementPresent('div.notice.is-success')
            .expect.element('.notice__text').text.to.contain('Post published');
    }
};






