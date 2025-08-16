import { colors } from "../theme";
import logo from "/public/logo.png";
import { motion } from "framer-motion";

const LogoLoader = () => {
  return (
    <div
      className={`flex items-center justify-center h-32 w-32 bg-[${colors.background}]`}
    >
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, -5, 5, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="w-32 h-32"
      >
        <img
          src={logo}
          alt="Logo Loader"
          className="w-full h-full object-contain"
        />
      </motion.div>
    </div>
  );
};

export default LogoLoader;
