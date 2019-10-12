import React from "react";
import { connect } from "react-redux";
import { signs } from "../statics";

const BalanceHeading = props => {
  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4">{`Your balance: ${props.totalValue.toFixed(
          2
        )}${signs[props.defaultCurrency]}`}</h1>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    totalValue: state.totalValue,
    defaultCurrency: state.defaultCurrency
  };
};

export default connect(mapStateToProps)(BalanceHeading);
