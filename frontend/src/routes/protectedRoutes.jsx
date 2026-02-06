import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "@/components/ui/spinner";

const ProtectedRoutes = () => {
  const { user, loading } = useSelector((state) => state.auth);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }
  return user ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoutes;
