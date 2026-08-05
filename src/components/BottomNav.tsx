import { NavLink } from "react-router-dom";
import { QrCode, BookHeart, Gift, User } from "lucide-react";

const tabs = [
  { to: "/mypage", label: "マイページ", icon: User },
  { to: "/scan", label: "QR読み取り", icon: QrCode },
  { to: "/stampbook", label: "スタンプ帳", icon: BookHeart },
  { to: "/exchange", label: "商品交換", icon: Gift },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-20 w-full max-w-md -translate-x-1/2 border-t border-leaf-200 bg-white/95 backdrop-blur">
      <ul className="flex items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {tabs.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-2.5 text-xs font-bold transition-colors ${
                  isActive ? "text-leaf-600" : "text-leaf-300"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-2xl transition-colors ${
                      isActive ? "bg-leaf-100" : ""
                    }`}
                  >
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  </span>
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
