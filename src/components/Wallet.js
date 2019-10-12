import React from "react";
import { connect } from "react-redux";
import { signs } from "../statics";

const Wallet = props => {
  const renderCurrencies = () => {
    return props.wallet.map(({ shortcut, amount }) => {
      return (
        <div key={shortcut} className="row">
          <h4 className="col-md-4">{shortcut}</h4>
          <h4 className="col-md-4">{amount + signs[shortcut]}</h4>
          <h4 className="col-md-4">work in progress..</h4>
        </div>
      );
    });
  };

  return (
    <div className="container">
      <div className="row">
        <h4 className="col-md-4">Currency</h4>
        <h4 className="col-md-4">Amount</h4>
        <h4 className="col-md-4">Value</h4>
      </div>
      {renderCurrencies()}
    </div>
  );
};

const mapStateToProps = state => {
  return { wallet: state.wallet };
};

export default connect(mapStateToProps)(Wallet);
