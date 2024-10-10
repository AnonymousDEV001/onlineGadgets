"use client"
import ProductSellForm from "@/Components/ProductSellForm/ProductSellForm";
import Link from "next/link";
import React from "react";
import { useState } from "react";

const page = () => {
  const [category,setCategory]= useState("")
  return (
    <div className={"flex justify-center items-center flex-col h-full w-full"}>
      <div>
        <h2 className={"font-medium text-2xl my-3"}>Device Category</h2>
      </div>
      <p>Select the type of device you want to sell</p>
      <div className={"w-[80%] flex flex-col gap-2"}>
        <label htmlFor="deviceType" className={"font-semibold"}>
          Category
        </label>
        <select
        onChange={(e)=>{
          if(e.target.value === "none"){
            return
          }
          setCategory(e.target.value)
        }}
          className={"border px-2 py-1 outline-none"}
          name=""
          id="deviceType"
        >
          <option value="none">Select</option>
          <option value="smartPhones">Smart Phones</option>
          <option value="tablet">Tablet</option>
          <option value="laptop">Laptop</option>
        </select>
        <div className={"flex w-full"}>
          <Link href={`/sell/${category}`}>
          <button className={"bg-green-600 text-white px-3 py-1"}>NEXT</button>
          </Link>
        </div>
      </div>
      {/* <ProductSellForm/> */}
    </div>
  );
};

export default page;
