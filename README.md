# Fleatz ポートフォリオサイト

素のHTML/CSS/JSのみ。ビルド不要、サーバー不要、AI不要で更新できる。

## 構成

| ファイル | 役割 | 編集するか |
|---|---|---|
| `works.js` | 作品・プロフィール・依頼情報などの中身 | **ここを編集する** |
| `index.html` | 見た目と描画コード | 冒頭の DESIGN TOKENS(色・フォント・寸法・質感)だけは自分で調整してよい |
| `images/ui/` | Figmaから取得したロゴ・メニュー・Play/Viewアイコン | UI素材を差し替える場合 |
| `images/works/` | ロゴ等、静止画で見せる作品の画像置き場 | 画像を置いて `works.js` からパスを指定する |
| `publish.command` | ダブルクリックで変更を公開するスクリプト | 更新後にダブルクリックするだけ |
| `README.md` | この説明 | — |

## 更新のしかた

1. `works.js` をテキストエディタで開く
2. 作品を足すときは `WORKS` 配列の先頭にブロックをコピーして追記
3. `youtubeId` には動画URLの `watch?v=` の後ろ11文字を入れる
4. 保存してブラウザで `index.html` を開けば確認できる

依頼受付の切り替えは `commissionsOpen: true / false` の1箇所。

Homeは全作品を制作年（`year`）の新しい順で横スクロール表示します。Worksは`WORK_CATEGORIES`の順でグループ表示し、各カテゴリ内を新しい順に並べます。同年は配列順、年未記入は末尾です。見出しは`WORK_CATEGORY_LABELS`で変更でき、カードから作品詳細に移動します。
動画は詳細で再生を押したときだけ読み込みます。

### 作品詳細・Showreel

- `PROFILE.hero`：HeroのPC用・スマホ用SVGと代替テキスト。文字はアウトライン化されているため、変更するときはFigmaからSVGを書き出して差し替えます。
- `PROFILE.commission.linkLabels`：依頼欄に表示する連絡先。URLは`PROFILE.links`から参照します。
- Homeの前後ボタンは1作品ずつ移動します。大きさは`--scroll-button-size`、作品詳細の見出し部分は`--detail-heading-height`で調整できます。
- `note`：詳細の説明。空なら説明欄ごと非表示。
- `overview: ["段落1", "段落2"]`：長い説明を載せる場合に追加。`note`より優先。
- `gallery: ["images/works/画像.jpg"]`：追加画像。必要な枚数だけ追加でき、未指定なら非表示。
- `id: "作品の識別子"`：任意。タイトルや画像を変更してもURLを維持したい場合に設定し、その後は変更しない。
- `PROFILE.showreel`：タイトル・準備中文言・動画ID。`youtubeId`に完成した動画IDを入れると、準備中文言がクリック再生枠に切り替わる。

### フォントを後から決める

`index.html` の DESIGN TOKENS にある `--disp`（見出し）、`--body`（本文）、`--nav-font`（ナビ）で指定します。
今は既存のAdobe Fontsを仮使用しています。新しいAdobe Fontsを使う場合はWebプロジェクトへの追加も必要です。
`--heading` / `--heading-mobile`、`--body-size`、`--body-leading`でサイズ・行間を調整できます。
`--link-hover-duration`でheader・footerのホバー色変化の速さを調整できます。
変更後はPC・スマホ両方で長い作品名の改行を確認してください。

## 公開する

`publish.command` を **ダブルクリック**すると、変更点を確認したうえで
コミット・push まで自動でやってくれる(https://fleatz.jp に数分で反映)。
初回だけ、右クリック→開く、で一度許可が必要な場合がある。
画像を追加した場合、`images/works/` に置いたファイルも一緒に公開される。

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

- セクションの線は `--frame-line-width`（PC 1px・スマホ 0.5px）と `--frame-line-color` で調整できます。境界は下側だけに描き、縦線はページ全体で共用しています。
- Worksの矢印は作品帯の左右中央に配置しています。画面端からの距離は `--scroll-button-inset` です。
- HeroのSVGはFigmaの文字形状を保持し、共用の縦線を削除済みです。PC版の上下端に近い横線もセクション境界に一本化しています。再書き出し時は重複線に注意してください。

- Worksの帯は `--carousel-bg`、上下の余白は `--carousel-padding`、カード内の文字余白は `--carousel-caption-padding` で調整できます。下部のスクロールバーはドラッグ・キーボード操作に対応し、太さは `--scrollbar-height` です。
