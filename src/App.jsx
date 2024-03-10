/* eslint-disable react-hooks/exhaustive-deps */
import CompleteProfile from "./pages/UpdateProfile";
import Welcome from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/Footer";
import Cards from "./pages/Profiles";
import FullProfile from "./pages/FullProfile";
import MyProfile from "./pages/MyProfile";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.user !== null);

  return (
    <>
      <div className="flex flex-col min-h-screen bg-black bg-grid-white/[0.5] ">
        <div className="flex-grow flex flex-wrap justify-center items-center lg:pt-6 px-1">
          <Routes>
            <Route path="/*" element={<Welcome />} />
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/profiles" element={<Cards />} />
            <Route path="/fullprofile/:id" element={<FullProfile />} />
            <Route
              path="/myprofile"
              element={
                isAuthenticated ? <MyProfile /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/completeprofile"
              element={
                isAuthenticated ? <CompleteProfile /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
