import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Clock, CheckCircle2 } from "lucide-react";
import { AppHeader } from "../components/AppHeader";
import { useAppState } from "../store/AppState";
import { accentClasses } from "../lib/accent";
import { daysUntil, formatDateJp } from "../lib/date";

type Tab = "active" | "archived";

export function StampBookListPage() {
  const { campaigns } = useAppState();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("active");

  const filtered = campaigns.filter((c) => c.status === tab);

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader title="スタンプ帳" subtitle="推しキャラごとにスタンプが貯まるよ" />

      <div className="flex gap-2 px-5 pt-4">
        {(
          [
            { key: "active" as Tab, label: "進行中" },
            { key: "archived" as Tab, label: "アーカイブ" },
          ]
        ).map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${
              tab === key ? "bg-leaf-500 text-white shadow-sm" : "bg-white text-leaf-400"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-5 py-4">
        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-leaf-400">
            {tab === "active" ? "進行中のスタンプ帳はありません" : "アーカイブはまだありません"}
          </p>
        )}

        {filtered.map((campaign) => {
          const classes = accentClasses[campaign.accent];
          const complete = campaign.collectedStamps >= campaign.totalSlots;
          const left = daysUntil(campaign.expiresAt);

          return (
            <button
              key={campaign.id}
              type="button"
              onClick={() => navigate(`/stampbook/${campaign.id}`)}
              className="flex items-center gap-3 rounded-3xl bg-white p-4 text-left shadow-sm ring-1 ring-leaf-100 active:scale-[0.98]"
            >
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${classes.gradient} text-3xl shadow-inner`}
              >
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

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h2 className="truncate font-extrabold text-leaf-800">{campaign.ipName}</h2>
                  {complete && <CheckCircle2 size={15} className="shrink-0 text-leaf-500" />}
                </div>
                <p className="truncate text-xs text-leaf-500">{campaign.catchCopy}</p>

                <div className="mt-2 flex items-center gap-2">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-leaf-100">
                    <div
                      className={`h-full ${classes.solidBg}`}
                      style={{
                        width: `${Math.min(100, (campaign.collectedStamps / campaign.totalSlots) * 100)}%`,
                      }}
                    />
                  </div>
                  <span className="shrink-0 text-xs font-bold text-leaf-600">
                    {campaign.collectedStamps}/{campaign.totalSlots}
                  </span>
                </div>

                <p className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-leaf-400">
                  <Clock size={11} />
                  {tab === "active"
                    ? left >= 0
                      ? `あと${left}日で終了（${formatDateJp(campaign.expiresAt)}まで）`
                      : "本日で終了"
                    : `${formatDateJp(campaign.expiresAt)}に終了`}
                </p>
              </div>

              <ChevronRight size={18} className="shrink-0 text-leaf-300" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
