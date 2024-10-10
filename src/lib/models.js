import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    idCard: {
      type: String,
      required: true,
    },
    phNo: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    provider: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);

const productSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" , required: true},
    brand: {
      type: String,
      required: true,
    },
    yearOfPurchase: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    storageCapacity: {
      type: String,
      required: true,
    },
    defects: {
      type: String,
      required: true,
    },
    serialNumber: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    delivery: {
      type: String,
      required: true,
    },
    estimatedPrice: {
      type: String,
      required: true,
    },
    priceFinilization: {
      type: Boolean,
      default:false,
      required: true,
    },
  },
  { timestamps: true }
);


export const User = mongoose.models.user || mongoose.model("user", userSchema);
export const Product = mongoose.models.product || mongoose.model("product", productSchema);
