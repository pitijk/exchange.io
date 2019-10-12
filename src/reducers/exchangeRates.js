import { types } from "../statics";

export default (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_EXCHANGE_RATES:
      return { ...action.rates };
    default:
      return state;
  }
};
