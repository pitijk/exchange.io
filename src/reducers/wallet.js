import { types } from "../statics";

export default (state = [], action) => {
  switch (action.type) {
    case types.ADD_CURRENCY:
      const newState = [...state];
      const { shortcut, amount, currentValue, previousValue } = action.overload;
      const currency = newState.find(cur => cur.shortcut === shortcut);
      if (currency) {
        currency.amount += amount;
        currency.currentValue += currentValue;
        currency.previousValue += previousValue;
      } else {
        newState.push(action.overload);
      }
      newState.sort((a, b) => b.currentValue - a.currentValue);
      return newState;
    case types.DELETE_CURRENCY:
      return state.filter(cur => cur.shortcut !== action.shortcut);
    case types.EDIT_CURRENCY:
      const newState1 = state.map(cur =>
        cur.shortcut === action.overload.shortcut ? action.overload : cur
      );
      newState1.sort((a, b) => b.currentValue - a.currentValue);
      return newState1;
    case types.EDIT_CURRENCIES_VALUES:
      const { currentRates, previousRates } = action.overload;
      const newState2 = state.map(cur => {
        return {
          ...cur,
          currentValue: cur.amount / currentRates[cur.shortcut],
          previousValue: cur.amount / previousRates[cur.shortcut]
        };
      });
      return newState2;
    default:
      return state;
  }
};
