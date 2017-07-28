const newPostPageCommands = {
    waitForPostEditorToLoad() {
        return this.waitForElementPresent('@postEditor');
    },
    enterPostTitle(title) {
        return this.setValue('@postTitle', title);
    },
    clickPreviewButton() {
        return this.click('@previewButton');
    },
    waitForPreviewModalToLoad() {
        return this.waitForElementPresent('@previewModal');
    },
    closePreviewModal() {
        return this.click('@closePreviewModal');
    },
    publishPost() {
        return this.click('@publishPost');
    }
};

export default {
    commands: [newPostPageCommands],
    elements: {
        postEditor: {
            selector: 'div.post-editor__content-editor'
        },
        postTitle: {
            selector: 'textarea[placeholder="Title"]'
        },
        previewButton: {
            selector: 'button[class*="editor-ground-control__preview-button"]'
        },
        previewModal: {
            selector: 'div.web-preview__inner'
        },
        closePreviewModal: {
            selector: 'button[class*="web-preview__close"]'
        },
        publishPost: {
            selector: 'button[class*="editor-publish-button"]'
        }
    }
};
