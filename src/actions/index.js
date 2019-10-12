import { types, URL } from "../statics";
import axios from "axios";

export const fetchExchangeRates = currency => async dispatch => {
  const response = await axios.get(`${URL}/latest?base=${currency}`);
  dispatch({ type: types.FETCH_EXCHANGE_RATES, rates: response.data.rates });
};

export const addCurrency = (shortcut, amount) => {
  return {
    type: types.ADD_CURRENCY,
    overload: {
      shortcut,
      amount
    }
  };
};

export const changeDefaultCurrency = currency => {
  return {
    type: types.CHANGE_DEFAULT_CURRENCY,
    currency
  };
};
