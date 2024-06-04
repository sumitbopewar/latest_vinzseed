import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    weight: [],
    rating: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    catImg: {
      type: String,
    },
    productImages: [],
    quantity: {
      type: Number,
      required: true,
    },
    // photo: {
    //   data: Buffer,
    //   contentType: String,
    // },
    shipping: {
      type: Boolean,
    },
  },
  
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);