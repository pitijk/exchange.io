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
    <div className="container-fluid">
      <BalanceHeading />
      <div className="row">
        <div className="col-md-8">
          <Wallet />
        </div>
        <div className="col-md-4">
          <AddCurrency />
          <ChangeDefault defaultCurrency={defaultCurrency} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { defaultCurrency: state.defaultCurrency };
};
export default connect(
  mapStateToProps,
  { fetchExchangeRates }
)(App);
