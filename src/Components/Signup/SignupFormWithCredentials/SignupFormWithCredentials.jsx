import React from "react";
import SignupForm from "./SignupForm/SignupForm";

const SignupFormWithCredentials = () => {
  return (
    <div className="p-6 w-full space-y-4 md:space-y-6 sm:p-8">
    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
      Create and account
    </h1>
    <SignupForm/>
  </div>
  );
};

export default SignupFormWithCredentials;
