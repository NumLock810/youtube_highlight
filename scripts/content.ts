import getSubscriptions from "./get_subscription.js";
import path from "node:path"
import { config } from "dotenv";

// .envファイル指定
const ENV_PATH = path.join(__dirname, '../.env');
config({ path: ENV_PATH });


// 使用例
const channelId = process.env.YT_CHANNEL_ID as string; // 対象のチャンネルIDをここに入れてください
getSubscriptions(channelId).then(subscriptions => {
    if (subscriptions && subscriptions.length > 0) {
        subscriptions.forEach(sub => {
            console.log(`${sub.snippet?.title}: https://www.youtube.com/channel/${sub.snippet?.resourceId?.channelId}`);
        });
    } else {
        console.log('登録チャンネルが見つからないか、アクセスできません。');
    }
}).catch(error => {
    console.error('エラーが発生しました:', error);
});