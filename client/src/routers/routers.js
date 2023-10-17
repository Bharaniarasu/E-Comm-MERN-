import { Routes, Route } from "react-router-dom";
import Home from "../components/home/home";
import Product from "../components/product/product";
import SearchProduct from "../components/product/searchProduct";
import Login from "../components/user/login";
import Register from "../components/user/register";
import Profile from "../components/user/profile";
import ProtectedRoute from "./protectedRoute";
import UpdateProfile from "../components/user/update";
import UpdatePassword from "../components/user/updatePassword";
import ForgotPassword from "../components/user/forgotPassword";
import ResetPassword from "../components/user/resetPassword";
import Cart from "../components/cart/cart";
import Shipping from "../components/cart/shipping";
import ConfirmOrder from "../components/cart/confirmOrder";
import Payment from "../components/cart/payment";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import OrderSuccess from "../components/cart/orderSuccess";
const Routers = (props) => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<Product />} />
        <Route exact path="/search/:query" element={<SearchProduct />} />
        <Route exact path="/user/login" element={<Login />} />
        <Route exact path="/user/register" element={<Register />} />
        <Route
          exact
          path="/user/forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          exact
          path="/reset/password/:token"
          element={<ResetPassword />}
        />
        <Route
          exact
          path="/user/myprofile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/user/myprofile/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/user/myprofile/update-password"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route exact path="/cart" element={<Cart />} />
        <Route
          exact
          path="/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
        {props.stripeApiKey && (
          <Route
            exact
            path="/order/payment"
            element={
              <ProtectedRoute>
                <Elements stripe={loadStripe(props.stripeApiKey)}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
        )}
        <Route exact path="/order/success" element={<OrderSuccess />} />
      </Routes>
    </>
  );
};

export default Routers;
