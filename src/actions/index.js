import { types, URL } from "../statics";
import axios from "axios";
import { yesterday, today } from "../helpers";

export const fetchExchangeRates = currency => async dispatch => {
  const fullResponse = await axios.get(
    `${URL}/history?start_at=${yesterday()}&end_at=${today()}&base=${currency}`
  );
  const { rates } = fullResponse.data;
  if (rates[today()] && rates[yesterday()]) {
    dispatch(editCurrenciesValues(rates[today()], rates[yesterday()]));
    dispatch({
      type: types.FETCH_EXCHANGE_RATES,
      overload: {
        latest: rates[today()],
        yesterday: rates[yesterday()]
      }
    });
  } else {
    const response = await axios.get(`${URL}/latest?base=${currency}`);
    dispatch(editCurrenciesValues(response.data.rates, response.data.rates));
    dispatch({
      type: types.FETCH_EXCHANGE_RATES,
      overload: {
        latest: response.data.rates
      }
    });
  }
};

export const editTotalValue = (current, previous) => {
  return {
    type: types.EDIT_TOTAL_VALUE,
    overload: {
      current,
      previous
    }
  };
};

export const addCurrency = (shortcut, amount, currentValue, previousValue) => {
  return {
    type: types.ADD_CURRENCY,
    overload: {
      shortcut,
      amount,
      currentValue,
      previousValue
    }
  };
};

export const editCurrency = (shortcut, amount, currentValue, previousValue) => {
  return {
    type: types.EDIT_CURRENCY,
    overload: {
      shortcut,
      amount,
      currentValue,
      previousValue
    }
  };
};

export const deleteCurrency = shortcut => {
  return {
    type: types.DELETE_CURRENCY,
    shortcut
  };
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

export const editCurrenciesValues = (currentRates, previousRates) => {
  return {
    type: types.EDIT_CURRENCIES_VALUES,
    overload: {
      currentRates,
      previousRates
    }
  };
};
