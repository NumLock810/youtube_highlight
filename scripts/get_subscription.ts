import path from "path";
import { config } from "dotenv";
import { google, youtube_v3 } from "googleapis";

// .envファイル指定
const ENV_PATH = path.join(__dirname, '../.env');
config({ path: ENV_PATH });

// 型定義を追加
type Subscription = youtube_v3.Schema$Subscription;

const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YT_API_KEY as string // あなたの API キーをここに入れてください
});

export default async function getSubscriptions(channelId:string):Promise<Subscription[]|null> {
    try {
        let nextPageToken = '';
        const subscriptions = [];
        
        do {
            const response = await youtube.subscriptions.list({
                part: ['snippet'],
                channelId: channelId,
                maxResults: 50,
                pageToken: nextPageToken
            });
            
            if (response.data.items) {
                subscriptions.push(...response.data.items);
            }
            nextPageToken = response.data.nextPageToken ?? "";
        } while (nextPageToken);
        
        return subscriptions;
    } catch (error) {
        console.error('エラーが発生しました:', (error as Error).message);
        if ((error as any).errors) {
            console.error('詳細なエラー情報:', (error as any).errors);
        }
        return null;
    }
}