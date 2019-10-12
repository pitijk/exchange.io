import React, { useEffect } from "react";
import { fetchExchangeRates } from "../actions";
import { connect } from "react-redux";

import Wallet from "./Wallet.js";
import AddCurrency from "./AddCurrency";
import BalanceHeading from "./BalanceHeading";

const App = props => {
  useEffect(() => props.fetchExchangeRates(props.defaultCurrency));
  return (
    <div className="container-fluid">
      <BalanceHeading />
      <div className="row">
        <div className="col-md-8">
          <Wallet />
        </div>
        <div className="col-md-4">
          <AddCurrency />
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
