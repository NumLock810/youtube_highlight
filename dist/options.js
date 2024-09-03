"use strict";
var _a;
const saveOptions = () => {
    const ytAPIkey = document.getElementById('ytAPIkey').value;
    const ytChannelId = document.getElementById("ytChannelId").value;
    chrome.storage.local.set({ apiKey: ytAPIkey, channelId: ytChannelId }, () => {
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
    chrome.storage.local.get(["apiKey", "channelId"], (items) => {
        const ytAPIkeyElement = document.getElementById('ytAPIkey');
        const ytChannelIdElement = document.getElementById('ytChannelId');
        if (ytAPIkeyElement)
            ytAPIkeyElement.value = items.apiKey;
        if (ytChannelIdElement)
            ytChannelIdElement.value = items.channelId;
    });
};
document.addEventListener('DOMContentLoaded', restoreOptions);
(_a = document.getElementById('save')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', saveOptions);
//# sourceMappingURL=options.js.map