import { types } from "../statics";

export default (state = [], action) => {
  switch (action.type) {
    case types.ADD_CURRENCY:
      const newState = [...state];
      const { shortcut, amount, currentValue, previousValue } = action.overload;
      const currency = state.find(cur => cur.shortcut === shortcut);
      if (currency) {
        currency.amount += amount;
        currency.currentValue += currentValue;
        currency.previousValue += previousValue;
      } else {
        newState.push(action.overload);
      }
      newState.sort((a, b) => a.currentValue - b.currentValue);
      return newState;
    case types.DELETE_CURRENCY:
      return state.filter(cur => cur.shortcut !== action.shortcut);
    case types.EDIT_CURRENCY:
      return state.map(cur =>
        cur.shortcut === action.overload.shortcut ? action.overload : cur
      );
    case types.EDIT_CURRENCIES_VALUES:
      const { currentRates, previousRates } = action.overload;

      return state.map(cur => {
        return {
          ...cur,
          currentValue: cur.amount / currentRates[cur.shortcut],
          previousValue: cur.amount / previousRates[cur.shortcut]
        };
      });
    case types.ASCENDING_CURRENCY_ORDER:
      return state.sort((a, b) => a.currentValue - b.currentValue);
    case types.DESCENDING_CURRENCY_ORDER:
      return state.sort((a, b) => b.currentValue - a.currentValue);
    default:
      return state;
  }
};
