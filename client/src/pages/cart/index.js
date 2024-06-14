import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import QuantityBox from "../../components/quantityBox";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { MyContext } from "../../App";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const context = useContext(MyContext);
  const [auth] = useAuth();
  const history = useNavigate();

  useEffect(() => {
    // context not working
    // if (context.isLogin === "true") {

    // } else {
    //   history("/signIn");
    // }

    getCartData(
      `http://localhost:8080/api/v1/cart/cart-items/6661ccec394c53cc7ac6ddf8`
    );

    window.scrollTo(0, 0);
  }, []);

  const getCartData = async (url) => {
    try {
      const response = await axios.get(url);
      console.log(response.data);
      setCartItems(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/cart/cart-items/${id}`);
      getCartData(
        `http://localhost:8080/api/v1/cart/cart-items/${auth.user._id}`
      );
      context.removeItemsFromCart(id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const emptyCart = async () => {
    try {
      await Promise.all(
        cartItems.map((item) =>
          axios.delete(
            `http://localhost:8080/api/v1/cart/cart-items/${item.id}`
          )
        )
      );
      getCartData(
        `http://localhost:8080/api/v1/cart/cart-items/${auth.user._id}`
      );
      context.emptyCart();
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateCart = (items) => {
    setCartItems(items);
  };

  return (
    <>
      {context.windowWidth > 992 && (
        <div className="breadcrumbWrapper mb-4">
          <div className="container-fluid">
            <ul className="breadcrumb breadcrumb2 mb-0">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>Shop</li>
              <li>Cart</li>
            </ul>
          </div>
        </div>
      )}

      <section className="cartSection mb-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              <div className="d-flex align-items-center w-100">
                <div className="left">
                  <h1 className="hd mb-0">Your Cart</h1>
                  <p>
                    There are <span className="text-g">{cartItems.length}</span>{" "}
                    products in your cart
                  </p>
                </div>

                <span
                  className="ml-auto clearCart d-flex align-items-center cursor "
                  onClick={() => emptyCart()}
                >
                  <DeleteOutlineOutlinedIcon /> Clear Cart
                </span>
              </div>

              <div className="cartWrapper mt-4">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th>Remove</th>
                      </tr>
                    </thead>

                    <tbody>
                      {cartItems.length !== 0 &&
                        cartItems.map((item, index) => (
                          <tr key={item.id}>
                            <td width={"50%"}>
                              <div className="d-flex align-items-center">
                                <div className="img">
                                  <Link to={`/product/${item.id}`}>
                                    <img
                                      src={
                                        item.productId.catImg +
                                        "?im=Resize=(100,100)"
                                      }
                                      className="w-100"
                                      alt={item.productName}
                                    />
                                  </Link>
                                </div>

                                <div className="info pl-4">
                                  <Link to={`/product/${item.id}`}>
                                    <h4>{item.productId.productName}</h4>
                                  </Link>
                                  <Rating
                                    name="half-rating-read"
                                    value={parseFloat(item.productId.rating)}
                                    precision={0.5}
                                    readOnly
                                  />
                                  <span className="text-light">
                                    ({parseFloat(item.productId.rating)})
                                  </span>
                                </div>
                              </div>
                            </td>

                            <td width="20%">
                              <span>
                                Rs:{" "}
                                {typeof item.productId.price === "string"
                                  ? parseInt(
                                      item.productId.price.replace(/,/g, "")
                                    )
                                  : 0}
                              </span>
                            </td>

                            <td>
                              <QuantityBox
                                item={item}
                                cartItems={cartItems}
                                index={index}
                                updateCart={updateCart}
                              />
                            </td>

                            <td>
                              <span className="text-g">
                                Rs.{" "}
                                {typeof item.productId.price === "string"
                                  ? parseInt(
                                      item.productId.price.replace(/,/g, "")
                                    ) * item.productId.quantity
                                  : 0}
                              </span>
                            </td>

                            <td align="center">
                              <span
                                className="cursor"
                                onClick={() => deleteItem(item.id)}
                              >
                                <DeleteOutlineOutlinedIcon />
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <br />

              <div className="d-flex align-items-center">
                <Link to="/">
                  <Button className="btn-g">
                    <KeyboardBackspaceIcon /> Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>

            <div className="col-md-4 cartRightBox">
              <div className="card p-4 ">
                <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 text-light">Subtotal</h5>
                  <h3 className="ml-auto mb-0 font-weight-bold">
                    <span className="text-g">
                      {cartItems.length !== 0 &&
                        cartItems
                          .map((item) =>
                            typeof item.productId.price === "string"
                              ? parseInt(item.productId.price.replace(/,/g, "")) *
                                item.quantity
                              : 0
                          )
                          .reduce((total, value) => total + value, 0)}
                    </span>
                  </h3>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 text-light">Shipping</h5>
                  <h3 className="ml-auto mb-0 font-weight-bold">
                    <span>Free</span>
                  </h3>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 text-light">Estimate for</h5>
                  <h3 className="ml-auto mb-0 font-weight-bold">
                    United Kingdom
                  </h3>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 text-light">Total</h5>
                  <h3 className="ml-auto mb-0 font-weight-bold">
                    <span className="text-g">
                      {cartItems.length !== 0 &&
                        cartItems
                          .map((item) =>
                            typeof item.productId.price === "string"
                              ? parseInt(item.productId.price.replace(/,/g, "")) *
                                item.quantity
                              : 0
                          )
                          .reduce((total, value) => total + value, 0)}
                    </span>
                  </h3>
                </div>

                <br />
                <Button className="btn-g btn-lg">Proceed To CheckOut</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
