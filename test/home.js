let homePage;

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
        homePage.navigate();
        client.waitForElementPresent('body');
        homePage.expect.element('@title').to.contain.text('WordPress.com');
        homePage.expect.element('@loginButton').to.be.visible;
    }
};






