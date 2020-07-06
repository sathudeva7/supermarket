import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_SHOP,
  SHOP_LOADING
} from "./types";
// Register shop
export const registerShop = (shopData, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/shops/register", shopData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login - get shop token
export const loginShop = shopData => dispatch => {
  axios
    .post("http://localhost:5000/api/shops/login", shopData)
    .then(res => {
      // Save to localStorage
// Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get shop data
      const decoded = jwt_decode(token);
      // Set current shop
      dispatch(setCurrentShop(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Set logged in Shop
export const setCurrentShop = decoded => {
  return {
    type: SET_CURRENT_SHOP,
    payload: decoded
  };
};
// User loading
export const setShopLoading = () => {
  return {
    type: SHOP_LOADING
  };
};
// Log user out
export const logoutShop = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current Shop to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentShop({}));
};