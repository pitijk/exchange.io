import { types, URL } from "../statics";
import axios from "axios";

export const fetchExchangeRates = currency => async dispatch => {
  const response = await axios.get(`${URL}/latest?base=${currency}`);
  dispatch({ type: types.FETCH_EXCHANGE_RATES, rates: response.data.rates });
};

const addTotalValue = value => {
  return {
    type: types.ADD_TOTAL_VALUE,
    value
  };
};

export const addCurrency = (shortcut, amount) => (dispatch, getState) => {
  let value = amount / getState().exchangeRates[shortcut];
  dispatch(addTotalValue(value));
  dispatch({
    type: types.ADD_CURRENCY,
    overload: {
      shortcut,
      amount,
      value
    }
  });
};

export const ascendingCurrencyOrder = () => {
  return {
    type: types.ASCENDING_CURRENCY_ORDER
  };
};
export const descendingCurrencyOrder = () => {
  return {
    type: types.DESCENDING_CURRENCY_ORDER
  };
};

export const changeDefaultCurrency = currency => {
  return {
    type: types.CHANGE_DEFAULT_CURRENCY,
    currency
  };
};
