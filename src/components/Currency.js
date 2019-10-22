import React, { useState } from "react";
import { signs, regex } from "../statics";
import { connect } from "react-redux";
import { deleteCurrency, editCurrency } from "../actions";
import { calcValues } from "../helpers";

const Currency = props => {
  const {
    shortcut,
    amount,
    currentValue,
    previousValue,
    isEditing,
    firstTime,
    walletIsValid,
    walletNotValid,
    isWalletValid
  } = props;
  const [valueInput, setValueInput] = useState(amount);
  const [isValid, setIsValid] = useState(true);

  const onValueInputChange = event => {
    const str = event.target.value;
    var result = regex.test(str);
    setValueInput(str);
    if (result) {
      setIsValid(true);
      walletIsValid();
    } else {
      setIsValid(false);
      walletNotValid();
    }
  };

  const handleSubmit = () => {
    if (isWalletValid && isValid && Number(valueInput) !== amount) {
      const { currentValue, previousValue } = calcValues(
        Number(valueInput),
        shortcut,
        props.exchangeRates
      );
      props.editCurrency(
        shortcut,
        Number(valueInput),
        currentValue,
        previousValue
      );
    }
  };

  const renderError = () => {
    if (isValid) {
      return;
    } else {
      return (
        <p className="error negative">
          Value must be in (12.34) format and can't be larger than 10 digits!
        </p>
      );
    }
  };

  const renderPercent = () => {
    const percent = (currentValue / previousValue - 1) * 100;
    if (percent >= 0) {
      return (
        <span className="percent positive">{`(+${percent.toFixed(2)}%)`}</span>
      );
    } else {
      return (
        <span className="percent negative">{`(${percent.toFixed(2)}%)`}</span>
      );
    }
  };

  if (isEditing) {
    return (
      <>
        <div className="currency-edit">
          <div className="currency">
            <div className="currency__item currency-header">
              <strong>{shortcut}</strong>
              <button
                onClick={() => props.deleteCurrency(shortcut)}
                className="button--delete"
              >
                <i class="fas fa-times fa-2x"></i>
              </button>
            </div>
            <input
              onChange={onValueInputChange}
              value={valueInput}
              type="text"
              id="value"
              placeholder="value"
              className="input--amount"
            />
            <div className="currency__item">
              {currentValue.toFixed(2) + signs[props.defaultCurrency]}
              {renderPercent()}
            </div>
          </div>
          <button
            onClick={() => props.deleteCurrency(shortcut)}
            className="button--delete"
          >
            <i className="fas fa-trash fa-2x"></i>
          </button>
        </div>
        {renderError()}
      </>
    );
  } else {
    if (!firstTime) {
      handleSubmit();
    }
    return (
      <div className="currency-edit">
        <div className="currency">
          <div className="currency__item">
            <strong>{shortcut}</strong>
          </div>
          <div className="currency__item">{amount + signs[shortcut]}</div>
          <div className="currency__item">
            {currentValue.toFixed(2) + signs[props.defaultCurrency]}
            {renderPercent()}
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    defaultCurrency: state.defaultCurrency,
    exchangeRates: state.exchangeRates
  };
};

export default connect(
  mapStateToProps,
  { deleteCurrency, editCurrency }
)(Currency);
