# Fleatz ポートフォリオサイト

素のHTML/CSS/JSのみ。ビルド不要、サーバー不要、AI不要で更新できる。

## 構成

| ファイル | 役割 | 編集するか |
|---|---|---|
| `works.js` | 作品・プロフィール・依頼情報などの中身 | **ここを編集する** |
| `index.html` | 見た目と描画コード | 冒頭の DESIGN TOKENS(色・フォント・寸法・質感)だけは自分で調整してよい |
| `README.md` | この説明 | — |

## 更新のしかた

1. `works.js` をテキストエディタで開く
2. 作品を足すときは `WORKS` 配列の先頭にブロックをコピーして追記
3. `youtubeId` には動画URLの `watch?v=` の後ろ11文字を入れる
4. 保存してブラウザで `index.html` を開けば確認できる

依頼受付の切り替えは `commissionsOpen: true / false` の1箇所。

## ローカルでの確認

`index.html` をダブルクリックで開くだけでよい。
きちんとした確認をしたい場合はターミナルで:

```
cd fleatz-site
python3 -m http.server 8000
```

→ ブラウザで http://localhost:8000

## 公開 (GitHub Pages・無料)

1. GitHubアカウントでリポジトリを新規作成(例: `fleatz-site`、Public)
2. このフォルダの3ファイルをアップロード(ブラウザからドラッグ&ドロップで可)
3. リポジトリの Settings → Pages → Branch を `main` / `(root)` にして Save
4. 数分後 `https://<ユーザー名>.github.io/fleatz-site/` で公開される

以後の更新は `works.js` を編集してコミットするだけ。

独自ドメイン(例: fleatz.jp)を使いたくなったら、同じ Pages 設定画面の
Custom domain に入力し、ドメイン側でCNAMEを設定すればよい。

## Claude Code で改修する場合

このフォルダで `claude` を起動し、たとえば
「worksの一覧をタグで絞り込めるようにして」のように指示すれば
ファイルを直接編集してくれる。設計方針(データはworks.jsに分離、
ビルド無し)を維持するよう伝えること。
