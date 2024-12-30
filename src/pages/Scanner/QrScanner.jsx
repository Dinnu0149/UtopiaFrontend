import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import PageHeader from "../../components/Header/PageHeader";
import "../../styles/main.scss";
import QrCodeScanner from "../../sub-components/Scanner/QrCodeScanner";
import { useNavigate } from "react-router-dom";

function QrScanner() {
  const navigate = useNavigate();
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    const verificationPath = "/TicketVerification";
    if (scannedData) {
      try {
        const url = new URL(scannedData);
        const path = url.pathname + url.search;

        if (path.startsWith(verificationPath)) {
          navigate(path); 
        } else {
          console.error(
            "Scanned data does not start with the verification path."
          );
        }
      } catch (error) {
        console.error("Invalid URL:", error);
      }
    }
  }, [scannedData, navigate]);

  const handleScanResult = (data) => {
    setScannedData(data);
  };

  return (
    <Layout>
      <section className="mx-3">
        <PageHeader title={"QR Scanner"} />
        <div className="mb-5">
          {!scannedData ? (
            <QrCodeScanner onResult={handleScanResult} />
          ) : (
            <div>
              <h5 className="fs-3">Scanned Data</h5>
              <p>This isn't an utopia QR code/ticket, get the right ticket and scan again</p>
              <a href={scannedData} target="blank">{scannedData}</a>
              <button
                onClick={() => setScannedData(null)}
                className="btn text-light bg-success"
              >
                Scan Again
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default QrScanner;
