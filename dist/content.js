var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { google } from "googleapis";
function getApiKey() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get('apiKey', (items) => {
                if (items.apiKey) {
                    resolve(items.apiKey);
                }
                else {
                    reject(new Error('APIキーが見つかりません。'));
                }
            });
        });
    });
}
function initializeYouTubeClient() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiKey = yield getApiKey();
        return google.youtube({
            version: 'v3',
            auth: apiKey
        });
    });
}
function getSubscriptions(channelId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const youtube = yield initializeYouTubeClient();
            let nextPageToken = '';
            const subscriptions = [];
            do {
                const response = yield youtube.subscriptions.list({
                    part: ['snippet'],
                    channelId: channelId,
                    maxResults: 50,
                    pageToken: nextPageToken
                });
                if (response.data.items) {
                    subscriptions.push(...response.data.items);
                }
                nextPageToken = (_a = response.data.nextPageToken) !== null && _a !== void 0 ? _a : "";
            } while (nextPageToken);
            return subscriptions;
        }
        catch (error) {
            console.error('エラーが発生しました:', error.message);
            if (error.errors) {
                console.error('詳細なエラー情報:', error.errors);
            }
            return null;
        }
    });
}
new Promise((resolve, reject) => {
    chrome.storage.local.get("channelId", items => {
        if (items.channelId) {
            resolve(items.channelId);
        }
        else {
            reject(new Error('チャンネルIDが見つかりません。'));
        }
    });
})
    .then(channelId => getSubscriptions(channelId))
    .then(subscriptions => {
    if (subscriptions && subscriptions.length > 0) {
        subscriptions.forEach(sub => {
            var _a, _b, _c;
            console.log(`${(_a = sub.snippet) === null || _a === void 0 ? void 0 : _a.title}: https://www.youtube.com/channel/${(_c = (_b = sub.snippet) === null || _b === void 0 ? void 0 : _b.resourceId) === null || _c === void 0 ? void 0 : _c.channelId}`);
        });
    }
    else {
        console.log('登録チャンネルが見つからないか、アクセスできません。');
    }
})
    .catch(error => {
    console.error('エラーが発生しました:', error);
});
//# sourceMappingURL=content.js.map