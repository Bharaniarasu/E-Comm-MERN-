import React from "react";
import { Link } from "react-router-dom";
const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
  console.log(shipping, confirmOrder, payment);
  return (
    <div className="checkout-progress d-flex justify-content-center mt-5">
      <Link to="/shipping">
        <div
          className={shipping ? "triangle2-active" : "triangle2-incomplete"}
        ></div>
        <div className={shipping ? "step active-step" : "step incomplete"}>
          Shipping Info
        </div>
        <div
          className={shipping ? "triangle-active" : "triangle-incomplete"}
        ></div>
      </Link>

      <Link to="/order/confirm">
        <div
          className={confirmOrder ? "triangle2-active" : "triangle2-incomplete"}
        ></div>
        <div className={confirmOrder ? "step active-step" : "step incomplete"}>
          Confirm Order
        </div>
        <div
          className={confirmOrder ? "triangle-active" : "triangle-incomplete"}
        ></div>
      </Link>
      <Link to="/payment">
        <div
          className={payment ? "triangle2-active" : "triangle2-incomplete"}
        ></div>
        <div className={payment ? "step active-step" : "step incomplete"}>
          Payment
        </div>
        <div
          className={payment ? "triangle-active" : "triangle-incomplete"}
        ></div>
      </Link>
    </div>
  );
};

export default CheckoutSteps;
