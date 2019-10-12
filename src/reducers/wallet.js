import { types } from "../statics";

export default (state = [], action) => {
  switch (action.type) {
    case types.ADD_CURRENCY:
      const newState = [...state];
      const { shortcut, amount, value } = action.overload;
      const currency = state.find(cur => cur.shortcut === shortcut);
      if (currency) {
        currency.amount += amount;
        currency.value += value;
      } else {
        newState.push(action.overload);
      }
      newState.sort((a, b) => a.value - b.value);
      return newState;
    case types.ASCENDING_CURRENCY_ORDER:
      return state.sort((a, b) => a.value - b.value);
    case types.DESCENDING_CURRENCY_ORDER:
      return state.sort((a, b) => b.value - a.value);
    default:
      return state;
  }
};
