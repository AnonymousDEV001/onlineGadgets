import React from "react";
import SigninForm from "./SigninForm/SigninForm";

const SigninWithCredentials = () => {
  return (
    <div className="p-6 w-full space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Welcome to Online Gadgets! Please login.
      </h1>
      <SigninForm/>
    </div>
  );
};

export default SigninWithCredentials;
