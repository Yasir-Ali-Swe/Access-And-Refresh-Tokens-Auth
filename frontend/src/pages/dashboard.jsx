import React from "react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center w-screen h-screen">
      <h1 className="text-4xl font-bold text-gray-800">Dashboard Page</h1>
      <Button>Click Me</Button>
    </div>
  );
};

export default Dashboard;
