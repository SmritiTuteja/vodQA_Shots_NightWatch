let homePage;
const env = require('env2')('./.env');

export default {
    before(client) {
        console.log('## Launching Wordpress Application ##');
        homePage = client.page.homePage();
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
        homePage.expect.element('@loginButton').to.be.visible;
    }
};






