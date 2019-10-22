import React, { useState } from "react";
import { connect } from "react-redux";
import {
  changeDefaultCurrency,
  fetchExchangeRates,
  editCurrenciesValues
} from "../actions";
import SelectOptions from "./SelectOptions";

// from props: defaultCurrency
const ChangeDefault = props => {
  const [currency, setCurrency] = useState(props.defaultCurrency);

  const onButtonClick = () => {
    if (currency !== props.defaultCurrency) {
      props.fetchExchangeRates(currency, props.defaultCurrency);
      props.changeDefaultCurrency(currency);
    }
  };

  return (
    <div>
      <h2 className="header--right small">Change your currency to:</h2>
      <div className="form-inline change">
        <select
          value={currency}
          onChange={e => setCurrency(e.target.value)}
          id="currency"
          className="input--currency"
        >
          <SelectOptions />
        </select>
        <button
          onClick={onButtonClick}
          type="submit"
          className="button--submit"
        >
          Change
        </button>
      </div>
    </div>
  );
};

export default connect(
  null,
  { changeDefaultCurrency, fetchExchangeRates, editCurrenciesValues }
)(ChangeDefault);
