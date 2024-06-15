import CartItem from "../models/cartItemModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

// Add item to cart
export const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity, userId } = req.body;

    const existingCartItem = await CartItem.findOne({ productId, userId });
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return res.status(200).json(existingCartItem);
    }

    const cartItem = new CartItem({ productId, quantity, userId });
    const savedCartItem = await cartItem.save();
    res.status(201).json(savedCartItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all cart items for a user
export const getCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.find({
    }).populate("productId");
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const cartItem = await CartItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (cartItem) {
      res.status(200).json(cartItem);
    } else {
      res.status(404).json({ message: "CartItem not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove item from cart
export const removeCartItem = async (req, res) => {
  try {
    const cartItem = await CartItem.findByIdAndDelete(req.params.id);
    if (cartItem) {
      res.status(200).json({ message: "CartItem deleted" });
    } else {
      res.status(404).json({ message: "CartItem not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
