/* =========================================================
   works.js — サイトの中身はこのファイルだけ編集すればOK
   ---------------------------------------------------------
   ・作品を追加する: WORKS の配列に { ... } を1ブロック足す
   ・並び順: year の新しい順。同じ年は配列の上から順、年未記入は末尾
   ・category: WORK_CATEGORIES のいずれかと完全一致させる
     (Homeは全作品を新しい順。Works一覧はカテゴリ順、各カテゴリ内で新しい順に表示)
   ・youtubeId: 動画URLの watch?v= の後ろの11文字
     例) https://www.youtube.com/watch?v=WMJsnOeGG1o → "WMJsnOeGG1o"
   ・image: 静止画(ロゴ等)を表示したい場合に指定するパス
     画像ファイルは images/works/ に置き、"images/works/ファイル名.png" のように指定
     youtubeId と image を両方空にすると「準備中」表示になる
     (youtubeId が入っていれば image より動画を優先して表示)
   ・featured: true ならHomeに掲載、falseならWorks一覧のみに掲載
   ・id: 任意のURL識別子(例 "h2o")。一度設定したら変更しない
   ・overview: 詳細説明の段落配列。省略すると note を表示
   ・gallery: 追加画像パスの配列。省略/空配列なら欄ごと非表示
     例: gallery: ["images/works/ship.jpg"]
     動画も追加可: gallery: [{ youtubeId: "動画ID", title: "メイキング" }]
   ・note: 作品への一言(制作意図・こだわった箇所など)。
     空("")なら何も表示されない。自分の言葉で書くこと
   ========================================================= */

/* 作品に指定できるカテゴリ。
   Works一覧はこの順でグループ表示。作品がないカテゴリは非表示 */
const WORK_CATEGORIES = ["映像制作", "3DCG", "ロゴデザイン"];
// Works一覧の見出し。作品のcategoryは従来どおり日本語で指定する。
const WORK_CATEGORY_LABELS = {
  "映像制作": "Movie",
  "3DCG": "3DCG",
  "ロゴデザイン": "Logo Design",
  other: "Other",
};

const PROFILE = {
  name: "Fleatz",
  hero: { title: "FLEATZ PORTFOLIO", desktop: "images/ui/hero-desktop.svg", mobile: "images/ui/hero-mobile.svg" },
  showreel: {
    title: "SHOWREEL 2026",
    status: "現在準備中 / Work in Progress ...",
    youtubeId: "", // 完成した動画のIDを入れると、準備中文言が再生枠に切り替わる
  },
  role: "Motion Design / 3DCG",
  tools: "After Effects, Blender",
  // 依頼受付の状態: true = 受付中 / false = 停止中
  commissionsOpen: true,
  // 自己紹介文(ABOUTに表示)
  bio: [
    "3DCGとモーショングラフィックスを組み合わせた映像や、ロゴ・シェイプモーション、MV、リリックモーションなどを制作しています。",
    "AfterEffects, Blenderを主に使用しています。",
  ],
  bioEn: [
    "I create visual works combining 3DCG and motion graphics, including logo and shape animations, music videos, and lyric videos.",
    "I mainly work with AfterEffects and Blender.",
  ],
  // 連絡先・リンク(不要な行は消してよい)
  links: [
    { label: "X", url: "https://x.com/Fleatz_" },
    { label: "YouTube", url: "https://www.youtube.com/@Fleatz" },      // ← 再開したら記入
    { label: "Mail", url: "fleatz123@gmail.com" },             // ← 例: "mailto:xxx@example.com"
  ],
  // 依頼について(COMMISSIONに表示)
  commission: {
    acceptsEn: [
      "Music Videos / Promotional Videos / Lyric Videos",
      "Logo Animation / Opening Sequences",
      "Loops / Jingles",
    ],
    noteEn: "For commissions and inquiries, please contact with me via X or mail at Fleatz123@gmail.com.",
    linkLabels: ["Mail", "X"], // PROFILE.linksの連絡先を参照
    openLabel: "現在依頼受付中 / Commissions Open",
    closedLabel: "現在依頼受付停止中 / Commissions Closed",
    accepts: [
      "MV / PV / リリックモーション",
      "ロゴモーション / オープニング映像",
      "ループ / ジングル",
    ],
    note: "Xのメッセージ機能、またはメール (Fleatz123@gmail.com) までご連絡ください。",
  },
};

