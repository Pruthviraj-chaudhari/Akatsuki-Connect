/* eslint-disable react-hooks/exhaustive-deps */
import CompleteProfile from "./components/CompleteProfile";
import Welcome from "./components/Welcome";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/Footer";
import Cards from "./components/Cards";
import FullProfile from "./components/FullProfile";
import { useContext } from "react";
import AuthPage from "./components/AuthPage";
import { AppContext } from "./contexts/AppContext";
import MyProfile from "./components/MyProfile";

function App() {

  const { isLogin } = useContext(AppContext);

  return (
    <div className="flex flex-col min-h-screen bg-black bg-grid-white/[0.5] ">
      <div className="flex-grow flex flex-wrap justify-center items-center lg:pt-6 px-1">
          <Routes>
            <Route path="*" element={<Welcome />} />
            <Route path="/" element={<Welcome />} />
            <Route path="/profiles" element={<Cards />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/fullprofile/:id" element={<FullProfile />} />
            {isLogin ? (
              <Route path="/completeprofile" element={<CompleteProfile />} />
            ) : (
              <Route
                path="/completeprofile"
                element={<Navigate to="/auth" />}
              />
            )}
          </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
