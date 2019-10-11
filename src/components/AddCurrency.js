import React, { useState } from "react";
import { connect } from "react-redux";
import { addCurrency } from "../actions";
import { regex } from "../statics";
import { calcValues } from "../helpers";

const AddCurrency = props => {
  const [valueInput, setValueInput] = useState("");
  const [currencyInput, setCurrencyInput] = useState("USD");

  const onTextInputChange = event => {
    const str = event.target.value;
    // var result = regex.test(str);
    // result ? backToNormal : warning
    setValueInput(str);
  };

  const onCurrencyInputChange = event => {
    const str = event.target.value;
    setCurrencyInput(str);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (regex.test(valueInput)) {
      const amount = Number(valueInput);
      const { currentValue, previousValue } = calcValues(
        amount,
        currencyInput,
        props.exchangeRates
      );
      // addCurrency = (shortcut, amount,currentValue, previousValue)
      props.addCurrency(currencyInput, amount, currentValue, previousValue);
      setValueInput("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form-inline">
      <label htmlFor="currency">Currency</label>
      <select
        value={currencyInput}
        onChange={onCurrencyInputChange}
        className="form-control"
        id="currency"
      >
        <option value="USD">USD</option>
        <option value="CAD">CAD</option>
        <option value="AUD">AUD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="CHF">CHF</option>
        <option value="CNY">CNY</option>
        <option value="JPY">JPY</option>
        <option value="KRW">KRW</option>
      </select>
      <label htmlFor="value" className="sr-only">
        Value
      </label>
      <input
        onChange={onTextInputChange}
        value={valueInput}
        type="text"
        className="form-control"
        id="value"
        placeholder="value"
      />
      <button type="submit" className="btn btn-primary">
        Add
      </button>
    </form>
  );
};

const mapStateToProps = state => {
  return { exchangeRates: state.exchangeRates };
};

export default connect(
  mapStateToProps,
  { addCurrency }
)(AddCurrency);
