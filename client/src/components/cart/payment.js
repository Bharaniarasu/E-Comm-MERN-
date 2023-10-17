import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { shippingValidate } from "./shipping";
import axios from "axios";
import { toast } from "react-toastify";
import { orderCompleted } from "../redux/slices/cartSlice";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  // console.log(orderInfo);
  const { user } = useSelector((state) => state.AuthState);
  const { items: cartItems, shippingInfo } = useSelector(
    (state) => state.CartState
  );

  const paymentData = {
    amount: orderInfo && Math.round(orderInfo.totalPrice),
    shipping: {
      name: user.name,
      address: {
        city: shippingInfo.city,
        postal_code: shippingInfo.postalCode,
        country: shippingInfo.country,
        state: shippingInfo.state,
        line1: shippingInfo.address,
      },
      phone: shippingInfo.phoneNumber,
    },
  };
  const order = { cartItems, shippingInfo };
  if (orderInfo) {
    order.subTotalPrice = orderInfo.subTotalPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }
  useEffect(() => {
    shippingValidate(shippingInfo, navigate);
  }, [navigate, shippingInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector("#pay_btn").disabled = true;
    try {
      const { data } = await axios.post("/api/v1/payment/process", paymentData);
      const clientSecret = data.client_secret;
      const result = stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        toast((await result).error.message, {
          type: "error",
          position: "bottom-center",
        });
      } else {
        if ((await result).paymentIntent.status === "succeeded") {
          toast("payment Success !", {
            type: "success",
            position: "bottom-center",
          });

          dispatch(orderCompleted());
          navigate("/order/success");
        } else {
          toast("Please try again !", {
            type: "warning",
            position: "bottom-center",
          });
        }
      }
    } catch (error) {}
  };
  return (
    <>
      {" "}
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Card Info</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
                value=""
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
                value=""
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
                value=""
              />
            </div>

            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              Pay {`₹ ${orderInfo.totalPrice}`}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
