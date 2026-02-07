import React from "react";
import { useParams ,useNavigate} from "react-router-dom";
import { toast } from "sonner";
import { verifyEmail } from "@/features/auth/authApi.js";
import { useMutation } from "@tanstack/react-query";
const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  console.log("Token from URL:", token);

  const { mutate, isPending, error } = useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/auth/login");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  React.useEffect(() => {
    if (token) {
      mutate(token);
    }
  }, [token, mutate]);

  return (
    <div className="flex flex-col gap-5 justify-center items-center w-screen">
      <div className="mt-15 lg:mt-30 text-center">
        <h1 className="text-4xl font-bold text-gray-800 my-5">
          {isPending
            ? `Verifying your email... `
            : error
              ? "Verification Failed"
              : "Email Verified Successfully!"}
        </h1>
      </div>
    </div>
  );
};

export default VerifyEmail;
