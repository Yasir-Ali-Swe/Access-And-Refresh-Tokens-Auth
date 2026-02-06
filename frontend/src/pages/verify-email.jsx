import React from "react";
const VerifyEmail = () => {
  const { token } = useParams();
  return (
    <div className="flex flex-col gap-5 justify-center items-center w-screen">
      <div className="mt-15 lg:mt-30 text-center">
        <h1 className="text-4xl font-bold text-gray-800 my-5">
          Please wait we are verifying your email...
        </h1>
      </div>
    </div>
  );
};

export default VerifyEmail;
