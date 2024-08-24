/**
* require → Node.js上で利用するimport文のこと
* 
* path → Node.jsがデフォルトで内蔵しているモジュール（ファイル）のこと。
* デフォルトで存在するものなので、インポートだけすれば使える仕様。
*/
const path = require('path');

// dotenv用の設定
const webpack = require('webpack');
const dotenv = require('dotenv');

const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});


module.exports = {
    
    // どのソースからスタートするか
    entry:"./scripts/content.ts",
    
    output: {
        // 出力するファイル名
        filename: "content.js",
        
        // 出力するファイルをどこに出力するか（絶対パスで書く）
        path: path.resolve(__dirname, "dist")
    },
    
    // モードの設定
    mode: "development",

    // ts-loaderの設定
    module: {
        rules:[{
            // どんなファイルに対して
            test: /\.ts$/,
            
            // 何をするのか
            use: 'ts-loader',
            
            // node_modulesから持ってきたtsファイルはts-loaderの対象から省く
            exclude: /node_modules/
        }]
    },
    resolve: {
        /**
        * import文で記載しているファイル名を拡張子をつけずに記載した場合、
        * extensions配列内に記載した拡張子がついた同名のファイルがあるか検索し、
        * あればそのファイルをimportする。
        * 
        * 検索は配列の左から順番に行う。
        */
        extensions: ['.ts', '.js']
    },
    
    plugins: [
        new webpack.DefinePlugin(envKeys)
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'dist'),  // distディレクトリへのエイリアスを設定
        },
        extensions: ['.js', '.ts', '.tsx'],  // 必要に応じて拡張子を追加
    },
}