const WORKS = [
  {
    featured: true, // Homeに載せない作品は false に変更
    category: "映像制作",
    youtubeId: "WMJsnOeGG1o",
    title: "BREAK IT DOWN — Fleatz part",
    year: "2022",
    type: "ロゴモーション / 合作パート",
    note: "",  // ← 一言(空なら非表示)
  },
  {
    featured: true, // Homeに載せない作品は false に変更
    category: "映像制作",
    youtubeId: "1YRfjEukN0s",
    title: "シックス・フィート・アンダー / Aqu3ra 二次創作MV",
    year: "2022",
    type: "二次創作MV / #PVSF2022Sp",
    note: "PVSF2022Sp 出展映像",  // ← 一言(空なら非表示)
  },
  {
    featured: false, // Homeに載せない作品は false に変更
    category: "映像制作",
    youtubeId: "zCdL8Cusa1o",
    title: "リテラシー / wotaku 二次創作MV",
    year: "2022",
    type: "文字PV / 二次創作MV",
    note: "",  // ← 一言(空なら非表示)
  },
  {
    featured: true, // Homeに載せない作品は false に変更
    category: "映像制作",
    youtubeId: "J31PCcMarDs",
    title: "Crystallized",
    year: "2022",
    type: "自主制作 / 短尺",
    note: "",  // ← 一言(空なら非表示)
  },
    {
    featured: false, // Homeに載せない作品は false に変更
    category: "映像制作",
    youtubeId: "l7-ZicpdhvM",
    title: "Elevator",
    year: "2021",
    type: "3DCG / 自主制作",
    note: "",
  },
  {
    featured: false, // Homeに載せない作品は false に変更
    category: "ロゴデザイン",
    youtubeId: "",
    image: "images/works/PVSF_logo.png",  // images/works/ に画像を置いてパスを指定
    title: "PVSF logo",
    year: "2022",
    type: "ロゴ",
    note: "映像上映イベントPVSFのロゴを作成しました。",
  },
  {
    featured: true, // Homeに載せない作品は false に変更
    category: "3DCG",
    youtubeId: "",
    image: "images/works/volume2.jpg",  // images/works/ に画像を置いてパスを指定
    title: "H2O",
    year: "2026",
    type: "",
    note: "",
  },
  {
    featured: false, // Homeに載せない作品は false に変更
    category: "3DCG",
    youtubeId: "",
    image: "images/works/ship.jpg",  // images/works/ に画像を置いてパスを指定
    title: "yacht",
    year: "2023",
    type: "",
    note: "",
  },
   {
    featured: true, // Homeに載せない作品は false に変更
    category: "映像制作",
    youtubeId: "BZy4A7YD7J4",
    title: "Heart of Android",
    year: "2026",
    type: "",
    note: "",
  },
  /* --- 動画作品を追加する時はこのブロックをコピーして使う ---
  {
    featured: true, // Homeに載せない作品は false に変更
    category: "映像制作",
    youtubeId: "",
    title: "",
    year: "2026",
    type: "",
    note: "",
  },
  ------------------------------------------------- */

  /* --- ロゴ・3DCGスチルなど、静止画の作品を追加する時はこちらをコピー ---
  {
    featured: true, // Homeに載せない作品は false に変更
    category: "ロゴデザイン",  // または "3DCG"
    youtubeId: "",
    image: "images/works/ファイル名.png",  // images/works/ に画像を置いてパスを指定
    title: "",
    year: "2026",
    type: "",
    note: "",
  },
  ------------------------------------------------- */
];
