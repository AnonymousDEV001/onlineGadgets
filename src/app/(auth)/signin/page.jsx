import SigninWithCredentials from "@/Components/Signin/SigninWithCredentials";
import React from "react";

const page = async () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center md:px-20 py-8 my-10">
        <div className="w-full flex gap-5 bg-white rounded-lg shadow dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <SigninWithCredentials />
        </div>
      </div>
    </section>
  );
};

export default page;
