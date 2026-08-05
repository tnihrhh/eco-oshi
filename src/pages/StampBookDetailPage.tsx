import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Archive, Leaf, ScanLine } from "lucide-react";
import { useAppState } from "../store/AppState";
import { StampGrid } from "../components/StampGrid";
import { accentClasses } from "../lib/accent";
import { daysUntil, formatDateJp } from "../lib/date";

export function StampBookDetailPage() {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const { campaigns, products, targetProducts } = useAppState();

  const campaign = campaigns.find((c) => c.id === campaignId);

  if (!campaign) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-sm text-leaf-500">スタンプ帳が見つかりませんでした。</p>
        <button
          type="button"
          onClick={() => navigate("/stampbook")}
          className="rounded-full bg-leaf-500 px-4 py-2 text-sm font-bold text-white"
        >
          一覧に戻る
        </button>
      </div>
    );
  }

  const classes = accentClasses[campaign.accent];
  const left = daysUntil(campaign.expiresAt);
  const milestoneSlots = products
    .filter((p) => p.campaignId === campaign.id)
    .map((p) => p.requiredStamps);
  const campaignTargetProducts = targetProducts.filter((p) => p.campaignId === campaign.id);

  return (
    <div className="flex flex-1 flex-col">
      <div className={`bg-gradient-to-br ${classes.gradient} px-5 pb-8 pt-5 text-white`}>
        <button
          type="button"
          onClick={() => navigate("/stampbook")}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/25"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white/25 text-4xl">
            {campaign.mascotImageUrl ? (
              <img
                src={campaign.mascotImageUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              campaign.mascotEmoji
            )}
          </div>
          <div>
            <h1 className="text-xl font-extrabold">{campaign.ipName}</h1>
            <p className="text-sm font-medium text-white/90">{campaign.catchCopy}</p>
          </div>
        </div>

        <p className="mt-4 flex items-center gap-1 text-xs font-bold text-white/90">
          {campaign.status === "archived" ? <Archive size={13} /> : <Clock size={13} />}
          {campaign.status === "archived"
            ? `${formatDateJp(campaign.expiresAt)}に終了（アーカイブ）`
            : left >= 0
              ? `あと${left}日で終了 ・ ${formatDateJp(campaign.expiresAt)}まで`
              : "本日で終了"}
        </p>
      </div>

      <div className="flex-1 space-y-5 px-5 py-5">
        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-leaf-100">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-extrabold text-leaf-800">スタンプカード</h2>
            <span className="text-sm font-bold text-leaf-600">
              {campaign.collectedStamps} / {campaign.totalSlots}
            </span>
          </div>
          <StampGrid
            totalSlots={campaign.totalSlots}
            collected={campaign.collectedStamps}
            accent={campaign.accent}
            mascotEmoji={campaign.mascotEmoji}
            mascotImageUrl={campaign.mascotImageUrl}
            milestoneSlots={milestoneSlots}
          />
          <p className="mt-3 text-[11px] text-leaf-400">
            <span className="mr-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-white align-middle ring-1 ring-oshi-pink" />
            マークのついたマスは商品交換のボーダーラインだよ
          </p>
        </div>

        {campaign.status === "archived" && (
          <p className="rounded-2xl bg-leaf-100 px-4 py-3 text-xs font-medium text-leaf-600">
            このスタンプ帳は期間終了のためアーカイブされました。未交換分のスタンプは失効しています。
          </p>
        )}

        {campaignTargetProducts.length > 0 && (
          <div>
            <div className="mb-3 flex items-center gap-1.5">
              <ScanLine size={16} className="text-leaf-500" />
              <h2 className="font-extrabold text-leaf-800">対象商品</h2>
              <span className="text-xs font-medium text-leaf-400">購入してQRを読み取るとスタンプGET</span>
            </div>

            <ul className="space-y-3">
              {campaignTargetProducts.map((product) => (
                <li
                  key={product.id}
                  onClick={() => navigate(`/target/${product.id}`)}
                  className="flex items-center gap-3 rounded-3xl bg-white p-3 shadow-sm ring-1 ring-leaf-100 active:scale-[0.99]"
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-leaf-100 text-2xl">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      product.emoji
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-extrabold text-leaf-800">{product.name}</p>
                    <p className="text-xs text-leaf-500">
                      {product.manufacturer} ・ {product.category}
                    </p>
                    <div className="mt-1 flex items-center gap-3 text-xs font-bold">
                      <span className="text-leaf-700">¥{product.price.toLocaleString()}</span>
                      <span className="flex items-center gap-0.5 text-leaf-500">
                        <Leaf size={11} />
                        CO2 -{product.co2ReductionGrams}g
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
