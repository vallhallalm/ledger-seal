import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { t, i18n } = useTranslation("");

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="fixed top-2 left-0 right-0 bg-[#D4AF37] text-[#0B1A3F] p-4 flex justify-between items-center rounded-full mx-4 shadow-lg z-50 ">
      <div className="text-2xl font-bold px-4">
        <Link to="/">{t("title")}</Link>
      </div>
      <div className="flex items-center space-x-4">
        <select
          onChange={(e) => changeLanguage(e.target.value)}
          className="bg-transparent text-[#0B1A3F] border border-[#0B1A3F] rounded-full px-3 py-1"
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="es">Español</option>
          <option value="pt">Portuguese</option>
          <option value="de">Deutsch</option>
        </select>
        <div className="mr-4">
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
