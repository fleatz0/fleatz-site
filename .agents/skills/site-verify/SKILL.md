---
name: site-verify
description: fleatz-site の変更を検証する手順一式(構文チェック、ヘッドレスChromeでの見た目・実測確認、公開反映チェック)。index.html/works.js を編集したら必ずこれを回す
---

# site-verify — fleatz-site の検証手順

作業ディレクトリ: `/Users/ryotahanaka/Codex/portfolio`
一時ファイルは `$CLAUDE_JOB_DIR/tmp`(なければ任意のtmp)に置く。リポジトリ内に作らない。

## 1. 構文チェック(毎回必須)

```bash
cd <tmpディレクトリ> && python3 -c "
import re
html = open('/Users/ryotahanaka/Codex/portfolio/index.html').read()
css = re.search(r'<style>(.*?)</style>', html, re.S).group(1)
assert css.count('{') == css.count('}'), 'CSS brace mismatch'
assert css.count('/*') == css.count('*/'), 'CSS comment mismatch'
scripts = re.findall(r'<script>(.*?)</script>', html, re.S)
for i,s in enumerate(scripts): open(f'chk_{i}.js','w').write(s)
print(len(scripts), 'scripts OK')
"
for f in chk_*.js; do node --check "$f"; done
node --check /Users/ryotahanaka/Codex/portfolio/works.js
```

消し残し確認も併用する(削除系の変更時):
`assert '消したはずの文字列' not in html`

## 2. 見た目の確認(ヘッドレス Chrome)

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --hide-scrollbars --force-prefers-reduced-motion \
  --window-size=1280,2600 --screenshot=shot.png \
  --virtual-time-budget=4000 \
  "file:///Users/ryotahanaka/Codex/portfolio/index.html"
```

- `--force-prefers-reduced-motion` を付けるとスクロール出現アニメの
  「まだ透明」状態を排除でき、最終的な見た目で撮れる
- 撮った PNG は Read ツールで開いて目視。下部の確認は PIL で crop する
- **罠: ヘッドレスの最小ウィンドウ幅は500px**。`--window-size=375,...` は
  500pxレイアウトの左375pxが写るだけ。モバイル検証は次の方法で:

```python
# デバッグ用コピーに <style>body{width:375px;margin:0}</style> を注入して
# 500px窓で開き、body基準ではみ出し要素を検出する
```

## 3. 位置・寸法の実測(ズレ疑いは目視でなく数値で)

デバッグ用コピー(リポジトリ外)に測定スクリプトを注入し、
`--dump-dom` で取り出す:

```html
<script>
window.addEventListener('load', () => setTimeout(() => {
  const pre = document.createElement('pre');
  pre.id = 'debugout';
  pre.textContent = JSON.stringify({
    h1: document.querySelector('h1').getBoundingClientRect(),
    // 比較したい要素をここに
  }, null, 2);
  document.body.appendChild(pre);
}, 2000));
</script>
```

```bash
... --headless --dump-dom debug.html | grep -A30 'debugout'
```

getComputedStyle も同様に注入して取れる(過去に padding 上書き事故の
特定に使った。このサイトは shorthand/longhand の詳細度事故が起きやすい)。

## 4. 公開反映の確認(push 後)

```bash
until [ "$(curl -s -o /dev/null -w '%{http_code}' https://fleatz.jp/<変更したパス>)" = "200" ]; do sleep 10; done
```

- 反映は通常60〜90秒。HTML の変更は `curl -s https://fleatz.jp/ | grep <目印>`
- 画像を追加した変更では、`git status` で untracked 画像の
  コミット漏れがないか必ず確認(過去に本番だけ画像404の事故あり)

## 5. push の前提

- `gh auth status` でアクティブアカウントが **fleatz0** であること
- コミットメッセージは日本語で「何を・なぜ」
- 本人の未コミット編集(works.js やトークン)が混ざっていないか
  `git diff` で確認し、無関係な変更は分けるか本人に確認する
