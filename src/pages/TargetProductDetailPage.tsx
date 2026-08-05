import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Leaf, ScanLine } from "lucide-react";
import { useAppState } from "../store/AppState";
import { accentClasses } from "../lib/accent";

export function TargetProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { campaigns, targetProducts } = useAppState();

  const product = targetProducts.find((p) => p.id === productId);
  const campaign = product ? campaigns.find((c) => c.id === product.campaignId) : undefined;

  if (!product || !campaign) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-sm text-leaf-500">商品が見つかりませんでした。</p>
        <button
          type="button"
          onClick={() => navigate("/stampbook")}
          className="rounded-full bg-leaf-500 px-4 py-2 text-sm font-bold text-white"
        >
          スタンプ帳に戻る
        </button>
      </div>
    );
  }

  const classes = accentClasses[campaign.accent];

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
          onClick={() => navigate(`/stampbook/${campaign.id}`)}
          className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-leaf-700 shadow"
        >
          <ArrowLeft size={18} />
        </button>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
        <div>
          <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${classes.chipBg} ${classes.chipText}`}>
            {campaign.ipName}
          </span>
          <h1 className="mt-2 text-xl font-extrabold text-leaf-800">{product.name}</h1>
          <p className="mt-1 text-sm text-leaf-500">
            {product.manufacturer} ・ {product.category}
          </p>
          <div className="mt-2 flex items-center gap-4 text-sm font-bold">
            <span className="text-leaf-700">¥{product.price.toLocaleString()}</span>
            <span className="flex items-center gap-1 text-leaf-500">
              <Leaf size={13} />
              CO2 -{product.co2ReductionGrams}g
            </span>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-leaf-100">
          <h2 className="mb-2 text-sm font-extrabold text-leaf-800">商品説明</h2>
          <p className="text-sm leading-relaxed text-leaf-600">{product.description}</p>
        </div>

        <p className="flex items-center gap-1.5 rounded-2xl bg-leaf-100 px-4 py-3 text-xs font-medium text-leaf-600">
          <ScanLine size={14} className="shrink-0 text-leaf-500" />
          この商品を購入してパッケージのQRコードを読み取ると、{campaign.ipName}のスタンプが貯まります。
        </p>
      </div>
    </div>
  );
}
