import React from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { logout as Logout } from "@/features/auth/authApi.js";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "@/features/auth/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, accessToken } = useSelector(
    (state) => state.auth,
  );
  console.log(user, isAuthenticated, accessToken);
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: Logout,
    onSuccess: (data) => {
      toast.success(data.message);
      dispatch(logoutAction());
      navigate("/auth/login");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Logout failed");
    },
  });
  const handleLogout = () => {
    mutate();
  };
  return (
    <div className="flex flex-col gap-5 justify-center items-center w-screen h-screen">
      <h1 className="text-4xl font-bold text-gray-800">Dashboard Page</h1>
      <Button onClick={handleLogout} disabled={isPending} className="min-w-30">
        {isPending ? <Spinner /> : "Logout"}
      </Button>
    </div>
  );
};

export default Dashboard;
