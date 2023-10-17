import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/layouts/loader";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.AuthState);
  //check condition to avoid url redirecting on user page
  if (loading) {
    return <Loader />;
  } else if (!isAuthenticated && !loading) {
    return <Navigate to="/user/login" />;
  } else if (isAuthenticated) {
    return children;
  }
};

export default ProtectedRoute;
