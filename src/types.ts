export type Accent = "pink" | "yellow" | "sky" | "purple";

export type DeliveryMethod = "pickup" | "shipping";

export interface Campaign {
  id: string;
  ipName: string;
  catchCopy: string;
  mascotEmoji: string;
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
  emoji: string;
  requiredStamps: number;
  stockTotal: number;
  stockRemaining: number;
}

export interface RedemptionRecord {
  productId: string;
  deliveryMethod: DeliveryMethod;
  code: string;
  redeemedAt: string;
}
