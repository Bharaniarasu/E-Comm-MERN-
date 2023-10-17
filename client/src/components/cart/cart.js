import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartAction } from "../redux/actions/cartAction";
import { Link, useNavigate } from "react-router-dom";
import {
  decreaseCartItemQty,
  increaseCartItemQty,
  removeCartItem,
} from "../redux/slices/cartSlice";

const Cart = () => {
  const { items: cartItems } = useSelector((state) => state.CartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkoutHandler = () => {
    // for navigate shipment after login
    navigate("/user/login?redirect=shipping");
  };
  return (
    <div className="container container-fluid">
      {cartItems.length === 0 ? (
        <h2 className="mt-5 text-center">
          <b>Your Cart is Empty</b>
        </h2>
      ) : (
        <div>
          <h2 className="mt-5">
            Your Cart: <b>{cartItems.length} items</b>
          </h2>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {cartItems.map((item) => (
                <>
                  <hr />
                  <div className="cart-item">
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item.images[0].image}
                          alt="Laptop"
                          height="90"
                          width="115"
                        />
                      </div>

                      <div className="col-5 col-lg-3">
                        <a href={`/product/${item.product}`}>{item.name}</a>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">₹ {item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span
                            className="btn btn-danger minus"
                            onClick={() =>
                              dispatch(decreaseCartItemQty(item.product))
                            }
                          >
                            -
                          </span>
                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.qty}
                            readOnly
                          />

                          <span
                            className="btn btn-primary plus"
                            onClick={() =>
                              dispatch(increaseCartItemQty(item.product))
                            }
                          >
                            +
                          </span>
                        </div>
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() => dispatch(removeCartItem(item.product))}
                        ></i>
                      </div>
                    </div>
                  </div>
                  <hr />
                </>
              ))}
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:{" "}
                  <span className="order-summary-values">
                    {cartItems.reduce((acc, curr) => acc + curr.qty, 0)} (Units)
                  </span>
                </p>
                <p>
                  Est. total:{" "}
                  <span className="order-summary-values">
                    ₹{" "}
                    {cartItems.reduce(
                      (acc, curr) => acc + curr.qty * curr.price,
                      0
                    )}
                  </span>
                </p>

                <hr />
                <button
                  id="checkout_btn"
                  className="btn btn-primary btn-block"
                  onClick={checkoutHandler}
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
