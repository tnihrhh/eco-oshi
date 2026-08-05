import { Navigate, Route, Routes } from "react-router-dom";
import { BottomNav } from "./components/BottomNav";
import { AppStateProvider } from "./store/AppState";
import { MyPage } from "./pages/MyPage";
import { ScanPage } from "./pages/ScanPage";
import { StampBookListPage } from "./pages/StampBookListPage";
import { StampBookDetailPage } from "./pages/StampBookDetailPage";
import { ExchangePage } from "./pages/ExchangePage";
import { ExchangeProductDetailPage } from "./pages/ExchangeProductDetailPage";
import { TargetProductDetailPage } from "./pages/TargetProductDetailPage";

function App() {
  return (
    <AppStateProvider>
      <div className="mx-auto flex h-svh w-full max-w-md flex-col overflow-hidden bg-leaf-50 pb-20">
        <Routes>
          <Route path="/" element={<Navigate to="/mypage" replace />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/stampbook" element={<StampBookListPage />} />
          <Route path="/stampbook/:campaignId" element={<StampBookDetailPage />} />
          <Route path="/target/:productId" element={<TargetProductDetailPage />} />
          <Route path="/exchange" element={<ExchangePage />} />
          <Route path="/exchange/:productId" element={<ExchangeProductDetailPage />} />
        </Routes>
        <BottomNav />
      </div>
    </AppStateProvider>
  );
}

export default App;
