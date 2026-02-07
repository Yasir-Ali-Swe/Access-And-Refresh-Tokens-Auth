import React from "react";
import { Routes, Route } from "react-router-dom";
import { Auth, Dashboard, VerifyEmail } from "./pages/index.jsx";
import { useAuth } from "@/features/auth/useAuth";
import ProtectedRoutes from "@/routes/protectedRoutes";
import AuthLoader from "@/components/authLoader.jsx";

const App = () => {
  useAuth();
  return (
    <AuthLoader>
      <Routes>
        <Route path="/auth/:form?" element={<Auth />} />
        <Route path="/auth/verify-email/:token" element={<VerifyEmail />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </AuthLoader>
  );
};

export default App;
