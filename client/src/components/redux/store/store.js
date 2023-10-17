import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import ProductsReducer from "../slices/productsSlice";
import ProductReducer from "../slices/productSlice";
import AuthReducer from "../slices/authSlice";
import CartReducer from "../slices/cartSlice";

const reducer = combineReducers({
  ProductsState: ProductsReducer,
  ProductState: ProductReducer,
  AuthState: AuthReducer,
  CartState: CartReducer,
});
export default configureStore({
  reducer,
  //middleware - to run actions in asyncronous
  middleware: [thunk],
});
