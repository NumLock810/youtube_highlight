import { google, youtube_v3 } from "googleapis";

// 型定義を追加
type Subscription = youtube_v3.Schema$Subscription;

async function getApiKey(): Promise<string> {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get('apiKey', (items) => {
            if (items.apiKey) {
                resolve(items.apiKey);
            } else {
                reject(new Error('APIキーが見つかりません。'));
            }
        });
    });
}

async function initializeYouTubeClient(): Promise<youtube_v3.Youtube> {
    const apiKey = await getApiKey();
    return google.youtube({
        version: 'v3',
        auth: apiKey
    });
}

export default async function getSubscriptions(channelId:string):Promise<Subscription[]|null> {
    try {
        const youtube = await initializeYouTubeClient();
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