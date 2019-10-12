import { combineReducers } from "redux";
import wallet from "./wallet";
import exchangeRates from "./exchangeRates";
import defaultCurrency from "./defaultCurrency";
import totalValue from "./totalValue";

export default combineReducers({
  wallet,
  exchangeRates,
  defaultCurrency,
  totalValue
});
