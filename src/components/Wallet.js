import React, { useState } from "react";
import { connect } from "react-redux";
import { ascendingCurrencyOrder, descendingCurrencyOrder } from "../actions";
import { signs } from "../statics";

const Wallet = props => {
  const [ascending, setAscending] = useState(true);

  const renderSortingButton = () => {
    if (ascending) {
      props.ascendingCurrencyOrder();
      const onClick = () => {
        props.descendingCurrencyOrder();
        setAscending(false);
      };
      return <i onClick={onClick} className="fas fa-caret-up ml-1 mt-1"></i>;
    } else {
      props.descendingCurrencyOrder();
      const onClick = () => {
        props.ascendingCurrencyOrder();
        setAscending(true);
      };
      return <i onClick={onClick} className="fas fa-caret-down ml-1 mt-1"></i>;
    }
  };
  const renderCurrencies = () => {
    return props.wallet.map(({ shortcut, amount, value }) => {
      return (
        <div key={shortcut} className="row">
          <h4 className="col-md-4">{shortcut}</h4>
          <h4 className="col-md-4">{amount + signs[shortcut]}</h4>
          <h4 className="col-md-4">
            {value.toFixed(2) + signs[props.defaultCurrency]}
          </h4>
        </div>
      );
    });
  };

  return (
    <div className="container">
      <div className="row">
        <h4 className="col-md-4">Currency</h4>
        <h4 className="col-md-4">Amount</h4>
        <div className="col-md-4 row">
          <h4>Value</h4>
          {renderSortingButton()}
        </div>
      </div>
      {renderCurrencies()}
    </div>
  );
};

const mapStateToProps = state => {
  return { wallet: state.wallet, defaultCurrency: state.defaultCurrency };
};

export default connect(
  mapStateToProps,
  { ascendingCurrencyOrder, descendingCurrencyOrder }
)(Wallet);
