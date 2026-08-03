import { Leaf } from "lucide-react";

export function AppHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="sticky top-0 z-10 flex items-center gap-2 border-b border-leaf-200 bg-leaf-50/95 px-5 py-4 backdrop-blur">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-leaf-400 text-white shadow-sm">
        <Leaf size={18} strokeWidth={2.5} />
      </span>
      <div>
        <h1 className="text-lg font-extrabold leading-tight text-leaf-800">{title}</h1>
        {subtitle && <p className="text-xs font-medium text-leaf-500">{subtitle}</p>}
      </div>
    </header>
  );
}
