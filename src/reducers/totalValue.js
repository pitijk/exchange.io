import { types } from "../statics";

export default (state = 0, action) => {
  switch (action.type) {
    case types.ADD_TOTAL_VALUE:
      return (state += action.value);
    default:
      return state;
  }
};
