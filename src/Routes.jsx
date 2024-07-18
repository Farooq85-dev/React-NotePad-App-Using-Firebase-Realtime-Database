import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignupLoginFormPage from "./Components/SignupLogin/Signup";
import HomePage from "./Components/Notepad/Home";
import { Toaster } from "react-hot-toast";
import { useUser } from "./Components/Context/Store";
import { useEffect, useState } from "react";
import "./index.scss";

function RouterComp() {
  const [loading, setLoading] = useState(true);
  const user = useUser();

  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      null;
    }
  }, [user]);

  if (loading) {
    return (
      <div className="loaderDiv">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<SignupLoginFormPage />} />
          <Route
            path="/main"
            element={user ? <HomePage /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RouterComp;
