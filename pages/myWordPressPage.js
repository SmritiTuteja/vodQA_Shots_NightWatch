const myWordPressPageCommands = {
    writeNewPostButton() {
        return this.click('@writePost');
    },
    goToReader() {
        return this.click('@readerButton');
    },
    goToMySites() {
        return this.click('@mySitesButton');
    },
    searchPost(postName) {
        return this.setValue('@searchPost', postName);
    }
};

export default {
    commands: [myWordPressPageCommands],
    elements: {
        readerButton: '.masterbar__reader',
        mySitesButton: 'a[data-tip-target="my-sites"]',
        writePost: 'a[title="Create a New Post"]',
    }
};
