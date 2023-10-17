import React, { useEffect } from "react";
import MetaTag from "../layouts/metaTag";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { shippingValidate } from "./shipping";
import CheckoutSteps from "./checkoutSteps";

const ConfirmOrder = () => {
  const { user } = useSelector((state) => state.AuthState);
  const { items: cartItems, shippingInfo } = useSelector(
    (state) => state.CartState
  );
  const navigate = useNavigate();

  const subTotalPrice = cartItems.reduce(
    (acc, curr) => acc + curr.qty * curr.price,
    0
  );
  const shippingPrice = +subTotalPrice > 500 ? 0 : 40;
  const taxPrice = +Number(0.05 * subTotalPrice).toFixed(2);
  const totalPrice = Number(subTotalPrice + shippingPrice + taxPrice).toFixed(
    2
  );

  const paymentProcess = () => {
    const data = {
      subTotalPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/order/payment");
  };
  useEffect(() => {
    shippingValidate(shippingInfo, navigate);
  }, [shippingInfo, navigate]);
  return (
    <>
      <MetaTag title={"Confirm Order"} />
      <CheckoutSteps shipping confirmOrder />
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Shipping Info</h4>
          <p>
            <b>Name:</b> {user && user.name}
          </p>
          <p>
            <b>Phone:</b> {shippingInfo && shippingInfo.phoneNumber}
          </p>
          <p className="mb-4">
            <b>Address:</b> {shippingInfo && shippingInfo.address}
          </p>

          <hr />
          <h4 className="mt-4">Your Cart Items:</h4>

          <hr />
          {cartItems.map((item) => (
            <>
              <div className="cart-item my-1">
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img
                      src={item.images[0].image}
                      alt="Laptop"
                      height="45"
                      width="65"
                    />
                  </div>

                  <div className="col-5 col-lg-6">
                    <a href={`/product/${item.product}`}>{item.name}</a>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {item.qty} x ₹ {item.price} ={" "}
                      <b>₹ {item.qty * item.price}</b>
                    </p>
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
              <span className="order-summary-values">₹ {subTotalPrice}</span>
            </p>
            <p>
              Shipping:{" "}
              <span className="order-summary-values">₹ {shippingPrice}</span>
            </p>
            <p>
              Tax: <span className="order-summary-values">₹ {taxPrice}</span>
            </p>

            <hr />

            <p>
              Total:{" "}
              <span className="order-summary-values">₹ {totalPrice}</span>
            </p>

            <hr />
            <button
              id="checkout_btn"
              className="btn btn-primary btn-block"
              onClick={paymentProcess}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
