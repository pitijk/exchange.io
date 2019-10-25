import "../sass/index.scss";

import React, { useEffect } from "react";
import { fetchExchangeRates } from "../actions";
import { connect } from "react-redux";

import Wallet from "./Wallet.js";
import AddCurrency from "./AddCurrency";
import BalanceHeading from "./BalanceHeading";
import ChangeDefault from "./ChangeDefault";

const App = props => {
  const { defaultCurrency } = props;
  useEffect(() => props.fetchExchangeRates(defaultCurrency), []);
  return (
    <main className="main-container">
      <BalanceHeading />
      <div className="divided-container">
        <div className="divided-container__card left">
          <Wallet />
        </div>
        <div className="divided-container__card">
          <h2 className="header--right">Add Currency</h2>
          <div className="forms">
            <AddCurrency />
            <ChangeDefault defaultCurrency={defaultCurrency} />
          </div>
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = state => {
  return { defaultCurrency: state.defaultCurrency };
};
export default connect(
  mapStateToProps,
  { fetchExchangeRates }
)(App);
