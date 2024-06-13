import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    oldPrice: {
      type: String,
    },
    weight: [
      {
        type: Number,
      },
    ],
    catImg: {
      type: String,
      required: true,
    },
    discount: {
      type: String,
    },
    brand: {
      type: String,
    },
    productImages: [
      {
        type: String,
      },
    ],
    rating: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

export default mongoose.model("Products", productSchema);
