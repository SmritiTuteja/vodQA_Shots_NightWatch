const homePageCommands = {
    clickLoginInButton() {
        return this.click('@loginButton');
    }
};


export default {
    commands: [homePageCommands],
    elements: {
        title: {
            selector: 'a[href$="/wordpress.com/"]'
        },
        loginButton: {
            selector: 'a.login-link'
        }
    }
};
