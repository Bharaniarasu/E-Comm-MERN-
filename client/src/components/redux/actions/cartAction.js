import axios from "axios";
import {
  addCartItemFailure,
  addCartItemRequest,
  addCartItemSuccess,
} from "../slices/cartSlice";

export const CartAction = (id, qty) => async (dispatch) => {
  try {
    dispatch(addCartItemRequest());

    const { data } = await axios.get(`/api/v1/product/${id}`);
    //console.log(data);

    dispatch(
      addCartItemSuccess({
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        stock: data.product.stock,
        images: data.product.images,
        qty,
      })
    );
  } catch (err) {
    //console.log(err);
    dispatch(addCartItemFailure(err));
  }
};
