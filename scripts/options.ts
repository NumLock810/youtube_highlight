// Saves options to chrome.storage
const saveOptions = () => {
    const ytAPIkey = (document.getElementById('ytAPIkey') as HTMLInputElement).value;
    const ytChannelId = (document.getElementById("ytChannelId") as HTMLInputElement).value
    
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

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
    chrome.storage.local.get(["apiKey", "channelId"], (items) => {
        const ytAPIkeyElement = document.getElementById('ytAPIkey') as HTMLInputElement;
        const ytChannelIdElement = document.getElementById('ytChannelId') as HTMLInputElement;
        
        if (ytAPIkeyElement) ytAPIkeyElement.value = items.apiKey;
        if (ytChannelIdElement) ytChannelIdElement.value = items.channelId;
    });
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save')?.addEventListener('click', saveOptions);