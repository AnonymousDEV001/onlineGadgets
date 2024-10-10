import React from "react";

const SignoutBtn = ({ onSignout }) => {
  const handleSignout = (e) => {
    e.preventDefault();
    onSignout(); // Call the parent's signout handler
  };
  return (
    <form onSubmit={handleSignout} className="w-full">
      <button
        type="submit"
        className="hover:shadow-lg text-left rounded-md flex items-center gap-2 w-full py-3 px-4"
      >
        <span className="material-symbols-outlined">logout</span>
        <span>Logout</span>
      </button>
    </form>
  );
};

export default SignoutBtn;
