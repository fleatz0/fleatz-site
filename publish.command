#!/bin/bash
# publish.command — ダブルクリックで変更をコミット&公開するスクリプト
# works.js や images/ を編集したあと、このファイルをダブルクリックするだけでよい。
set -e
cd "$(dirname "$0")"

echo "==================================================="
echo " Fleatz サイト公開"
echo "==================================================="
echo ""

git fetch origin main --quiet

# リモートに自分の知らない変更がある場合は先に取り込む(競合を避ける)
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u} 2>/dev/null || echo "")
if [ -n "$REMOTE" ] && [ "$LOCAL" != "$REMOTE" ]; then
  echo "リモート(GitHub)に新しい変更があるので取り込みます..."
  git pull --no-edit
  echo ""
fi

git add -A

if git diff --cached --quiet; then
  echo "公開されていない変更はありません。"
  echo ""
  read -p "Enterキーでウィンドウを閉じます..."
  exit 0
fi

echo "--- 今回コミットする変更 ---"
git status --short
echo "----------------------------"
echo ""

read -p "コミットメッセージ(空欄でEnter = 自動生成): " MSG
if [ -z "$MSG" ]; then
  MSG="サイト更新 ($(date "+%Y-%m-%d %H:%M"))"
fi

git commit -m "$MSG"
echo ""
echo "GitHub に push しています..."
git push

echo ""
echo "==================================================="
echo " 公開が完了しました。"
echo " https://fleatz.jp に数分以内に反映されます。"
echo "==================================================="
echo ""
read -p "Enterキーでウィンドウを閉じます..."
