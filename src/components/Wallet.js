import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  ascendingCurrencyOrder,
  descendingCurrencyOrder,
  editTotalValue
} from "../actions";
import Currency from "./Currency";

const Wallet = props => {
  const [firstTime, setFirstTime] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  let previousTotalValue = 0;
  let currentTotalValue = 0;

  useEffect(() => {
    props.editTotalValue(currentTotalValue, previousTotalValue);
    previousTotalValue = 0;
    currentTotalValue = 0;
  });

  const walletIsValid = () => {
    setIsValid(true);
  };

  const walletNotValid = () => {
    setIsValid(false);
  };
  const renderCurrencies = () => {
    return props.wallet.map(
      ({ shortcut, amount, currentValue, previousValue }) => {
        previousTotalValue += previousValue;
        currentTotalValue += currentValue;
        return (
          <Currency
            key={shortcut}
            firstTime={firstTime}
            shortcut={shortcut}
            amount={amount}
            currentValue={currentValue}
            previousValue={previousValue}
            walletIsValid={walletIsValid}
            walletNotValid={walletNotValid}
            isEditing={isEditing}
            isWalletValid={isValid}
          />
        );
      }
    );
  };
  const onButtonClick = () => {
    if (isEditing && isValid) {
      setIsEditing(false);
    } else if (!isEditing) {
      setFirstTime(false);
      setIsEditing(true);
    }
  };
  return (
    <>
      <div className="header">
        <h2 className="header__title">Your Wallet</h2>
        <button onClick={onButtonClick} className="button--edit">
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
      <div className="break"></div>
      <div className="currency-list">{renderCurrencies()}</div>
    </>
  );
};

const mapStateToProps = state => {
  return { wallet: state.wallet };
};

export default connect(
  mapStateToProps,
  {
    ascendingCurrencyOrder,
    descendingCurrencyOrder,
    editTotalValue
  }
)(Wallet);
