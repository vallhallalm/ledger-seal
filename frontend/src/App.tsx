import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Navbar from "./components/navbar"; // Adjust the import path as necessary
import SubmitADocumentPage from "./pages/submitADocumentPage";
import { Toaster } from "react-hot-toast";
import DocumentHistoryPage from "./pages/myDocumentPage";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if (!window.ethereum?.on) return;

    const handleChainChanged = () => {
      window.location.reload();
    };

    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Uncomment and adjust the following routes as needed */}
          <Route path="/submit" element={<SubmitADocumentPage />} />
          <Route path="/my-documents" element={<DocumentHistoryPage />} />
        </Routes>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: "#0B1A3F",
              color: "#d4af37",
              border: "1px solid #d4af37",
              fontFamily: "Cinzel, serif",
            },
          }}
        />
      </div>
    </>
  );
}

export default App;
