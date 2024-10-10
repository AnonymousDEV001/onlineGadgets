"use server";
import { signOut, signIn } from "./auth";
import { Product, User } from "./models";
import { connectToDb } from "./utils";
import bcrypt from "bcrypt";
// import { revalidatePath } from "next/cache";
// import fs from "node:fs/promises";
// import path from "node:path";
// import { v4 as uuidv4 } from "uuid"; // Importing the UUID library

export const handleGoogleLogin = async () => {
  await signIn("google");
};

export const handleLogout = async () => {
  await signOut();
};








export const handleSignup = async (previousState, formData) => {
  const { firstName, lastName, email, password, confirmPassword,idCard,phNo } =
    Object.fromEntries(formData);
  if (password !== confirmPassword) {
    return { error: "Password do not match" };
  }
  try {
    connectToDb();
    const user = await User.findOne({ email: email });
    if (user) {
      return { error: "User already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashPasswords = await bcrypt.hash(password, salt);
    const newUser = new User({
      email: email,
      password: hashPasswords,
      name: firstName + " " + lastName,
      first_name: firstName,
      last_name: lastName,
      provider: "credentials",
      idCard,
      phNo
    });
    await newUser.save();
    return { success: "User created successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};








export const handleSignin = async (previousState, formData) => {
  const { email, password } = Object.fromEntries(formData);
  try {
    await signIn("credentials", { email, password });
  } catch (error) {
    console.log(error.type);
    if (error.type === "CredentialsSignin") {
      return { error: "Invalid Credentials" };
    }
    throw error;
  }
};





export const addProduct = async (previousState, formData) => {
  const { brand, year, condition, storage, defects,imei,image,delivery } =
    Object.fromEntries(formData);
  try {
    connectToDb();

    const newUser = new Product({
      brand,
      yearOfPurchase:year,
      condition,
      storageCapacity:storage,
      defects,
      serialNumber:imei,
      imageUrl:image,
      delivery
    });
    await newUser.save();
    return { success: "Product created successfully" };
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};


export const finilizeProduct = async (productId, formData) => {
  try {
    connectToDb(); // Ensure you have this function defined to connect to your database

    // Update the existing product by ID
    const updatedProduct = await Product.findByIdAndUpdate(
      productId, // The ID of the product to update
      {
        ...formData, // Spread the formData to update the fields
        priceFinilization: true, // Set priceFinilization to true
      },
      { new: true, runValidators: true } // Options: return the updated document and run validation
    );

    if (!updatedProduct) {
      return { error: "Product not found" };
    }

    return { success: "Product updated successfully", product: updatedProduct };
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};
