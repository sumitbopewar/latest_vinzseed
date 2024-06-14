import mongoose from "mongoose";

const { Schema, model } = mongoose;

const cartItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Products", required: true },
    quantity: { type: Number, required: true, min: 1 },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const CartItem = model("CartItem", cartItemSchema);

export default CartItem;
