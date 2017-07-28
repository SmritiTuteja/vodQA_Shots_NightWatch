const loginPageCommands = {
    setUsername(username) {
        return this.setValue('@username', username);
    },
    setPassword(password) {
        return this.setValue('@password', password);
    },
    logIn(username, password) {
        this.setUsername(username);
        this.setPassword(password);
        return this.click('@logIn');
    }
};


export default {
    commands: [loginPageCommands],
    elements: {
        username: {
            selector: 'input#usernameOrEmail'
        },
        password: {
            selector: 'input#password'
        },
        logIn: {
            selector: 'button[type=submit]'
        }
    }
};
