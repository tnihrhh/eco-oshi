import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import QrScannerWorkerPath from "qr-scanner/qr-scanner-worker.min.js?url";
import { Sparkles, CameraOff, PartyPopper } from "lucide-react";
import { AppHeader } from "../components/AppHeader";
import { useAppState } from "../store/AppState";
import { accentClasses } from "../lib/accent";
import { initialCampaigns } from "../data/mockData";

QrScanner.WORKER_PATH = QrScannerWorkerPath;

type FeedbackState =
  | { kind: "idle" }
  | { kind: "success"; message: string; ipName: string }
  | { kind: "error"; message: string };

export function ScanPage() {
  const { addStampFromToken } = useAppState();
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState>({ kind: "idle" });

  useEffect(() => {
    if (!videoRef.current) return;

    const scanner = new QrScanner(
      videoRef.current,
      (result) => handleDecoded(result.data),
      {
        highlightScanRegion: true,
        highlightCodeOutline: true,
        maxScansPerSecond: 5,
      },
    );
    scannerRef.current = scanner;

    scanner.start().catch(() => {
      setCameraError("カメラを起動できませんでした。ブラウザのカメラ利用を許可してください。");
    });

    return () => {
      scanner.stop();
      scanner.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleDecoded(token: string) {
    const result = addStampFromToken(token);
    if (result.ok && result.campaign) {
      setFeedback({ kind: "success", message: result.message, ipName: result.campaign.ipName });
    } else {
      setFeedback({ kind: "error", message: result.message });
    }
  }

  function handleTestScan() {
    const sampleCampaign = initialCampaigns.find((c) => c.status === "active");
    if (!sampleCampaign) return;
    handleDecoded(`eco-oshi:${sampleCampaign.id}:${Date.now()}`);
  }

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader title="QRコードを読み取る" subtitle="対象商品のQRでスタンプGET" />

      <div className="flex flex-1 flex-col items-center gap-4 overflow-y-auto px-5 py-6">
        <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-3xl bg-leaf-900 shadow-lg ring-4 ring-leaf-200">
          <video ref={videoRef} className="h-full w-full object-cover" muted playsInline />
          {cameraError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-leaf-900/90 px-6 text-center text-sm text-white">
              <CameraOff size={28} />
              <p>{cameraError}</p>
            </div>
          )}
        </div>

        <p className="flex items-center gap-1 text-sm font-bold text-leaf-600">
          <Sparkles size={16} className="text-oshi-pink" />
          商品パッケージのQRコードを枠内に写してね
        </p>

        <button
          type="button"
          onClick={handleTestScan}
          className="mt-1 rounded-full border-2 border-dashed border-leaf-300 px-4 py-2 text-xs font-bold text-leaf-500 active:scale-95"
        >
          🧪 テスト用にサンプルQRを読み取る
        </button>
      </div>

      {feedback.kind !== "idle" && (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/40 px-4 pb-24">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-xl">
            {feedback.kind === "success" ? (
              <>
                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${accentClasses.pink.solidBg} text-white`}
                >
                  <PartyPopper size={28} />
                </div>
                <h2 className="mt-3 text-lg font-extrabold text-leaf-800">スタンプGET!</h2>
                <p className="mt-1 text-sm text-leaf-600">{feedback.message}</p>
              </>
            ) : (
              <>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-500">
                  <CameraOff size={26} />
                </div>
                <h2 className="mt-3 text-lg font-extrabold text-leaf-800">読み取れませんでした</h2>
                <p className="mt-1 text-sm text-leaf-600">{feedback.message}</p>
              </>
            )}
            <button
              type="button"
              onClick={() => setFeedback({ kind: "idle" })}
              className="mt-5 w-full rounded-2xl bg-leaf-500 py-3 text-sm font-bold text-white active:scale-95"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
