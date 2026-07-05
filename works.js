/* =========================================================
   works.js — サイトの中身はこのファイルだけ編集すればOK
   ---------------------------------------------------------
   ・作品を追加する: WORKS の配列に { ... } を1ブロック足す
   ・並び順: 配列の上から順に表示される(新作を先頭に)
   ・category: WORK_CATEGORIES のいずれかと完全一致させる
     (WORKS内での並び順に関わらず、カテゴリごとにグループ表示される)
   ・youtubeId: 動画URLの watch?v= の後ろの11文字
     例) https://www.youtube.com/watch?v=WMJsnOeGG1o → "WMJsnOeGG1o"
     ロゴデザインなど動画がない作品は "" のままでよい(静止画で表示したい
     場合は player の仕組みごと変更が必要なので、まずは相談を)
   ・youtubeId が空("")の作品は「準備中」表示になる
   ・note: 作品への一言(制作意図・こだわった箇所など)。
     空("")なら何も表示されない。自分の言葉で書くこと
   ========================================================= */

/* WORKS に表示するカテゴリと、その表示順。
   ここに無いカテゴリ名を WORKS の category に書いても表示されないので注意 */
const WORK_CATEGORIES = ["映像制作", "ロゴデザイン"];

const PROFILE = {
  name: "Fleatz",
  role: "Motion Design / 3DCG",
  tools: "After Effects, Blender",
  // 依頼受付の状態: true = 受付中 / false = 停止中
  commissionsOpen: true,
  // 自己紹介文(ABOUTに表示)
  bio: [
    "3DCGとモーショングラフィックスを組み合わせた映像を制作しています。",
    "二次創作MV・リリックモーション・ロゴモーションなど。",
  ],
  // 連絡先・リンク(不要な行は消してよい)
  links: [
    { label: "YouTube", url: "https://www.youtube.com/@Fleatz" },
    { label: "X (Twitter)", url: "" },      // ← 再開したら記入
    { label: "Mail", url: "fleatz123@gmail.com" },             // ← 例: "mailto:xxx@example.com"
  ],
  // 依頼について(COMMISSIONに表示)
  commission: {
    accepts: [
      "二次創作MV / リリックモーション",
      "ロゴモーション・オープニング映像",
      "フル3DCGの短尺映像(ループ・ジングル)",
    ],
    note: "料金・納期は内容により変わるため、まずはDMかメールでご相談ください。",
  },
};

const WORKS = [
  {
    category: "映像制作",
    youtubeId: "WMJsnOeGG1o",
    title: "BREAK IT DOWN — Fleatz part",
    year: "2022",
    type: "ロゴモーション / 合作パート",
    tools: "After Effects / Blender",
    note: "",  // ← 一言(空なら非表示)
  },
  {
    category: "映像制作",
    youtubeId: "1YRfjEukN0s",
    title: "シックス・フィート・アンダー / Aqu3ra 二次創作MV",
    year: "2022",
    type: "二次創作MV / #PVSF2022Sp",
    tools: "After Effects / Blender",
    note: "",  // ← 一言(空なら非表示)
  },
  {
    category: "映像制作",
    youtubeId: "zCdL8Cusa1o",
    title: "リテラシー / wotaku 二次創作MV",
    year: "2022",
    type: "文字PV / 二次創作MV",
    tools: "After Effects",
    note: "",  // ← 一言(空なら非表示)
  },
  {
    category: "映像制作",
    youtubeId: "J31PCcMarDs",
    title: "Crystallized",
    year: "2022",
    type: "自主制作 / 短尺",
    tools: "After Effects / Blender",
    note: "",  // ← 一言(空なら非表示)
  },
  /* --- 追加する時はこのブロックをコピーして使う ---
  {
    category: "映像制作",  // または "ロゴデザイン"
    youtubeId: "",
    title: "",
    year: "2026",
    type: "",
    tools: "",
    note: "",
  },
  ------------------------------------------------- */
];
