import React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Mail, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/features/auth/authApi.js";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "@/features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success(data.message);
      setFormData({
        email: "",
        password: "",
      });
      dispatch(setAccessToken(data.accessToken));
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Card className={"w-92.5 lg:w-md my-10 xl:my-0"}>
        <CardHeader className={"text-lg"}>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Please enter your credentials to login.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 relative">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Please enter your email"
              />
              <Mail
                className="absolute top-7.5 right-3 text-foreground"
                size={20}
              />
            </div>
            <div className="flex flex-col gap-2 relative mt-3">
              <Label htmlFor="password">Password</Label>
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Please enter your password"
              />
              {showPassword ? (
                <Eye
                  className="absolute top-7.5 right-3 text-foreground"
                  size={20}
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <EyeOff
                  className="absolute top-7.5 right-3 text-foreground"
                  size={20}
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            <div className="w-full mt-6">
              <Button
                disabled={isPending || isAuthenticated}
                type="submit"
                className="w-full cursor-pointer"
              >
                {isPending ? <Spinner /> : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-md text-muted-foreground text-center w-full">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="text-primary hover:underline underline-offset-4"
            >
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
