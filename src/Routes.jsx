import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignupLoginFormPage from "./Components/SignupLogin/Signup";
import HomePage from "./Components/Notepad/Home";
import { Toaster } from "react-hot-toast";
import "./index.scss";

function RouterComp() {
  return (
    <div>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<SignupLoginFormPage />} />
          <Route path="/main" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RouterComp;
