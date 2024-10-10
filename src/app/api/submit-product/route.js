import { Product } from '@/lib/models';
import { connectToDb } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json(); // Instead of formData
    const { brand, year, condition, storage, defects,estimatedPrice, imei, image, userId,delivery } = body;

    console.log(brand)
    // Connect to the database
    await connectToDb()

    // Create a new product
    const newProduct = new Product({
      brand,
      yearOfPurchase: year,
      condition,
      storageCapacity: storage,
      defects,
      serialNumber: imei,
      imageUrl: image,
      delivery,
      userId,
      estimatedPrice
    });
    console.log(userId)

    // Save the product to the database
    await newProduct.save();

    // Return a success response
    return NextResponse.json({ success: "Product created successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
