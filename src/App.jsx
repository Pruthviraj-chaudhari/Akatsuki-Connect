/* eslint-disable react-hooks/exhaustive-deps */
import CompleteProfile from "./components/CompleteProfile";
import Welcome from "./components/Welcome";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/Footer";
import Cards from "./components/Cards";
import FullProfile from "./components/FullProfile";
import { useContext, useEffect, useState } from "react";
import AuthPage from "./components/AuthPage";
import { AppContext } from "./contexts/AppContext";
import MyProfile from "./components/MyProfile";
import { toast } from "sonner";
import FullSkeleton from "./components/FullSkeleton";

function App() {
  const { isLogin } = useContext(AppContext);
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const getProfiles = async (page = 1, pageSize = 20) => {
    setLoading(true);
    try {
      const url = `${
        import.meta.env.VITE_API_DATA
      }?page=${page}&pageSize=${pageSize}`;
      const response = await fetch(url);
      const { data, totalPages } = await response.json();
      setProfiles(data);
      localStorage.setItem("profiles", JSON.stringify(data));
      setTotalPages(totalPages);
    } catch (error) {
      toast.error("Error fetching profiles");
      console.error("Error fetching profiles:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProfiles(currentPage);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black bg-grid-white/[0.5] ">
      <div className="flex-grow flex flex-wrap justify-center items-center lg:pt-6 px-1">
        {profiles.length > 0 && (
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route
              path="/profiles"
              element={
                <Cards
                  profiles={profiles}
                  setProfiles={setProfiles}
                  getProfiles={getProfiles}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                  setTotalPages={setTotalPages}
                  loading={loading}
                  setLoading={setLoading}
                />
              }
            />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/fullskeleton" element={<FullSkeleton />} />
            {isLogin ? (
              <Route path="/completeprofile" element={<CompleteProfile />} />
            ) : (
              <Route
                path="/completeprofile"
                element={<Navigate to="/auth" />}
              />
            )}
            <Route
              path="/fullprofile/:id"
              element={<FullProfile />}
            />
          </Routes>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
