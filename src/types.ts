export type Accent = "pink" | "yellow" | "sky" | "purple";

export type DeliveryMethod = "pickup" | "shipping";

export interface Campaign {
  id: string;
  ipName: string;
  catchCopy: string;
  mascotEmoji: string;
  mascotImageUrl?: string;
  accent: Accent;
  totalSlots: number;
  collectedStamps: number;
  expiresAt: string;
  status: "active" | "archived";
}

export interface Product {
  id: string;
  campaignId: string;
  name: string;
  description: string;
  emoji: string;
  imageUrl?: string;
  requiredStamps: number;
  stockTotal: number;
  stockRemaining: number;
}

export interface TargetProduct {
  id: string;
  campaignId: string;
  name: string;
  description: string;
  manufacturer: string;
  category: string;
  price: number;
  co2ReductionGrams: number;
  imageUrl?: string;
  emoji: string;
}

export interface RedemptionRecord {
  productId: string;
  deliveryMethod: DeliveryMethod;
  code: string;
  redeemedAt: string;
}
