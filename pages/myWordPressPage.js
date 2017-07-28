const myWordPressPageCommands = {
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
