import type { Campaign, Product, TargetProduct } from "../types";

import meadowsBlossomCard from "../assets/campaigns/meadows-blossom-card.jpg";
import meadowsBlossomPanel from "../assets/campaigns/meadows-blossom-panel.jpg";
import meadowsBlossomKeychain from "../assets/campaigns/meadows-blossom-keychain.jpg";
import kaelenCard from "../assets/campaigns/kaelen-card.jpg";
import kaelenBook from "../assets/campaigns/kaelen-book.jpg";
import kaelenKeychain from "../assets/campaigns/kaelen-keychain.jpg";
import buniBuniPopSticker from "../assets/campaigns/buni-buni-pop-sticker.jpg";

export const initialCampaigns: Campaign[] = [
  {
    id: "meadows-blossom",
    ipName: "Meadow's Blossom",
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
    ipName: "Kaelen, The Aetherweaver",
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
    ipName: "ぶにぶにポップ！",
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
    name: "Meadow's Blossom トレーディングカード",
    emoji: "🐰",
    imageUrl: meadowsBlossomCard,
    requiredStamps: 3,
    stockTotal: 200,
    stockRemaining: 128,
  },
  {
    id: "meadows-blossom-panel",
    campaignId: "meadows-blossom",
    name: "Meadow's Blossom フレームパネル",
    emoji: "🖼️",
    imageUrl: meadowsBlossomPanel,
    requiredStamps: 6,
    stockTotal: 100,
    stockRemaining: 4,
  },
  {
    id: "meadows-blossom-keychain",
    campaignId: "meadows-blossom",
    name: "Meadow's Blossom チャームキーホルダー",
    emoji: "🔑",
    imageUrl: meadowsBlossomKeychain,
    requiredStamps: 10,
    stockTotal: 50,
    stockRemaining: 0,
  },
  {
    id: "kaelen-card",
    campaignId: "kaelen-aetherweaver",
    name: "呪文書デザインカード",
    emoji: "📜",
    imageUrl: kaelenCard,
    requiredStamps: 2,
    stockTotal: 300,
    stockRemaining: 211,
  },
  {
    id: "kaelen-book",
    campaignId: "kaelen-aetherweaver",
    name: "レザーブックカバーノート",
    emoji: "📕",
    imageUrl: kaelenBook,
    requiredStamps: 5,
    stockTotal: 80,
    stockRemaining: 19,
  },
  {
    id: "kaelen-keychain",
    campaignId: "kaelen-aetherweaver",
    name: "アクリルキーホルダー",
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
    manufacturer: "テスト農園",
    category: "食品",
    price: 980,
    co2ReductionGrams: 310,
    emoji: "🌾",
  },
];
