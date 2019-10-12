import React from "react";
import { connect } from "react-redux";

const Wallet = props => {
  return <div className="col-md-8">Wallet</div>;
};

const mapStateToProps = state => {
  return { wallet: state.wallet };
};

export default connect(mapStateToProps)(Wallet);
