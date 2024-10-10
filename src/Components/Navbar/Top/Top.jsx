import { auth } from "@/lib/auth";
import Link from "next/link";
import React from "react";

const Top = async () => {
  const session = await auth();
  return (
    <div className="top flex  justify-between py-2">
      <div className="flex gap-1 items-center">
        <span className="material-symbols-outlined text-xl">call</span>
        <span>Call: +0123 456 789</span>
      </div>
      <div className={"flex gap-4"}>
        {!session?.user?.email && (
          <span>
            <Link href={"/signin"} className="hover:text-orange-300">
              <span>Sign in</span>
            </Link>{" "}
            /{" "}
            <Link href={"/signup"} className="hover:text-orange-300">
              <span>Sign up</span>
            </Link>
          </span>
        )}
        {session?.user?.isAdmin && (
          <span>
            <Link href={"/dashboard"} className="hover:text-orange-300">
              <span>Dashboard</span>
            </Link>
          </span>
        )}
        <span>
          <Link
            className={"text-orange-300"}
            href={"/sell"}
          >
            <span>Sell Product</span>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Top;
