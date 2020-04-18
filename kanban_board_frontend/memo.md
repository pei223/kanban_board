## デプロイ方法
- SSR静的ファイル
    1. npm run generate_static
    2. /distフォルダに色々生成される
    3. これらの中身全部サーバーに置く
- SSR動的
    1. 一通りclone
    2. npm run buildでビルド
    3. npm run startでデプロイ




## 画面構成
- プロジェクト
    - チケット一覧
- 自タスク管理
- かんばんボード


## 注意点
- npm installで--unsafe_perm=trueが必要なことがある