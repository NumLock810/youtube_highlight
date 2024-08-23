// alert("test")
const path = require('path')
const ENV_PATH = path.join(__dirname, '../.env');
require('dotenv').config({ path: ENV_PATH });
const dotenv = require('dotenv').config();

const {google} = require('googleapis');

const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YT_API_KEY // あなたの API キーをここに入れてください
});

async function getSubscriptions(channelId) {
    try {
        let nextPageToken = '';
        const subscriptions = [];
        
        do {
            const response = await youtube.subscriptions.list({
                part: 'snippet',
                channelId: channelId,
                maxResults: 50,
                pageToken: nextPageToken
            });
            
            if (response.data.items) {
                subscriptions.push(...response.data.items);
            }
            nextPageToken = response.data.nextPageToken;
        } while (nextPageToken);
        
        return subscriptions;
    } catch (error) {
        console.error('エラーが発生しました:', error.message);
        if (error.errors) {
            console.error('詳細なエラー情報:', error.errors);
        }
        return null;
    }
}

// 使用例
const channelId = process.env.YT_CHANNEL_ID; // 対象のチャンネルIDをここに入れてください
getSubscriptions(channelId).then(subscriptions => {
    if (subscriptions && subscriptions.length > 0) {
        subscriptions.forEach(sub => {
            console.log(`${sub.snippet.title}: https://www.youtube.com/channel/${sub.snippet.resourceId.channelId}`);
        });
    } else {
        console.log('登録チャンネルが見つからないか、アクセスできません。');
    }
}).catch(error => {
    console.error('エラーが発生しました:', error);
});