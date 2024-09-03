/**
* require → Node.js上で利用するimport文のこと
* 
* path → Node.jsがデフォルトで内蔵しているモジュール（ファイル）のこと。
* デフォルトで存在するものなので、インポートだけすれば使える仕様。
*/
const path = require('path');

module.exports = {
    // どのソースからスタートするか
    entry: {
        // background: './scripts/background.ts',
        content: './scripts/content.ts',
        // popup: './scripts/popup.ts',
        option: "./scripts/option.ts",
    },
    
    output: {
        // 出力するファイル名
        filename: "[name].js",
        
        // 出力するファイルをどこに出力するか（絶対パスで書く）
        path: path.resolve(__dirname, "webpack")
    },
    
    // モードの設定
    // mode: "development",
    mode: "production",
    
    // evalが含まれないようにする
    devtool: 'cheap-module-source-map',
    
    // ts-loaderの設定
    module: {
        rules:[
            {
                // どんなファイルに対して
                test: /\.ts$/,
                
                // 何をするのか
                use: 'ts-loader',
                
                // node_modulesから持ってきたtsファイルはts-loaderの対象から省く
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        /**
        * import文で記載しているファイル名を拡張子をつけずに記載した場合、
        * extensions配列内に記載した拡張子がついた同名のファイルがあるか検索し、
        * あればそのファイルをimportする。
        * 
        * 検索は配列の左から順番に行う。
        */
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        
        // なんかいろいろ
        alias: {
            assert: "assert",
            buffer: "buffer",
            console: "console-browserify",
            constants: "constants-browserify",
            crypto: "crypto-browserify",
            domain: "domain-browser",
            events: "events",
            http: "stream-http",
            https: "https-browserify",
            os: "os-browserify/browser",
            path: "path-browserify",
            punycode: "punycode",
            process: "process/browser",
            querystring: "querystring-es3",
            stream: "stream-browserify",
            _stream_duplex: "readable-stream/duplex",
            _stream_passthrough: "readable-stream/passthrough",
            _stream_readable: "readable-stream/readable",
            _stream_transform: "readable-stream/transform",
            _stream_writable: "readable-stream/writable",
            string_decoder: "string_decoder",
            sys: "util",
            timers: "timers-browserify",
            tty: "tty-browserify",
            url: "url",
            util: "util",
            vm: "vm-browserify",
            zlib: "browserify-zlib"
        },
        
        fallback: {
            child_process: false,
            fs: false,
            crypto: false,
            net: false,
            tls: false
        }
    },
}
