import getSubscriptions from "./get_subscription";

// メイン処理
new Promise<string>((resolve, reject) => {
    chrome.storage.local.get("channelId", items => {
        if (items.channelId) {
            resolve(items.channelId);
        } else {
            reject(new Error('チャンネルIDが見つかりません。'));
        }
    });
})
.then(channelId => getSubscriptions(channelId))
.then(subscriptions => {
    if (subscriptions && subscriptions.length > 0) {
        subscriptions.forEach(sub => {
            console.log(`${sub.snippet?.title}: https://www.youtube.com/channel/${sub.snippet?.resourceId?.channelId}`);
        });
    } else {
        console.log('登録チャンネルが見つからないか、アクセスできません。');
    }
})
.catch(error => {
    console.error('エラーが発生しました:', error);
});