import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useTranslation } from "react-i18next";
import { colors } from "../theme";

function LandingPage() {
  const { isConnected } = useAccount();
  const { t } = useTranslation("");

  return (
    <div
      className={`min-h-screen bg-background text-backgroundText flex flex-col items-center justify-center px-6 pt-8`}
      style={{ paddingTop: "100px", maxWidth: "100vw" }}
    >
      <div
        className={`max-w-5xl text-center relative decorative-border p-10 rounded-lg shadow-[0_0_15px_primary]`}
      >
        <h1
          className="text-4xl md:text-5xl font-serif font-bold tracking-widest mb-5"
          style={{ letterSpacing: "0.2em", fontFamily: "'Cinzel', serif" }}
        >
          {t("title")}
        </h1>
        <p
          className={`text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed font-light text-primary`}
        >
          {t("subtitle")}
        </p>
        {isConnected ? (
          <div className="flex justify-center gap-5 mb-12">
            <a
              href="/submit"
              className={`px-7 py-2 rounded border-2 border-primary text-primary hover:bg-primary hover:text-background transition font-semibold tracking-wide`}
            >
              {t("submitDocument")}
            </a>
            <a
              href="/my-documents"
              className={`px-7 py-2 rounded bg-primary text-background hover:bg-hoverPrimary font-semibold tracking-wide`}
            >
              {t("myDocuments")}
            </a>
          </div>
        ) : (
          <div className="flex justify-center gap-5 mb-12">
            <ConnectButton />
          </div>
        )}
        <div className="flex justify-center mb-8 items-center gap-2">
          <div
            style={{ backgroundColor: colors.primary }}
            className={`w-20 h-1 rounded-full`}
          ></div>
          <div
            style={{ borderColor: colors.primary }}
            className={`w-1.5 h-7 border-2 rounded-sm`}
          ></div>
          <div
            style={{ backgroundColor: colors.primary }}
            className={`w-20 h-1 rounded-full`}
          ></div>
        </div>
        <section
          style={{ color: colors.primary }}
          className={`grid grid-cols-1 md:grid-cols-3 gap-4`}
        >
          <Feature
            title={t("immutableProofTitle")}
            description={t("immutableProofDescription")}
          />
          <Feature
            title={t("privacyFirstTitle")}
            description={t("privacyFirstDescription")}
          />
          <Feature
            title={t("easyAccessibleTitle")}
            description={t("easyAccessibleDescription")}
          />
        </section>
      </div>
      <style>{`
        .decorative-border {
          border: 2px solid ${colors.primary};
          box-shadow: 0 0 15px ${colors.primary};
          position: relative;
        }
        .decorative-border::before {
          content: "";
          position: absolute;
          top: -8px;
          left: -8px;
          right: -8px;
          bottom: -8px;
          border: 1px solid ${colors.primary};
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}

function Feature(props: { title: string; description: string }) {
  const { title, description } = props;
  return (
    <div
      className={`border border-primary rounded-lg p-5 hover:bg-primary hover:text-background transition cursor-default`}
    >
      <h3 className="text-lg font-semibold mb-2 tracking-wide">{title}</h3>
      <p className="text-xs font-light">{description}</p>
    </div>
  );
}

export default LandingPage;
