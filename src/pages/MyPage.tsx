import { Leaf, Sparkles, TrendingUp } from "lucide-react";
import { AppHeader } from "../components/AppHeader";
import { useAppState } from "../store/AppState";
import { formatCo2Grams } from "../lib/co2";

export function MyPage() {
  const { userProfile } = useAppState();

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader title="マイページ" subtitle="あなたのエコ活動をふりかえろう" />

      <div className="flex-1 space-y-5 px-5 py-5">
        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-leaf-100">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-leaf-100 text-2xl font-extrabold text-leaf-600">
              {userProfile.nickname.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-extrabold text-leaf-800">{userProfile.nickname}</p>
              <p className="text-xs font-medium text-leaf-400">ID: {userProfile.userId}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-leaf-100">
            <div className="flex items-center gap-1 text-xs font-bold text-leaf-500">
              <Leaf size={13} />
              これまでの削減量
            </div>
            <p className="mt-2 text-2xl font-black text-leaf-700">
              {formatCo2Grams(userProfile.totalCo2ReductionGrams)}
            </p>
          </div>
          <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-leaf-100">
            <div className="flex items-center gap-1 text-xs font-bold text-leaf-500">
              <TrendingUp size={13} />
              今月の削減量
            </div>
            <p className="mt-2 text-2xl font-black text-leaf-700">
              {formatCo2Grams(userProfile.monthlyCo2ReductionGrams)}
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-leaf-100">
          <div className="flex items-center gap-1.5 border-b border-leaf-100 px-4 py-3">
            <Sparkles size={15} className="text-oshi-pink-dark" />
            <h2 className="text-sm font-extrabold text-leaf-800">推しのデジタルアート</h2>
            <span className="ml-auto rounded-full bg-pink-100 px-2 py-0.5 text-[10px] font-bold text-oshi-pink-dark">
              ポイント交換でGET
            </span>
          </div>
          <img
            src={userProfile.favoriteArt.imageUrl}
            alt={userProfile.favoriteArt.title}
            className="aspect-[4/5] w-full object-cover"
          />
          <p className="px-4 py-3 text-sm font-bold text-leaf-700">{userProfile.favoriteArt.title}</p>
        </div>
      </div>
    </div>
  );
}
