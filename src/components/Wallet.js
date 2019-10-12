import React, { useState } from "react";
import { connect } from "react-redux";
import { ascendingCurrencyOrder, descendingCurrencyOrder } from "../actions";
import Currency from "./Currency";

const Wallet = props => {
  const [ascending, setAscending] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

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
        <Currency
          key={shortcut}
          shortcut={shortcut}
          amount={amount}
          value={value}
          isEditing={isEditing}
        />
      );
    });
  };

  return (
    <div className="container">
      <div className="row mb-3">
        <h1 className="col-md-10">Your Wallet</h1>
        <div className="col-md-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn btn-secondary"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>
      <div className="row mx-2">
        <h4 className="col-md-4 text-primary">Currency</h4>
        <h4 className="col-md-4 text-primary">Amount</h4>
        <div className="col-md-4 row">
          <h4 className="text-primary">Value</h4>
          {renderSortingButton()}
        </div>
      </div>
      {renderCurrencies()}
    </div>
  );
};

const mapStateToProps = state => {
  return { wallet: state.wallet };
};

export default connect(
  mapStateToProps,
  { ascendingCurrencyOrder, descendingCurrencyOrder }
)(Wallet);
