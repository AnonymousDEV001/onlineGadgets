"use server";
import {
  Product,
  User,
} from "./models";
import { connectToDb } from "./utils";

export const getProducts = async () => {
  try {
    await connectToDb();
    let products = await Product.find().lean();
    products = JSON.parse(JSON.stringify(products));
    return products;
  } catch (error) {
    console.log(error.message);
  }
};
export const getUserData = async (id) => {
  try {
    await connectToDb();
    let products = await User.findOne({_id:id}).lean();
    products = JSON.parse(JSON.stringify(products));
    return products;
  } catch (error) {
    console.log(error.message);
  }
};
