let myWordPressPage,
    newPostPage,
    homePage,
    loginPage,
    postName = 'vodQA-Shots123';
const env = require('env2')('./.env');

export default {
    before(client) {
        console.log('## Starting Blog Post Tests ##');
        myWordPressPage = client.page.myWordPressPage();
        newPostPage = client.page.newPostPage();
        homePage = client.page.homePage();
        loginPage = client.page.loginPage();
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
    },

    'Write new post': (client) => {
        console.log('## Writing a New Post ##');
        myWordPressPage
            .waitForElementPresent('@writePost')
            .writeNewPostButton();
        newPostPage
            .waitForElementPresent('@postEditor')
            .enterPostTitle(postName);
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






