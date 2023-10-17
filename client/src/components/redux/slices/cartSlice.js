import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    loading: false,
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
  reducers: {
    addCartItemRequest: (state, action) => {
      return action.payload;
    },
    addCartItemSuccess: (state, action) => {
      const item = action.payload;

      const isItemExist = state.items.find((i) => i.product == item.product);
      if (isItemExist) {
        state = {
          ...state,
          loading: false,
        };
      } else {
        state = {
          items: [...state.items, item],
          loading: false,
        };
        localStorage.setItem("cartItems", JSON.stringify(state.items));
        return state;
      }
      return {
        loading: false,
        product: action.payload.product,
      };
    },
    addCartItemFailure: (state, action) => {
      return { loading: false, error: action.payload };
    },
    increaseCartItemQty: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.product === action.payload) {
          if (item.qty < item.stock) {
            item.qty = item.qty + 1;
          }
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    decreaseCartItemQty: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.product === action.payload) {
          if (item.qty > 1) {
            item.qty = item.qty - 1;
          }
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeCartItem: (state, action) => {
      if (window.confirm("Do you want to remove?")) {
        state.items = state.items.filter((item) => {
          return item.product !== action.payload;
        });
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      } else {
        return state;
      }
    },
    saveShippingInfo: (state, action) => {
      localStorage.setItem("shippingInfo", JSON.stringify(action.payload));
      return {
        ...state,
        shippingInfo: action.payload,
      };
    },
    orderCompleted: (state, action) => {
      localStorage.removeItem("shippingInfo");
      localStorage.removeItem("cartItems");
      sessionStorage.removeItem("orderInfo");

      return {
        items: [],
        loading: false,
        shippingInfo: {},
      };
    },
  },
});
const { actions, reducer } = CartSlice;
export const {
  addCartItemRequest,
  addCartItemSuccess,
  addCartItemFailure,
  increaseCartItemQty,
  decreaseCartItemQty,
  removeCartItem,
  saveShippingInfo,
  orderCompleted,
} = actions;
export default reducer;
