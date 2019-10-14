import React, { useEffect } from "react";
import { connect } from "react-redux";
import { editTotalValue } from "../actions";
import Currency from "./Currency";

const CurrenciesList = props => {
  let previousTotalValue = 0;
  let currentTotalValue = 0;
  useEffect(() => {
    props.editTotalValue(currentTotalValue, previousTotalValue);
  });
  const { firstTime, isEditing, wallet } = props;
  return wallet.map(({ shortcut, amount, currentValue, previousValue }) => {
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
        isEditing={isEditing}
      />
    );
  });
};

const mapStateToProps = state => {
  return { wallet: state.wallet };
};

export default connect(
  mapStateToProps,
  { editTotalValue }
)(CurrenciesList);
