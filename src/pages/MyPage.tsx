import { Leaf, Sparkles, TrendingUp } from "lucide-react";
import { AppHeader } from "../components/AppHeader";
import { useAppState } from "../store/AppState";
import { formatCo2Grams } from "../lib/co2";

export function MyPage() {
  const { userProfile } = useAppState();

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <AppHeader title="マイページ" subtitle="あなたのエコ活動をふりかえろう" />

      <div className="flex min-h-0 flex-1 flex-col gap-3 px-5 py-3">
        <div className="flex shrink-0 items-center gap-3 rounded-2xl bg-white px-4 py-2.5 shadow-sm ring-1 ring-leaf-100">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-leaf-100 text-sm font-extrabold text-leaf-600">
            {userProfile.nickname.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-extrabold text-leaf-800">{userProfile.nickname}</p>
            <p className="truncate text-[10px] font-medium text-leaf-400">ID: {userProfile.userId}</p>
          </div>

          <div className="h-8 w-px shrink-0 bg-leaf-100" />

          <div className="shrink-0 text-center">
            <p className="flex items-center justify-center gap-0.5 text-[10px] font-bold text-leaf-500">
              <Leaf size={10} />
              累計
            </p>
            <p className="text-sm font-black text-leaf-700">
              {formatCo2Grams(userProfile.totalCo2ReductionGrams)}
            </p>
          </div>

          <div className="shrink-0 text-center">
            <p className="flex items-center justify-center gap-0.5 text-[10px] font-bold text-leaf-500">
              <TrendingUp size={10} />
              今月
            </p>
            <p className="text-sm font-black text-leaf-700">
              {formatCo2Grams(userProfile.monthlyCo2ReductionGrams)}
            </p>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-leaf-100">
          <div className="flex shrink-0 items-center gap-1.5 border-b border-leaf-100 px-4 py-2.5">
            <Sparkles size={14} className="text-oshi-pink-dark" />
            <h2 className="text-xs font-extrabold text-leaf-800">推しのデジタルアート</h2>
            <span className="ml-auto rounded-full bg-pink-100 px-2 py-0.5 text-[9px] font-bold text-oshi-pink-dark">
              ポイント交換でGET
            </span>
          </div>
          <div className="min-h-0 flex-1 overflow-hidden">
            <img
              src={userProfile.favoriteArt.imageUrl}
              alt={userProfile.favoriteArt.title}
              className="h-full w-full object-cover"
            />
          </div>
          <p className="shrink-0 px-4 py-2 text-xs font-bold text-leaf-700">
            {userProfile.favoriteArt.title}
          </p>
        </div>
      </div>
    </div>
  );
}
