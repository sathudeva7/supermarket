import {
    SET_CURRENT_SHOP,
    SHOP_LOADING,
    SET_CURRENT_USER,
  USER_LOADING
  } from "../actions/types";
  const isEmpty = require("is-empty");
  const initialState = {
    isAuthenticated: false,
    shop: {},
    user: {},
    loading: false
  };
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_SHOP:
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          shop: action.payload
        };
      case SHOP_LOADING:
        return {
          ...state,
          loading: true
        };
        case SET_CURRENT_USER:
          return {
            ...state,
            isAuthenticated: !isEmpty(action.payload),
            user: action.payload
          };
        case USER_LOADING:
          return {
            ...state,
            loading: true
          };
      default:
        return state;
    }
  }