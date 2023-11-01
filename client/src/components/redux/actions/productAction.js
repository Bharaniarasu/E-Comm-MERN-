import axios from "axios";
import {
  productFailure,
  productRequest,
  productSuccess,
} from "../slices/productSlice";
import {
  productsFailure,
  productsRequest,
  productsSuccess,
} from "../slices/productsSlice";
export const getProducts =
  (query, price, category, rating, pageNo) => async (dispatch) => {
    try {
      dispatch(productsRequest({ loading: true }));
<<<<<<< HEAD
      let uri = `${process.env.REACT_APP_API_URL}/api/v1/products?page=${pageNo}`;
=======
      let uri = `/api/v1/products?page=${pageNo}`;
>>>>>>> c62796b6a723a25e6ea46d6eb6c3a86ef032e31b
      if (query) {
        uri += `&keyword=${query}`;
      }
      if (price) {
        uri += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      }
      if (category) {
        uri += `&category=${category}`;
      }
      if (rating) {
        uri += `&ratings=${rating}`;
      }
      //console.log(uri);
      const { data } = await axios.get(uri);
      dispatch(productsSuccess({ data }));
    } catch (error) {
      dispatch(productsFailure(error.response.data.message));
    }
  };

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch(productRequest({ loading: true }));
    const { data } = await axios.get(
<<<<<<< HEAD
      `${process.env.REACT_APP_API_URL}/api/v1/product/${id}`
=======
      `/api/v1/product/${id}`
>>>>>>> c62796b6a723a25e6ea46d6eb6c3a86ef032e31b
    );

    dispatch(productSuccess(data));
  } catch (error) {
    dispatch(productFailure(error.response.data.message));
  }
};
