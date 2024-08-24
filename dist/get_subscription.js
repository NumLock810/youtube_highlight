"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getSubscriptions;
const path_1 = __importDefault(require("path"));
const dotenv_1 = require("dotenv");
const googleapis_1 = require("googleapis");
const ENV_PATH = path_1.default.join(__dirname, '../.env');
(0, dotenv_1.config)({ path: ENV_PATH });
const youtube = googleapis_1.google.youtube({
    version: 'v3',
    auth: process.env.YT_API_KEY
});
function getSubscriptions(channelId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
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
//# sourceMappingURL=get_subscription.js.map