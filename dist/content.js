"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_subscription_js_1 = __importDefault(require("./get_subscription.js"));
const node_path_1 = __importDefault(require("node:path"));
const dotenv_1 = require("dotenv");
const ENV_PATH = node_path_1.default.join(__dirname, '../.env');
(0, dotenv_1.config)({ path: ENV_PATH });
const channelId = process.env.YT_CHANNEL_ID;
(0, get_subscription_js_1.default)(channelId).then(subscriptions => {
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