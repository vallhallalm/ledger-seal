import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./i18n.ts";
import WalletConnectProvider from "./walletConnectProvider.tsx";
import Particles from "./components/particlesBackground.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <div style={{ width: "100%", height: "100%", position: "absolute" }}>
      <Particles
        particleColors={["#d4af37", "#d4af37"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
    </div>
    <WalletConnectProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WalletConnectProvider>
  </>
);
