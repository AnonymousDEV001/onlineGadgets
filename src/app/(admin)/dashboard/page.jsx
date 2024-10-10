import FinilizePrice from "@/Components/FinilizePrice/FinilizePrice";
import { getProducts, getUserData } from "@/lib/data";
import React from "react";

const page = async () => {
  const products = await getProducts();

  return (
    <div className="flex gap-2">
      {products.map((product, index) => {
        return <Card key={index} product={product} />;
      })}
    </div>
  );
};

export default page;

const Card = async ({ product }) => {
  console.log(product);
  const user = await getUserData(product.userId);
  console.log(user)
  return (
    <>
      {/* <div className="p-4 border">
        <div>User Details</div>
        <div>Name : {user.name}</div>
        <div>Email : {user.email}</div>
        <div>Phone Number : {user.phNo}</div>
        <div>Product Details</div>
        <div>Brand : {product.brand}</div>
        <div>Storage : {product.brand}</div>
        <div>Defects : {product.defects}</div>
        <div>Condition : {product.condition}</div>
        <div>Serial Number : {product.serialNumber}</div>
        <div>Serial Number : {product.estimatedPrice}</div>
        <img src={product.imageUrl} width="200px" alt="" />
        <FinilizePrice/>
      </div> */}
    </>
  );
};
