import React, { useState } from "react";
import { connect } from "react-redux";
import { ascendingCurrencyOrder, descendingCurrencyOrder } from "../actions";
import CurrenciesList from "./CurrenciesList";

const Wallet = props => {
  const [ascending, setAscending] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [firstTime, setFirstTime] = useState(true);

  const renderSortingButton = () => {
    if (ascending) {
      // props.ascendingCurrencyOrder();
      const onClick = () => {
        props.descendingCurrencyOrder();
        setAscending(false);
      };
      return <i onClick={onClick} className="fas fa-caret-up ml-1 mt-1"></i>;
    } else {
      // props.descendingCurrencyOrder();
      const onClick = () => {
        props.ascendingCurrencyOrder();
        setAscending(true);
      };
      return <i onClick={onClick} className="fas fa-caret-down ml-1 mt-1"></i>;
    }
  };

  const onButtonClick = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setFirstTime(false);
      setIsEditing(true);
    }
  };
  return (
    <div className="container">
      <div className="row mb-3">
        <h1 className="col-md-10">Your Wallet</h1>
        <div className="col-md-2">
          <button onClick={onButtonClick} className="btn btn-secondary">
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
      <CurrenciesList isEditing={isEditing} firstTime={firstTime} />
    </div>
  );
};

export default connect(
  null,
  { ascendingCurrencyOrder, descendingCurrencyOrder }
)(Wallet);
