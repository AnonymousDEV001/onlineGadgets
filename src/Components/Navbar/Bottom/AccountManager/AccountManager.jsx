"use client";
import SignoutBtn from "@/Components/Navbar/Bottom/AccountManager/SignoutBtn/SignoutBtn";
import { handleLogout } from "@/lib/actions";
import React, { useState } from "react";

const AccountManager = ({ session }) => {
  const [toggle, setToggle] = useState(false);

  const handleSignout = () => {
    setToggle(false);
    handleLogout();
  };

  return (
    <>
      {session?.user?.email && (
        <div className="relative">
          <div
            onClick={() => setToggle(!toggle)}
            className="cursor-pointer flex flex-col justify-center items-center"
          >
            <div className="relative">
              <span className="material-symbols-outlined text-3xl text-white">
                account_circle
              </span>
              <div className="bg-orange-400 text-white text-sm w-[1rem] top-0 -right-1 rounded-full absolute h-[1rem] flex justify-center items-center">
                <div>1</div>
              </div>
            </div>
            <span>Account</span>
          </div>

          {toggle ? (
            <div className="absolute shadow-2xl right-0 flex-col top-16 py-3 px-3 rounded-md flex gap-1 justify-center items-center w-60 bg-orange-400 z-[1] text-white">
              <SignoutBtn onSignout={handleSignout} />
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default AccountManager;
