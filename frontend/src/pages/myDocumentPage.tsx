import { useAccount } from "wagmi";
import { useTranslation } from "react-i18next";
import LogoLoader from "../components/logoLoader";
import { useQuery } from "@tanstack/react-query";
import { getUserDocument } from "../queries/getUserDocument";
import { getJsonRpcProviderForCurrentNetwork } from "../blockchainUtils/jsonRpcProvider";
import { useEffect, useState } from "react";
import { getExplorerUrl } from "../blockchainUtils/blockExporers";
import { colors } from "../theme";

export type SealedDocumentEvent = {
  txHash: string;
  blockNumber: number;
  fileName: string;
  fileHash: string;
  owner: string;
  date: Date;
};

function DocumentHistoryPage() {
  const { isConnected, address } = useAccount();
  const { t } = useTranslation("");

  const { data: documents, isLoading } = useQuery({
    queryKey: ["userDocuments", address],
    queryFn: async () => {
      if (!address) return [];
      const provider = await getJsonRpcProviderForCurrentNetwork();
      return getUserDocument(provider, address);
    },
  });

  const [explorerUrl, setExplorerUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExplorerUrl() {
      const explorer = await getExplorerUrl();
      setExplorerUrl(explorer);
    }

    fetchExplorerUrl();
  }, []);

  return (
    <div
      className={`min-h-screen bg-background text-backgroundText flex flex-col items-center`}
      style={{ paddingTop: "100px", maxWidth: "100vw" }}
    >
      <div
        className={`max-w-5xl relative decorative-border rounded-lg shadow-[0_0_15px_primary w-full h-[80vh] flex flex-col`}
      >
        <div className={`text-center p-6 border-b border-primary`}>
          <h1
            className="text-4xl md:text-5xl font-serif font-bold tracking-widest mb-5"
            style={{ letterSpacing: "0.2em", fontFamily: "'Cinzel', serif" }}
          >
            {t("titleHistory")}
          </h1>
          <div className="flex justify-center mb-8 items-center gap-2">
            <div className={`w-20 h-1 bg-primary rounded-full`}></div>
            <div
              className={`w-1.5 h-7 border-2 border-primary rounded-sm`}
            ></div>
            <div className={`w-20 h-1 bg-primary rounded-full`}></div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 overflow-y-scroll">
          {!isConnected ? (
            <div className={`text-lg md:text-xl font-light text-primary`}>
              {t("notConnectedMessage")}
            </div>
          ) : isLoading ? (
            <div
              className={`text-lg md:text-xl font-light text-primary justify-center items-center flex flex-col mt-8`}
            >
              <LogoLoader />
            </div>
          ) : documents?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {documents.map((doc, index) => (
                <div
                  key={doc.txHash + index}
                  className={`border border-primary rounded-lg p-4 bg-background shadow-md`}
                >
                  <h2 className={`text-lg font-semibold text-primary`}>
                    📄 {doc.fileName}
                  </h2>
                  <p className="text-sm mt-1 break-words">
                    <strong>{t("hash")}</strong> {doc.fileHash}
                  </p>
                  <p className="text-sm mt-1 text-[#aaa]">
                    <strong>{t("block")}</strong> {doc.blockNumber}
                  </p>
                  <p className="text-sm mt-1 text-[#aaa]">
                    <strong>{t("date")}</strong>{" "}
                    {doc.date?.toLocaleString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  {explorerUrl && (
                    <a
                      href={`${explorerUrl}/tx/${doc.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm mt-2 inline-block text-primary underline hover:text-backgroundTextHover`}
                    >
                      {t("viewTx")}
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p
              className={`text-primary text-lg mt-6 justify-center items-center flex`}
            >
              {t("noDocumentsFound") || "No documents found."}
            </p>
          )}
        </div>
      </div>

      <style>{`
        .decorative-border {
          border: 2px solid ${colors.primary};
          box-shadow: 0 0 15px ${colors.primary}cc;
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

export default DocumentHistoryPage;
