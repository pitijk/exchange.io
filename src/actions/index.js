import { types, URL } from "../statics";
import axios from "axios";
import { yesterday, today } from "../helpers";

export const fetchExchangeRates = currency => async dispatch => {
  const fullResponse = await axios.get(
    `${URL}/history?start_at=${yesterday()}&end_at=${today()}&base=${currency}`
  );
  const { rates } = fullResponse.data;
  if (rates[today()] && rates[yesterday()]) {
    dispatch({
      type: types.FETCH_EXCHANGE_RATES,
      overload: {
        latest: rates[today()],
        yesterday: rates[yesterday()]
      }
    });
  } else {
    const response = await axios.get(`${URL}/latest?base=${currency}`);
    dispatch({
      type: types.FETCH_EXCHANGE_RATES,
      overload: {
        latest: response.data.rates
      }
    });
  }
};

const addTotalValue = (currentValue, previousValue) => {
  return {
    type: types.ADD_TOTAL_VALUE,
    currentValue,
    previousValue
  };
};

export const addCurrency = (shortcut, amount, currentValue, previousValue) => (
  dispatch,
  getState
) => {
  dispatch(addTotalValue(currentValue, previousValue));
  dispatch({
    type: types.ADD_CURRENCY,
    overload: {
      shortcut,
      amount,
      currentValue,
      previousValue
    }
  });
};

export const editCurrency = (
  shortcut,
  amount,
  nextCurrentValue,
  nextPreviousValue
) => (dispatch, getState) => {
  // past is before editing
  const { currentValue, previousValue } = getState().wallet.find(
    cur => cur.shortcut === shortcut
  );
  dispatch(
    addTotalValue(
      nextCurrentValue - currentValue,
      nextPreviousValue - previousValue
    )
  );
  dispatch({
    type: types.EDIT_CURRENCY,
    overload: {
      shortcut,
      amount,
      currentValue,
      previousValue
    }
  });
};

export const deleteCurrency = shortcut => (dispatch, getState) => {
  const { currentValue, previousValue } = getState().wallet.find(
    cur => cur.shortcut === shortcut
  );
  dispatch(addTotalValue(-currentValue, -previousValue));
  dispatch({
    type: types.DELETE_CURRENCY,
    shortcut
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
