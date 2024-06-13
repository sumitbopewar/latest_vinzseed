import express from "express";
import {
  addItemToCart,
  getCartItems,
  updateCartItem,
  removeCartItem,
} from "../controller/cartItemController.js";

const router = express.Router();

router.post("/cart-items", addItemToCart);
router.get("/cart-items/:userId", getCartItems);
router.put("/cart-items/:id", updateCartItem);
router.delete("/cart-items/:id", removeCartItem);

export default router;
