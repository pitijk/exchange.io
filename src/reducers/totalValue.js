import { types } from "../statics";

export default (state = { current: 0, previous: 0 }, action) => {
  switch (action.type) {
    case types.ADD_TOTAL_VALUE:
      return {
        current: state.current + action.currentValue,
        previous: state.previous + action.previousValue
      };
    default:
      return state;
  }
};
