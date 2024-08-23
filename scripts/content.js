import { getSubscriptions } from "./get_subscription";

const path = require('path')
const ENV_PATH = path.join(__dirname, '../.env');
require('dotenv').config({ path: ENV_PATH });
const dotenv = require('dotenv').config();


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