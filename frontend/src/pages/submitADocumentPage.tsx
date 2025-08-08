import { useAccount } from "wagmi";
import { useTranslation } from "react-i18next";
import FileDropzone from "../components/fileDropZone";
import { useEffect, useState } from "react";
import { keccak256 } from "js-sha3";
import LogoLoader from "../components/logoLoader";
import { useMutation } from "@tanstack/react-query";
import { useEthersSigner } from "../blockchainUtils/signer";
import { commitDocument } from "../queries/commitDocument";
import { toast } from "react-hot-toast";
import type { ContractTransactionReceipt } from "ethers";
import { useNavigate } from "react-router-dom";

const hashFileKeccak = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const hashHex = keccak256(new Uint8Array(arrayBuffer));
  return hashHex;
};

function SubmitADocumentPage() {
  const { isConnected } = useAccount();
  const { t } = useTranslation("");
  const signer = useEthersSigner();
  const { address: accountAddress } = useAccount();
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [fileHash, setFileHash] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      hashFileKeccak(file).then((hash) => {
        setFileHash(hash);
      });
    }
  }, [file]);

  const { mutate: commitDoc, isPending } = useMutation({
    mutationFn: async () => {
      if (!file || !fileHash || !signer || !accountAddress) return;
      const result = await commitDocument(
        signer,
        accountAddress,
        file.name,
        fileHash
      );
      return result;
    },
    onSuccess: (data: ContractTransactionReceipt) => {
      setFile(null);
      setFileHash(null);
      navigate("/my-documents");
      toast.custom(
        (t) => (
          <div
            className={`max-w-sm w-full bg-[#0B1A3F] text-[#d4af37] border border-[#d4af37] rounded-lg shadow-lg px-4 py-3 transition-opacity ${
              t.visible ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-sm font-semibold">
              ✅ Document committed successfully
            </p>
            <a
              href={`https://testnet.chiliscan.com/tx/${data.hash}`}
              target="_blank"
              onClick={() => toast.dismiss(t.id)}
              className="mt-2 inline-block text-sm underline hover:text-[#f5e9c3] transition"
            >
              🔍 View details
            </a>
          </div>
        ),
        {
          duration: 8000,
        }
      );
    },
    onError: (error) => {
      console.error("Error committing document:", error);
      toast.error("Failed to commit document.");
    },
  });

  return (
    <div
      className="min-h-screen bg-[#0B1A3F] text-[#F5F1E9] flex flex-col items-center justify-center px-6 pt-8"
      style={{ paddingTop: "100px", maxWidth: "100vw" }}
    >
      <div className="max-w-5xl text-center relative decorative-border p-10 rounded-lg shadow-[0_0_15px_#d4af37cc]">
        <h1
          className="text-4xl md:text-5xl font-serif font-bold tracking-widest mb-5"
          style={{ letterSpacing: "0.2em", fontFamily: "'Cinzel', serif" }}
        >
          {t("titleSubmit")}
        </h1>
        <div className="flex justify-center mb-8 items-center gap-2">
          <div className="w-20 h-1 bg-[#d4af37] rounded-full"></div>
          <div className="w-1.5 h-7 border-2 border-[#d4af37] rounded-sm"></div>
          <div className="w-20 h-1 bg-[#d4af37] rounded-full"></div>
        </div>
        <div>
          {isConnected ? (
            <div className="text-lg md:text-xl font-light text-[#d4af37]">
              <FileDropzone file={file} setFile={setFile} />
              {!!file && (
                <div className="justify-center items-center flex flex-col mt-8">
                  {fileHash && !isPending ? (
                    <div className="justify-center items-center flex flex-col">
                      <button
                        className="px-7 py-2 rounded bg-[#d4af37] text-[#0B1A3F] hover:bg-[#c9a932] font-semibold tracking-wide"
                        onClick={() => commitDoc()}
                      >
                        {t("broadcast")}
                      </button>
                    </div>
                  ) : (
                    <div className="justify-center items-center flex flex-col">
                      <LogoLoader />
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-lg md:text-xl font-light text-[#d4af37]">
              {t("notConnectedMessage")}
            </div>
          )}
        </div>
      </div>
      <style>{`
        .decorative-border {
          border: 2px solid #d4af37;
          box-shadow: 0 0 15px #d4af37cc;
          position: relative;
        }
        .decorative-border::before {
          content: "";
          position: absolute;
          top: -8px;
          left: -8px;
          right: -8px;
          bottom: -8px;
          border: 1px solid #d4af37;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}

export default SubmitADocumentPage;
