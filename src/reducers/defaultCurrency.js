import { types } from "../statics";

export default (state = "PLN", action) => {
  switch (action.type) {
    case types.CHANGE_DEFAULT_CURRENCY:
      return action.currency;
    default:
      return state;
  }
};
