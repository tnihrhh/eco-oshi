import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import {
  initialCampaigns,
  initialProducts,
  initialTargetProducts,
  initialUserProfile,
} from "../data/mockData";
import type {
  Campaign,
  DeliveryMethod,
  Product,
  RedemptionRecord,
  TargetProduct,
  UserProfile,
} from "../types";

interface ScanResult {
  ok: boolean;
  message: string;
  campaign?: Campaign;
}

interface AppStateValue {
  userProfile: UserProfile;
  campaigns: Campaign[];
  products: Product[];
  targetProducts: TargetProduct[];
  redemptions: RedemptionRecord[];
  addStampFromToken: (token: string) => ScanResult;
  redeemProduct: (productId: string, method: DeliveryMethod) => RedemptionRecord | null;
  isRedeemed: (productId: string) => boolean;
}

const AppStateContext = createContext<AppStateValue | null>(null);

function generateCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [userProfile] = useState<UserProfile>(initialUserProfile);
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [targetProducts] = useState<TargetProduct[]>(initialTargetProducts);
  const [redemptions, setRedemptions] = useState<RedemptionRecord[]>([]);
  const [usedTokens, setUsedTokens] = useState<Set<string>>(new Set());

  const addStampFromToken = (token: string): ScanResult => {
    if (usedTokens.has(token)) {
      return { ok: false, message: "このQRコードはすでに使用済みです。" };
    }

    const campaignId = token.split(":")[1];
    const campaign = campaigns.find((c) => c.id === campaignId && c.status === "active");

    if (!campaign) {
      return { ok: false, message: "無効なQRコードです。対象のキャンペーンが見つかりません。" };
    }

    if (campaign.collectedStamps >= campaign.totalSlots) {
      return { ok: false, message: `${campaign.ipName}のスタンプ帳はすでに満了しています。` };
    }

    setUsedTokens((prev) => new Set(prev).add(token));
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === campaign.id ? { ...c, collectedStamps: c.collectedStamps + 1 } : c,
      ),
    );

    return {
      ok: true,
      message: `${campaign.ipName}のスタンプが1つ増えました！`,
      campaign,
    };
  };

  const redeemProduct = (productId: string, method: DeliveryMethod): RedemptionRecord | null => {
    const product = products.find((p) => p.id === productId);
    if (!product || product.stockRemaining <= 0) return null;

    const record: RedemptionRecord = {
      productId,
      deliveryMethod: method,
      code: generateCode(),
      redeemedAt: new Date().toISOString(),
    };

    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, stockRemaining: p.stockRemaining - 1 } : p,
      ),
    );
    setRedemptions((prev) => [...prev, record]);
    return record;
  };

  const isRedeemed = (productId: string) => redemptions.some((r) => r.productId === productId);

  const value = useMemo(
    () => ({
      userProfile,
      campaigns,
      products,
      targetProducts,
      redemptions,
      addStampFromToken,
      redeemProduct,
      isRedeemed,
    }),
    [userProfile, campaigns, products, targetProducts, redemptions],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
