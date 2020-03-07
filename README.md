# フロントエンド側
## ツールのバージョンなど
- Node: v13.0.0
- npm: 6.13.7

## 動作確認デプロイ
```
npm run dev
```
## SSRモード
```
npm run build
npm run start
```

<br><br>

# API側
## ツールのバージョンなど
- Python 3.8.1

## APIセットアップ]
```
pip install -r requirements.txt
```

## APIサーバー立ち上げ
```
bash migration.sh
bash runserver.sh dev # 動作確認用(ブラウザで操作可能)
bash runserver.sh prod
```
