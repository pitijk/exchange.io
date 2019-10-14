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
    <>
      <h4>Change your default currency to:</h4>
      <div className="form-inline">
        <label htmlFor="currency">Currency</label>
        <select
          value={currency}
          onChange={e => setCurrency(e.target.value)}
          className="form-control"
          id="currency"
        >
          <SelectOptions />
        </select>
        <button
          onClick={onButtonClick}
          type="submit"
          className="btn btn-primary"
        >
          Change
        </button>
      </div>
    </>
  );
};

export default connect(
  null,
  { changeDefaultCurrency, fetchExchangeRates, editCurrenciesValues }
)(ChangeDefault);
