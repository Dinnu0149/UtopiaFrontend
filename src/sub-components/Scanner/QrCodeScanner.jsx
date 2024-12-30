import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function QrCodeScanner({ onResult }) {
  let scanner;

  const startScanner = () => {
    scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    });

    scanner.render(
      (decodedText) => {
        onResult(decodedText);
        scanner.pause();
      },
      (error) => {
        console.warn("QR Code scanning error:", error);
      }
    );
  };

  useEffect(() => {
    return () => {
      if (scanner) {
        scanner
          .clear()
          .catch((err) => console.error("Failed to clear scanner:", err));
      }
    };
  }, [onResult]);

  return (
    <div
      id="qr-reader"
      className="h-50 d-lg-flex justify-content-center gap-5 mb-5"
    >
      <button
        className="btn bg-success text-light text-center"
        onClick={startScanner}
      >
        Start Scan
      </button>
    </div>
  );
}

export default QrCodeScanner;
