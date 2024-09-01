"use strict";
var _a;
const saveOptions = () => {
    const color = document.getElementById('color').value;
    const likesColor = document.getElementById('like').checked;
    chrome.storage.sync.set({ favoriteColor: color, likesColor }, () => {
        const status = document.getElementById('status');
        if (status) {
            status.textContent = 'Options saved.';
            setTimeout(() => {
                status.textContent = '';
            }, 750);
        }
    });
};
const restoreOptions = () => {
    chrome.storage.sync.get({ favoriteColor: 'red', likesColor: true }, (items) => {
        const colorElement = document.getElementById('color');
        const likeElement = document.getElementById('like');
        if (colorElement)
            colorElement.value = items.favoriteColor;
        if (likeElement)
            likeElement.checked = items.likesColor;
    });
};
document.addEventListener('DOMContentLoaded', restoreOptions);
(_a = document.getElementById('save')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', saveOptions);
//# sourceMappingURL=options.js.map