import React from "react";

const SelectOptions = props => {
  const currencies = [
    "PLN",
    "USD",
    "CAD",
    "AUD",
    "EUR",
    "GBP",
    "CHF",
    "CNY",
    "JPY",
    "KRW"
  ];
  return currencies.map(cur => (
    <option key={cur} value={cur}>
      {cur}
    </option>
  ));
};

export default SelectOptions;
