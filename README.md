# youtube_highlight
youtubeの登録済み投稿者の動画を目立たせる拡張機能


## なんとなくの流れ
- api叩いて登録者のリストを取得
- `ytd-rich-item-renderer`classを取得
    - content -> dismissible -> details -> meta -> `ytd-video-meta-block` -> metadata -> byline-container -> `ytd-channel-name` -> container -> text-container -> `yt-formatted-string` -> aタグ
    - の中にチャンネル名
- マッチする動画の背景を目立つ色にする
