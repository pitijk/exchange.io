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
        return newState;
      } else {
        return [...state, action.overload];
      }

    default:
      return state;
  }
};
