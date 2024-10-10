import React from "react";
import AccountManager from "./AccountManager/AccountManager";
import { auth } from "@/lib/auth";

const Bottom = async () => {
  const session = await auth();
  return (
    <div className="flex justify-between items-center py-6">
      <div className="text-3xl text-white font-bold flex flex-col items-center justify-center">
        <div>ONLINE</div>
      <div className="text-[#fad815] text-xl">GADGETS</div>
      </div>
      <div className="hidden md:flex w-[35rem] items-center bg-white px-4 rounded-3xl">
        <span className="material-symbols-outlined text-2xl">search</span>
        <input
          placeholder="Search product..."
          type="text"
          className="w-full py-3 px-4 focus:outline-none"
        />
        <span className="material-symbols-outlined text-lg">close</span>
      </div>
      <div className="flex gap-5">
        <AccountManager session={session} />
      </div>
    </div>
  );
};

export default Bottom;
