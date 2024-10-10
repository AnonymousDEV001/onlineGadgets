import React from "react";
import Top from "./Top/Top";
import Bottom from "./Bottom/Bottom";

const Navbar = async() => {
  return (
    <div className="bg-[#333333] text-sm text-[#737373] px-20">
      <Top/>
      <div className="w-full bg-[#7373734b] h-[1px]"></div>
      <Bottom/>
    </div>
  );
};

export default Navbar;
