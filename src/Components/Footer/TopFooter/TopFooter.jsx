import React from "react";

const TopFooter = () => {
  return (
    <div className="flex justify-between flex-wrap gap-4">
      <div className="flex flex-col gap-2 w-[25%]">
        <span className="text-3xl font-bold text-gray-700">CHAKOOR</span>
        <p>
          Praesent dapibus, neque id cursus ucibus, tortor neque egestas augue,
          eu vulputate magna eros eu erat.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-gray-700 font-bold text-lg">Useful Links</span>
        <ul className="flex flex-col gap-1">
          <li className="list-none">About Molla</li>
          <li className="list-none">Our Services</li>
          <li className="list-none">How to shop on Molla</li>
          <li className="list-none">FAQ</li>
          <li className="list-none">Contact us</li>
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-gray-700 font-bold text-lg">
          Customer Service
        </span>
        <ul className="flex flex-col gap-1">
          <li className="list-none">Payment Methods</li>
          <li className="list-none">Money-back guarantee!</li>
          <li className="list-none">Returns</li>
          <li className="list-none">Shipping</li>
          <li className="list-none">Terms and conditions</li>
          <li className="list-none">Privacy Policy</li>
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-gray-700 font-bold text-lg">My Account</span>
        <ul className="flex flex-col gap-1">
          <li className="list-none">Sign In</li>
          <li className="list-none">View Cart</li>
          <li className="list-none">My Wishlist</li>
          <li className="list-none">Track My Order</li>
          <li className="list-none">Help</li>
        </ul>
      </div>
    </div>
  );
};

export default TopFooter;
