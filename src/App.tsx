import { Navigate, Route, Routes } from "react-router-dom";
import { BottomNav } from "./components/BottomNav";
import { AppStateProvider } from "./store/AppState";
import { ScanPage } from "./pages/ScanPage";
import { StampBookListPage } from "./pages/StampBookListPage";
import { StampBookDetailPage } from "./pages/StampBookDetailPage";
import { ExchangePage } from "./pages/ExchangePage";

function App() {
  return (
    <AppStateProvider>
      <div className="mx-auto flex min-h-svh w-full max-w-md flex-col bg-leaf-50 pb-20">
        <Routes>
          <Route path="/" element={<Navigate to="/scan" replace />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/stampbook" element={<StampBookListPage />} />
          <Route path="/stampbook/:campaignId" element={<StampBookDetailPage />} />
          <Route path="/exchange" element={<ExchangePage />} />
        </Routes>
        <BottomNav />
      </div>
    </AppStateProvider>
  );
}

export default App;
