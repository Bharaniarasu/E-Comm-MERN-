import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/actions/productAction";
import { useParams } from "react-router-dom";
import Loader from "../layouts/loader";
import { Carousel } from "react-bootstrap";
import MetaTag from "../layouts/metaTag";
import { CartAction } from "../redux/actions/cartAction";
const Product = () => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.ProductState);
  const { id } = useParams();

  //increase Qty
  const qtyIncrement = () => {
    //it will return a string data
    const qty = document.querySelector(".count");
    if (product.stock === 0 || qty.valueAsNumber >= product.stock) return;
    const quantity = qty.valueAsNumber + 1;
    setQty(quantity);
  };

  //Decrease Qty
  const qtyDecrement = () => {
    const qty = document.querySelector(".count");
    if (qty.valueAsNumber === 1) return;
    const quantity = qty.valueAsNumber - 1;
    setQty(quantity);
  };
  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);
  return (
    <>
      {!product ? (
        <Loader />
      ) : (
        <>
          <MetaTag title={product.name} />

          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <Carousel pause="hover">
                {product.images &&
                  product.images.map((image) => (
                    <Carousel.Item key={image._id}>
                      <img
                        src={image.image}
                        alt={product.name}
                        height="500"
                        width="500"
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{product.name}</h3>
              <p id="product_id">Product # {product._id}</p>

              <hr />

              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(product.ratings / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">({product.reviews.length} Reviews)</span>

              <hr />

              <p id="product_price">₹ {product.price}</p>
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={qtyDecrement}>
                  -
                </span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value={qty}
                  readOnly
                />

                <span className="btn btn-primary plus" onClick={qtyIncrement}>
                  +
                </span>
              </div>
              <button
                type="button"
                id="cart_btn"
                className="btn btn-primary d-inline ml-4 "
                disabled={product.stock < 1}
                onClick={() => dispatch(CartAction(product._id, qty))}
              >
                Add to Cart
              </button>

              <hr />

              <p>
                Status:{" "}
                <span
                  id="stock_status"
                  className={product.stock < 1 ? "text-danger" : "text-success"}
                >
                  {product.stock < 1 ? "Out of Stock" : "In Stock"}
                </span>
              </p>

              <hr />

              <h4 className="mt-2">Description:</h4>
              <p>{product.description}</p>
              <hr />
              <p id="product_seller mb-3">
                Sold by: <strong>{product.seller}</strong>
              </p>

              <button
                id="review_btn"
                type="button"
                className="btn btn-primary mt-4"
                data-toggle="modal"
                data-target="#ratingModal"
              >
                Submit Your Review
              </button>

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Submit Review
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul className="stars">
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                          </ul>

                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt-3"
                          ></textarea>

                          <button
                            className="btn my-3 float-right review-btn px-4 text-white"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Product;
