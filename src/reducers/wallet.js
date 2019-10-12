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
    case types.DELETE_CURRENCY:
      return state.filter(cur => cur.shortcut !== action.shortcut);
    case types.EDIT_CURRENCY:
      return state.map(cur =>
        cur.shortcut === action.overload.shortcut ? action.overload : cur
      );
    case types.ASCENDING_CURRENCY_ORDER:
      return state.sort((a, b) => a.value - b.value);
    case types.DESCENDING_CURRENCY_ORDER:
      return state.sort((a, b) => b.value - a.value);
    default:
      return state;
  }
};
