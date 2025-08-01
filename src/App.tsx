import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Navbar from "./components/navbar"; // Adjust the import path as necessary
import SubmitADocumentPage from "./pages/submitADocumentPage";

function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Uncomment and adjust the following routes as needed */}
          <Route path="/submit" element={<SubmitADocumentPage />} />
          {/* <Route path="/mydocs" element={<About />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
