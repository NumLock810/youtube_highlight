// Saves options to chrome.storage
const saveOptions = () => {
    const color = (document.getElementById('color') as HTMLInputElement).value;
    const likesColor = (document.getElementById('like') as HTMLInputElement).checked;
    
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

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
    chrome.storage.sync.get({ favoriteColor: 'red', likesColor: true }, (items) => {
        const colorElement = document.getElementById('color') as HTMLInputElement;
        const likeElement = document.getElementById('like') as HTMLInputElement;
        
        if (colorElement) colorElement.value = items.favoriteColor;
        if (likeElement) likeElement.checked = items.likesColor;
    });
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save')?.addEventListener('click', saveOptions);