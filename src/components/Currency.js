import React, { useState } from "react";
import { signs, regex } from "../statics";
import { connect } from "react-redux";
import { deleteCurrency, editCurrency } from "../actions";

const Currency = props => {
  const { shortcut, amount, value, isEditing } = props;
  const [valueInput, setValueInput] = useState(amount);

  const onValueInputChange = event => {
    const str = event.target.value;
    // var result = regex.test(str);
    // result ? backToNormal : warning
    setValueInput(str);
  };

  const handleSubmit = () => {
    if (regex.test(valueInput)) {
      // editCurrency = (shortcut, amount)
      props.editCurrency(shortcut, Number(valueInput));
    }
  };

  if (isEditing) {
    return (
      <div className="row">
        <h4 className="col-md-3">{shortcut}</h4>
        <div className="col-md-3">
          <input
            onChange={onValueInputChange}
            value={valueInput}
            type="text"
            className="form-control"
            id="value"
            placeholder="value"
          />
        </div>
        <h4 className="col-md-3">
          {value.toFixed(2) + signs[props.defaultCurrency]}
        </h4>
        <div className="col-md-3">
          <button
            onClick={() => props.deleteCurrency(shortcut)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    );
  } else {
    handleSubmit();
    return (
      <div className="row">
        <h4 className="col-md-3">{shortcut}</h4>
        <h4 className="col-md-3">{amount + signs[shortcut]}</h4>
        <h4 className="col-md-3">
          {value.toFixed(2) + signs[props.defaultCurrency]}
        </h4>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return { defaultCurrency: state.defaultCurrency };
};

export default connect(
  mapStateToProps,
  { deleteCurrency, editCurrency }
)(Currency);
