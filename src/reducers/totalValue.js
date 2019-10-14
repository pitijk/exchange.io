import { types } from "../statics";

export default (state = { current: 0, previous: 0 }, action) => {
  switch (action.type) {
    case types.EDIT_TOTAL_VALUE:
      return action.overload;
    default:
      return state;
  }
};
