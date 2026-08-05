import type { Campaign, Product, TargetProduct, UserProfile } from "../types";

import meadowsBlossomCard from "../assets/campaigns/meadows-blossom-card.jpg";
import meadowsBlossomPanel from "../assets/campaigns/meadows-blossom-panel.jpg";
import meadowsBlossomKeychain from "../assets/campaigns/meadows-blossom-keychain.jpg";
import kaelenCard from "../assets/campaigns/kaelen-card.jpg";
import kaelenBook from "../assets/campaigns/kaelen-book.jpg";
import kaelenKeychain from "../assets/campaigns/kaelen-keychain.jpg";
import buniBuniPopSticker from "../assets/campaigns/buni-buni-pop-sticker.jpg";
import oshiArtSleepingCat from "../assets/mypage/oshi-art-sleeping-cat.jpg";

export const initialCampaigns: Campaign[] = [
  {
    id: "meadows-blossom",
    ipName: "ウサギちゃん",
    catchCopy: "お花畑からきた ふわふわうさぎ",
    mascotEmoji: "🐰",
    mascotImageUrl: meadowsBlossomCard,
    accent: "pink",
    totalSlots: 10,
    collectedStamps: 6,
    expiresAt: "2026-09-30",
    status: "active",
  },
  {
    id: "kaelen-aetherweaver",
    ipName: "まじょこ",
    catchCopy: "魔法の書をあやつる 旅する魔術師",
    mascotEmoji: "🧙‍♀️",
    mascotImageUrl: kaelenCard,
    accent: "purple",
    totalSlots: 8,
    collectedStamps: 3,
    expiresAt: "2026-10-15",
    status: "active",
  },
  {
    id: "buni-buni-pop",
    ipName: "ぷにこ",
    catchCopy: "みんなの人気アイドル",
    mascotEmoji: "🎤",
    mascotImageUrl: buniBuniPopSticker,
    accent: "yellow",
    totalSlots: 8,
    collectedStamps: 8,
    expiresAt: "2026-06-30",
    status: "archived",
  },
];

export const initialProducts: Product[] = [
  {
    id: "meadows-blossom-card",
    campaignId: "meadows-blossom",
    name: "ウサギちゃん トレーディングカード",
    description:
      "お花畑を駆け回るウサギちゃんを描いたコレクターズカード。ステータス風のデザインで、飾っても集めても楽しい一枚です。",
    emoji: "🐰",
    imageUrl: meadowsBlossomCard,
    requiredStamps: 3,
    stockTotal: 200,
    stockRemaining: 128,
  },
  {
    id: "meadows-blossom-panel",
    campaignId: "meadows-blossom",
    name: "ウサギちゃん フレームパネル",
    description:
      "アンティーク調の金縁フレームに入った飾りパネル。お部屋に飾ってウサギちゃんをいつも身近に感じられます。",
    emoji: "🖼️",
    imageUrl: meadowsBlossomPanel,
    requiredStamps: 6,
    stockTotal: 100,
    stockRemaining: 4,
  },
  {
    id: "meadows-blossom-keychain",
    campaignId: "meadows-blossom",
    name: "ウサギちゃん チャームキーホルダー",
    description: "バッグや鍵につけられる立体チャームキーホルダー。数量限定の特別デザインです。",
    emoji: "🔑",
    imageUrl: meadowsBlossomKeychain,
    requiredStamps: 10,
    stockTotal: 50,
    stockRemaining: 0,
  },
  {
    id: "kaelen-card",
    campaignId: "kaelen-aetherweaver",
    name: "まじょこ 呪文書デザインカード",
    description: "まじょこが操る魔導書をモチーフにしたカード。呪文とステータスが描かれた凝ったデザインです。",
    emoji: "📜",
    imageUrl: kaelenCard,
    requiredStamps: 2,
    stockTotal: 300,
    stockRemaining: 211,
  },
  {
    id: "kaelen-book",
    campaignId: "kaelen-aetherweaver",
    name: "まじょこ レザーブックカバーノート",
    description: "まじょこの魔導書をイメージしたレザー調ノート。日々の記録も魔法の一冊にしてくれます。",
    emoji: "📕",
    imageUrl: kaelenBook,
    requiredStamps: 5,
    stockTotal: 80,
    stockRemaining: 19,
  },
  {
    id: "kaelen-keychain",
    campaignId: "kaelen-aetherweaver",
    name: "まじょこ アクリルキーホルダー",
    description: "本を抱えたまじょこのアクリルキーホルダー。カバンにつけて相棒気分を味わえます。",
    emoji: "🔑",
    imageUrl: kaelenKeychain,
    requiredStamps: 8,
    stockTotal: 40,
    stockRemaining: 6,
  },
];

export const initialTargetProducts: TargetProduct[] = [
  {
    id: "meadows-blossom-milk",
    campaignId: "meadows-blossom",
    name: "低炭素紙パック牛乳",
    description:
      "森林認証紙を使用した軽量パッケージを採用し、製造・輸送時のCO2排出を抑えた牛乳です。毎日の一杯で、無理なくエコな選択ができます。",
    manufacturer: "テスト乳業",
    category: "乳製品",
    price: 218,
    co2ReductionGrams: 45,
    // テスト表示用の画像（引用元: https://www.holdings.toppan.com/ja/news/2020/12/sto3as0000004lbm-img/TOPPAN_201222_img1.jpg）
    imageUrl:
      "https://www.holdings.toppan.com/ja/news/2020/12/sto3as0000004lbm-img/TOPPAN_201222_img1.jpg",
    emoji: "🥛",
  },
  {
    id: "meadows-blossom-detergent",
    campaignId: "meadows-blossom",
    name: "詰め替え用洗剤（濃縮タイプ）",
    description:
      "濃縮タイプで容器の使用量を削減。詰め替えパックの採用でプラスチックごみも減らせる、環境にやさしい洗剤です。",
    manufacturer: "グリーンクリーン",
    category: "日用品",
    price: 398,
    co2ReductionGrams: 120,
    emoji: "🧴",
  },
  {
    id: "kaelen-tea",
    campaignId: "kaelen-aetherweaver",
    name: "オーガニック緑茶ペットボトル（軽量ボトル）",
    description:
      "有機栽培の茶葉を使用し、ボトルを軽量化することで輸送時のCO2排出を削減しました。すっきりとした味わいのオーガニック緑茶です。",
    manufacturer: "海と大地の飲料",
    category: "飲料",
    price: 158,
    co2ReductionGrams: 30,
    emoji: "🍵",
  },
  {
    id: "kaelen-rice",
    campaignId: "kaelen-aetherweaver",
    name: "スマート農法米 2kg",
    description:
      "センサーを活用した精密農業により、化学肥料の使用量と圃場からの温室効果ガス排出を抑えて栽培したお米です。",
    manufacturer: "テスト農園",
    category: "食品",
    price: 980,
    co2ReductionGrams: 310,
    emoji: "🌾",
  },
];

export const initialUserProfile: UserProfile = {
  nickname: "みどりの旅人",
  userId: "ECO-0042931",
  totalCo2ReductionGrams: 8420,
  monthlyCo2ReductionGrams: 1230,
  favoriteArt: {
    id: "sleeping-cat-under-tree",
    title: "大樹の下でひとやすみ",
    imageUrl: oshiArtSleepingCat,
  },
};
