import { useState } from "react";
import { Store, Truck, X, CheckCircle2, PackageX } from "lucide-react";
import { AppHeader } from "../components/AppHeader";
import { useAppState } from "../store/AppState";
import { accentClasses } from "../lib/accent";
import type { DeliveryMethod, Product } from "../types";

type ModalStep =
  | { step: "select"; product: Product }
  | { step: "confirm"; product: Product; method: DeliveryMethod }
  | { step: "done"; product: Product; method: DeliveryMethod; code: string };

export function ExchangePage() {
  const { campaigns, products, redeemProduct, isRedeemed } = useAppState();
  const [modal, setModal] = useState<ModalStep | null>(null);

  const activeCampaigns = campaigns.filter((c) => c.status === "active");

  function closeModal() {
    setModal(null);
  }

  function handleConfirmRedeem() {
    if (modal?.step !== "confirm") return;
    const record = redeemProduct(modal.product.id, modal.method);
    if (record) {
      setModal({ step: "done", product: modal.product, method: modal.method, code: record.code });
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader title="商品交換" subtitle="貯めたスタンプでグッズをGET" />

      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-4">
        {activeCampaigns.map((campaign) => {
          const classes = accentClasses[campaign.accent];
          const campaignProducts = products.filter((p) => p.campaignId === campaign.id);

          return (
            <section key={campaign.id}>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xl">{campaign.mascotEmoji}</span>
                <h2 className="font-extrabold text-leaf-800">{campaign.ipName}</h2>
                <span className={`ml-auto rounded-full px-2.5 py-0.5 text-xs font-bold ${classes.chipBg} ${classes.chipText}`}>
                  保有 {campaign.collectedStamps}スタンプ
                </span>
              </div>

              <div className="space-y-3">
                {campaignProducts.map((product) => {
                  const enough = campaign.collectedStamps >= product.requiredStamps;
                  const soldOut = product.stockRemaining <= 0;
                  const redeemed = isRedeemed(product.id);
                  const lowStock = !soldOut && product.stockRemaining <= product.stockTotal * 0.15;

                  return (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-leaf-100"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-leaf-100 text-3xl">
                        {product.emoji}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-extrabold text-leaf-800">{product.name}</p>
                        <p className="text-xs font-bold text-leaf-500">必要スタンプ {product.requiredStamps}個</p>
                        <p className="mt-0.5 text-[11px] font-medium text-leaf-400">
                          {soldOut ? (
                            <span className="inline-flex items-center gap-1 text-red-500">
                              <PackageX size={11} /> 在庫切れ
                            </span>
                          ) : (
                            <>
                              残り{product.stockRemaining}個
                              {lowStock && <span className="ml-1 text-oshi-pink-dark">在庫わずか!</span>}
                            </>
                          )}
                        </p>
                      </div>

                      <button
                        type="button"
                        disabled={!enough || soldOut || redeemed}
                        onClick={() => setModal({ step: "select", product })}
                        className={`shrink-0 rounded-2xl px-3.5 py-2 text-xs font-bold transition-transform active:scale-95 ${
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
                              ? "交換する"
                              : `あと${product.requiredStamps - campaign.collectedStamps}個`}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {modal && (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/40 px-4 pb-24">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-extrabold text-leaf-800">
                {modal.step === "done" ? "交換完了！" : modal.product.name}
              </h2>
              <button type="button" onClick={closeModal} className="text-leaf-300">
                <X size={20} />
              </button>
            </div>

            {modal.step === "select" && (
              <div className="space-y-3">
                <p className="text-sm text-leaf-500">受け取り方法を選んでください</p>
                <button
                  type="button"
                  onClick={() => setModal({ step: "confirm", product: modal.product, method: "pickup" })}
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
                  onClick={() => setModal({ step: "confirm", product: modal.product, method: "shipping" })}
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

            {modal.step === "confirm" && (
              <div className="space-y-4">
                <p className="text-sm text-leaf-600">
                  {modal.method === "pickup" ? "店舗受け取り" : "配送"}で
                  <span className="font-bold">{modal.product.requiredStamps}スタンプ</span>
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

            {modal.step === "done" && (
              <div className="space-y-4 text-center">
                <CheckCircle2 size={40} className="mx-auto text-leaf-500" />
                {modal.method === "pickup" ? (
                  <>
                    <p className="text-sm text-leaf-600">店舗スタッフにこの引換コードを提示してください</p>
                    <p className="rounded-2xl bg-leaf-50 py-4 text-2xl font-black tracking-widest text-leaf-700">
                      {modal.code}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-leaf-600">
                    登録住所へ発送します。発送準備が整い次第、順次お届けします。
                  </p>
                )}
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full rounded-2xl bg-leaf-500 py-3 text-sm font-bold text-white active:scale-95"
                >
                  閉じる
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
