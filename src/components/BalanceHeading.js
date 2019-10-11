import React from "react";
import { connect } from "react-redux";
import { signs } from "../statics";

const BalanceHeading = props => {
  const renderPercent = () => {
    const percent =
      (props.currentTotalValue / props.previousTotalValue - 1) * 100;
    if (percent > 0) {
      return <p className="text-success">{`(+${percent.toFixed(2)}%)`}</p>;
    } else {
      return <p className="text-danger">{`(${percent.toFixed(2)}%)`}</p>;
    }
  };

  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4">{`Your balance: ${props.currentTotalValue.toFixed(
          2
        )}${signs[props.defaultCurrency]}`}</h1>
        {renderPercent()}
      </div>
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
