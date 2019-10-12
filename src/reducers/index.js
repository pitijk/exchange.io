import { combineReducers } from "redux";
import wallet from "./wallet";
import exchangeRates from "./exchangeRates";
import defaultCurrency from "./defaultCurrency";

export default combineReducers({
  wallet,
  exchangeRates,
  defaultCurrency
});
