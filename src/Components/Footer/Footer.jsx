import React from "react";
import TopFooter from "./TopFooter/TopFooter";

const Footer = () => {
  return (
    <div className="px-20 text-sm text-[#737373]">
      <div className="py-6">
        <TopFooter />
      </div>
      <div className="w-full bg-[#73737336] h-[1px]"></div>
      <div className="flex justify-between py-6">
        <span>Copyright © 2019 Chakoor Store. All Rights Reserved.</span>
        <span>
          <img src="/payments.png" alt="" />
        </span>
      </div>
    </div>
  );
};

export default Footer;
