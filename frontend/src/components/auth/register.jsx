import React from "react";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card.jsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Spinner } from "../ui/spinner";
import { Mail, Eye, EyeOff, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/features/auth/authApi.js";
import { toast } from "sonner";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "client",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { mutate, isPending, error } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      toast.success(data.message);
      setFormData({
        fullName: "",
        email: "",
        password: "",
        role: "client",
      });
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
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Please enter your credentials to register.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 relative">
              <Label htmlFor="fullname">FullName</Label>
              <Input
                type="text"
                id="fullname"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Please enter your full name"
              />
              <UserPlus
                className="absolute top-7.5 right-3 text-foreground"
                size={20}
              />
            </div>
            <div className="flex flex-col gap-2 relative mt-3">
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
            <div className="flex flex-col gap-2 relative mt-3">
              <Label htmlFor="role">Select Role</Label>
              <Select
                id="role"
                name="role"
                defaultValue="client"
                onValueChange={(value) =>
                  setFormData({ ...formData, role: value })
                }
              >
                <SelectTrigger className="w-33">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="lawyer">Lawyer</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full mt-6">
              <Button
                disabled={isPending}
                type="submit"
                className="w-full cursor-pointer"
              >
                {isPending ? <Spinner /> : "Register"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 justify-center items-center">
          <p className="text-md text-muted-foreground text-center w-full">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-primary hover:underline underline-offset-4"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
