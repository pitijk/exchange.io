import React, { useState } from "react";
import { connect } from "react-redux";
import { addCurrency } from "../actions";
const AddCurrency = props => {
  const [valueInput, setValueInput] = useState("");
  const [currencyInput, setCurrencyInput] = useState("USD");
  const regex = /^[1-9][0-9]{0,11}\.?[0-9]{0,2}$/;

  const onTextInputChange = event => {
    const str = event.target.value;
    var result = regex.test(str);
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
      // addCurrency = (shortcut, amount)
      props.addCurrency(currencyInput, Number(valueInput));
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

export default connect(
  null,
  { addCurrency }
)(AddCurrency);
