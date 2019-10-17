import React, { useState } from "react";
import { connect } from "react-redux";
import { addCurrency } from "../actions";
import { regex } from "../statics";
import { calcValues } from "../helpers";
import SelectOptions from "./SelectOptions";

const AddCurrency = props => {
  const [valueInput, setValueInput] = useState("");
  const [currencyInput, setCurrencyInput] = useState("USD");
  const [isValid, setIsValid] = useState(true);

  const onTextInputChange = event => {
    const str = event.target.value;
    const result = regex.test(str);
    setValueInput(str);
    result ? setIsValid(true) : setIsValid(false);
  };

  const onCurrencyInputChange = event => {
    const str = event.target.value;
    setCurrencyInput(str);
    const result = regex.test(str);
    result ? setIsValid(true) : setIsValid(false);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (regex.test(valueInput)) {
      setIsValid(true);
      const amount = Number(valueInput);
      const { currentValue, previousValue } = calcValues(
        amount,
        currencyInput,
        props.exchangeRates
      );
      // addCurrency = (shortcut, amount,currentValue, previousValue)
      props.addCurrency(currencyInput, amount, currentValue, previousValue);
      setValueInput("");
    } else {
      setIsValid(false);
    }
  };

  const renderError = () => {
    if (isValid) {
      return;
    } else {
      return (
        <p className="error negative">
          Value must be in (12.34) format and can't be larger than 12 digits!
        </p>
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-inline">
        <select
          value={currencyInput}
          onChange={onCurrencyInputChange}
          id="currency"
          className="input--currency"
        >
          <SelectOptions />
        </select>
        <input
          onChange={onTextInputChange}
          value={valueInput}
          type="text"
          id="value"
          placeholder="value"
          className="input--amount"
        />
        <button type="submit" className="button--submit">
          Add
        </button>
      </form>
      {renderError()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    exchangeRates: state.exchangeRates,
    defaultCurrency: state.defaultCurrency
  };
};

export default connect(
  mapStateToProps,
  { addCurrency }
)(AddCurrency);
