import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Store, Truck, CheckCircle2, PackageX } from "lucide-react";
import { useAppState } from "../store/AppState";
import { accentClasses } from "../lib/accent";
import type { DeliveryMethod } from "../types";

type FlowStep =
  | { step: "idle" }
  | { step: "select" }
  | { step: "confirm"; method: DeliveryMethod }
  | { step: "done"; method: DeliveryMethod; code: string };

export function ExchangeProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { campaigns, products, redeemProduct, isRedeemed } = useAppState();
  const [flow, setFlow] = useState<FlowStep>({ step: "idle" });

  const product = products.find((p) => p.id === productId);
  const campaign = product ? campaigns.find((c) => c.id === product.campaignId) : undefined;

  if (!product || !campaign) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-sm text-leaf-500">商品が見つかりませんでした。</p>
        <button
          type="button"
          onClick={() => navigate("/exchange")}
          className="rounded-full bg-leaf-500 px-4 py-2 text-sm font-bold text-white"
        >
          一覧に戻る
        </button>
      </div>
    );
  }

  const classes = accentClasses[campaign.accent];
  const enough = campaign.collectedStamps >= product.requiredStamps;
  const soldOut = product.stockRemaining <= 0;
  const redeemed = isRedeemed(product.id);
  const lowStock = !soldOut && product.stockRemaining <= product.stockTotal * 0.15;

  function handleConfirmRedeem() {
    if (flow.step !== "confirm") return;
    const record = redeemProduct(product!.id, flow.method);
    if (record) {
      setFlow({ step: "done", method: flow.method, code: record.code });
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="relative">
        <div className="aspect-square w-full overflow-hidden bg-leaf-100">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-7xl">{product.emoji}</div>
          )}
        </div>
        <button
          type="button"
          onClick={() => navigate("/exchange")}
          className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-leaf-700 shadow"
        >
          <ArrowLeft size={18} />
        </button>
      </div>

      <div className="flex-1 space-y-5 px-5 py-5">
        <div>
          <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${classes.chipBg} ${classes.chipText}`}>
            {campaign.ipName}
          </span>
          <h1 className="mt-2 text-xl font-extrabold text-leaf-800">{product.name}</h1>
          <div className="mt-1 flex items-center gap-3 text-sm font-bold text-leaf-600">
            <span>必要スタンプ {product.requiredStamps}個</span>
            {soldOut ? (
              <span className="inline-flex items-center gap-1 text-red-500">
                <PackageX size={13} /> 在庫切れ
              </span>
            ) : (
              <span className="text-leaf-500">
                残り{product.stockRemaining}個
                {lowStock && <span className="ml-1 text-oshi-pink-dark">在庫わずか!</span>}
              </span>
            )}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-leaf-100">
          <h2 className="mb-2 text-sm font-extrabold text-leaf-800">商品説明</h2>
          <p className="text-sm leading-relaxed text-leaf-600">{product.description}</p>
        </div>

        {flow.step === "idle" && (
          <button
            type="button"
            disabled={!enough || soldOut || redeemed}
            onClick={() => setFlow({ step: "select" })}
            className={`w-full rounded-2xl py-3.5 text-sm font-bold transition-transform active:scale-95 ${
              redeemed
                ? "bg-leaf-100 text-leaf-400"
                : !enough || soldOut
                  ? "bg-leaf-50 text-leaf-300"
                  : `${classes.solidBg} ${classes.solidText} shadow-sm`
            }`}
          >
            {redeemed
              ? "交換済み"
              : soldOut
                ? "在庫切れ"
                : enough
                  ? "この商品と交換する"
                  : `あと${product.requiredStamps - campaign.collectedStamps}個でスタンプが足ります`}
          </button>
        )}

        {flow.step === "select" && (
          <div className="space-y-3 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-leaf-100">
            <p className="text-sm font-bold text-leaf-700">受け取り方法を選んでください</p>
            <button
              type="button"
              onClick={() => setFlow({ step: "confirm", method: "pickup" })}
              className="flex w-full items-center gap-3 rounded-2xl border-2 border-leaf-100 p-4 text-left active:scale-[0.98]"
            >
              <Store size={20} className="text-leaf-500" />
              <div>
                <p className="text-sm font-bold text-leaf-800">店舗受け取り</p>
                <p className="text-xs text-leaf-400">引換コードを店舗で提示</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setFlow({ step: "confirm", method: "shipping" })}
              className="flex w-full items-center gap-3 rounded-2xl border-2 border-leaf-100 p-4 text-left active:scale-[0.98]"
            >
              <Truck size={20} className="text-leaf-500" />
              <div>
                <p className="text-sm font-bold text-leaf-800">配送</p>
                <p className="text-xs text-leaf-400">登録住所へお届け</p>
              </div>
            </button>
          </div>
        )}

        {flow.step === "confirm" && (
          <div className="space-y-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-leaf-100">
            <p className="text-sm text-leaf-600">
              {flow.method === "pickup" ? "店舗受け取り" : "配送"}で
              <span className="font-bold">{product.requiredStamps}スタンプ</span>
              を使用して交換します。よろしいですか？
            </p>
            <button
              type="button"
              onClick={handleConfirmRedeem}
              className="w-full rounded-2xl bg-leaf-500 py-3 text-sm font-bold text-white active:scale-95"
            >
              この内容で交換する
            </button>
          </div>
        )}

        {flow.step === "done" && (
          <div className="space-y-4 rounded-3xl bg-white p-5 text-center shadow-sm ring-1 ring-leaf-100">
            <CheckCircle2 size={40} className="mx-auto text-leaf-500" />
            <p className="text-sm font-extrabold text-leaf-800">交換完了！</p>
            {flow.method === "pickup" ? (
              <>
                <p className="text-sm text-leaf-600">店舗スタッフにこの引換コードを提示してください</p>
                <p className="rounded-2xl bg-leaf-50 py-4 text-2xl font-black tracking-widest text-leaf-700">
                  {flow.code}
                </p>
              </>
            ) : (
              <p className="text-sm text-leaf-600">
                登録住所へ発送します。発送準備が整い次第、順次お届けします。
              </p>
            )}
            <button
              type="button"
              onClick={() => navigate("/exchange")}
              className="w-full rounded-2xl bg-leaf-500 py-3 text-sm font-bold text-white active:scale-95"
            >
              一覧に戻る
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
