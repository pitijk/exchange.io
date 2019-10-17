import React from "react";
import { connect } from "react-redux";
import { signs } from "../statics";

const BalanceHeading = props => {
  const renderPercent = () => {
    const percent =
      (props.currentTotalValue / props.previousTotalValue - 1) * 100;
    if (!props.currentTotalValue) {
      return;
    }
    if (percent >= 0) {
      return (
        <span className="percent positive">{` ( +${percent.toFixed(
          2
        )}% )`}</span>
      );
    } else {
      return (
        <span className="percent negative">{` (${percent.toFixed(2)}%)`}</span>
      );
    }
  };

  return (
    <div className="jumbotron">
      <h1 className="jumbotron__balance">
        {`Your balance: 
        ${props.currentTotalValue.toFixed(2)}
        ${signs[props.defaultCurrency]}`}
        {renderPercent()}
      </h1>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentTotalValue: state.totalValue.current,
    previousTotalValue: state.totalValue.previous,
    defaultCurrency: state.defaultCurrency
  };
};

export default connect(mapStateToProps)(BalanceHeading);
