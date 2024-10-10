"use client";
import React, { useState, useRef } from "react";
import { useFormStatus } from "react-dom";
import { useSession } from "next-auth/react";

// Modal component to show estimated price
const Modal = ({
  isOpen,
  onClose,
  setEstimatedPrice,
  brand,
  year,
  condition,
  storage,
  defects,
  imei,
  image,
  delivery,
  setIsModalOpen,
  estimatedPrice,
}) => {
  if (!isOpen) return null;


  const { data: session } = useSession();
  console.log(session)

  const handleSubmit = async (e) => {
    if(session.user == undefined){
      return
    }
    e.preventDefault();
    try {
      const response = await fetch("/api/submit-product", {
        method: "POST",
        body: JSON.stringify({
          brand,
          year,
          defects,
          storage,
          imei,
          image,
          delivery,
          estimatedPrice,
          userId: session?.user?.id,
          condition,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to submit product");
      const result = await response.json();
      console.log(result.message);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-5 rounded-lg shadow-lg max-w-lg w-full">
          <div className="flex gap-2 justify-end">
            <button type="submit" className="text-green-500 float-right">
              Submit
            </button>
            <button className="text-red-500 float-right" onClick={onClose}>
              Cancel
            </button>
          </div>
          <h3 className="text-2xl font-semibold mb-3">Estimated Price</h3>
          <p className="text-xl">
            The estimated price of your product is: ${estimatedPrice}
          </p>
        </div>
      </div>
    </form>
  );
};

const ProductSellForm = () => {
  const formRef = useRef(null);

  const estimatePrice = (brand, year, condition, storage, defects) => {
    let basePrice = 500; // Starting price

    // Adjust based on brand (for simplicity, adding flat values based on brand)
    if (brand.toLowerCase().includes("apple")) basePrice += 300;
    if (brand.toLowerCase().includes("samsung")) basePrice += 200;

    // Year of purchase adjustment (newer devices are more valuable)
    const age = new Date().getFullYear() - parseInt(year);
    basePrice -= age * 50;

    // Condition adjustment
    if (condition.toLowerCase() === "new") basePrice += 200;
    if (condition.toLowerCase() === "good") basePrice += 100;
    if (condition.toLowerCase() === "fair") basePrice -= 50;
    if (condition.toLowerCase() === "poor") basePrice -= 100;

    // Storage capacity adjustment
    if (parseInt(storage) == 128) basePrice += 150;
    else if (parseInt(storage) == 64) basePrice += 100;
    else if (parseInt(storage) == 32) basePrice += 50;

    // Defects decrease the price
    if (defects.toLowerCase() !== "none") basePrice -= 100;

    // Final estimated price
    return basePrice > 0 ? basePrice : 0;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  const [brand, setBrand] = useState("none");
  const [year, setYear] = useState("");
  const [condition, setCondition] = useState("none");
  const [storage, setStorage] = useState("none");
  const [defects, setDefects] = useState("");
  const [imei, setImei] = useState("");
  const [image, setImage] = useState("");
  const [delivery, setDelivery] = useState("none");

  const [error, setError] = useState(null);

  // Basic price estimation algorithm based on form data

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center items-center flex-col gap-2 h-full w-full my-10">
      <h3 className="text-2xl font-semibold">Gadget Details</h3>
      <form className="flex flex-col gap-1 w-[80%]">
        <input
          type="text"
          className="border p-3"
          name="year"
          onChange={(e) => {
            setYear(e.target.value);
          }}
          value={year}
          placeholder="Year of Purchase"
          required
        />

        <input
          type="text"
          className="border p-3"
          name="defects"
          onChange={(e) => {
            setDefects(e.target.value);
          }}
          value={defects}
          placeholder="Defects"
          required
        />
        <input
          type="text"
          className="border p-3"
          name="imei"
          value={imei}
          onChange={(e) => setImei(e.target.value)}
          placeholder="Serial Number or IMEI"
          required
        />
        <input
          type="text"
          className="border p-3"
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
          required
        />
        <select
          className="border p-2"
          name="brand"
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
          }}
          required
        >
          <option value="none">Select Brand</option>
          <option value="apple">Apple</option>
          <option value="samsung">Samsung</option>
        </select>
        <select
          className="border p-2"
          name="condition"
          value={condition}
          onChange={(e) => {
            setCondition(e.target.value);
          }}
          required
        >
          <option value="none">Select Condition</option>
          <option value="new">new</option>
          <option value="good">good</option>
          <option value="fair">fair</option>
          <option value="poor">poor</option>
        </select>
        <select
          className="border p-2"
          name="storage"
          value={storage}
          onChange={(e) => {
            setStorage(e.target.value);
          }}
          required
        >
          <option value="none">Select Storage</option>
          <option value="128">128</option>
          <option value="64">64</option>
          <option value="32">32</option>
        </select>
        <select
          className="border p-2"
          name="delivery"
          value={delivery}
          onChange={(e) => {
            setDelivery(e.target.value);
          }}
          required
        >
          <option value="none">Select</option>
          <option value="pickup">Pickup Service</option>
          <option value="parcel">Parcel Service</option>
        </select>
        {error && <p className="text-red-500">{error}</p>}
        <button
          className="bg-green-600 p-2 text-white mt-4"
          onClick={(e) => {
            e.preventDefault();
            const estimatedPrice = estimatePrice(
              brand,
              year,
              condition,
              storage,
              defects
            );
            setEstimatedPrice(estimatedPrice);

            if (
              brand !== "none" &&
              year.length > 0 &&
              condition !== "none" &&
              storage !== "none" &&
              delivery.length > 0 &&
              imei.length > 0 &&
              image.length > 0
            ) {
              return setIsModalOpen(true);
            } else {
              return setError("Enter All Fields");
            }
          }}
        >
          Submit
        </button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        setIsModalOpen={setIsModalOpen}
        setEstimatedPrice={setEstimatedPrice}
        brand={brand}
        year={year}
        condition={condition}
        storage={storage}
        defects={defects}
        imei={imei}
        image={image}
        delivery={delivery}
        estimatedPrice={estimatedPrice}
      />
    </div>
  );
};

export default ProductSellForm;
