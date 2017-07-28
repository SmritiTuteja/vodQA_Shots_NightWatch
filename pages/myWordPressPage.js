const myWordPressPageCommands = {
    //ToDo: wait for layout content to load
    waitForMyWordPressPageToLoad() {
        return this.waitForElementPresent('@writePost');
    },
    writeNewPostButton() {
        return this.click('@writePost');
    }
};

export default {
    commands: [myWordPressPageCommands],
    elements: {
        writePost: {
            selector: 'a[title="Create a New Post"]'
        }
    }
};
