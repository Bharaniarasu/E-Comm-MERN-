import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countries } from "countries-list";
import { saveShippingInfo } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./checkoutSteps";
import MetaTag from "../layouts/metaTag";
import { toast } from "react-toastify";

export const shippingValidate = (shippingInfo, navigate) => {
  if (
    !shippingInfo.address ||
    !shippingInfo.city ||
    !shippingInfo.phoneNumber ||
    !shippingInfo.postalCode ||
    !shippingInfo.state ||
    !shippingInfo.country
  ) {
    toast.error("Please fill the Shipping details !");
    navigate("/shipping");
  }
};
const Shipping = () => {
  const { shippingInfo = {} } = useSelector((state) => state.CartState);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const countryList = Object.values(countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingInfo({
        address,
        city,
        phoneNumber,
        postalCode,
        state,
        country,
      })
    );
    navigate("/order/confirm");
  };
  return (
    <>
      <MetaTag title={"Shipping Info"} />
      <CheckoutSteps shipping />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Shipping Info</h1>
            <div className="form-group">
              <label htmlFor="address_field">Address</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city_field">City</label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_field">Phone No</label>
              <input
                type="phone"
                id="phone_field"
                className="form-control"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postal_code_field">Postal Code</label>
              <input
                type="number"
                id="postal_code_field"
                className="form-control"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="state_code_field">State</label>
              <input
                type="text"
                id="state_code_field"
                className="form-control"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="country_field">Country</label>
              <select
                id="country_field"
                className="form-control"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                {countryList.map((country) => (
                  <option key={country.name}>{country.name}</option>
                ))}
              </select>
            </div>

            <button
              id="shipping_btn"
              type="submit"
              className="btn btn-block py-3"
              onClick={() => shippingValidate(shippingInfo, navigate)}
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
