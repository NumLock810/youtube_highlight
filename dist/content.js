import getSubscriptions from "./get_subscription.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ENV_PATH = path.join(__dirname, '../.env');
config({ path: ENV_PATH });
const channelId = process.env.YT_CHANNEL_ID;
getSubscriptions(channelId).then(subscriptions => {
    if (subscriptions && subscriptions.length > 0) {
        subscriptions.forEach(sub => {
            var _a, _b, _c;
            console.log(`${(_a = sub.snippet) === null || _a === void 0 ? void 0 : _a.title}: https://www.youtube.com/channel/${(_c = (_b = sub.snippet) === null || _b === void 0 ? void 0 : _b.resourceId) === null || _c === void 0 ? void 0 : _c.channelId}`);
        });
    }
    else {
        console.log('登録チャンネルが見つからないか、アクセスできません。');
    }
}).catch(error => {
    console.error('エラーが発生しました:', error);
});
//# sourceMappingURL=content.js.map