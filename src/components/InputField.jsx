import React, { Component } from "react";

class InputField extends Component {
  state = {
    inputValue: ""
  };
  render() {
    const { type, onAdd, inputDisabled } = this.props;
    return (
      <div id="form-group">
        <input
          key="InputField"
          disabled={inputDisabled}
          value={this.state.inputValue}
          onChange={e => this.updateInputValue(e)}
          className="form-input-lg"
          placeholder={"Click to add a new " + type}
        ></input>
        <button
          onClick={() => {
            onAdd(this.state.inputValue);
            this.resetInputValue();
          }}
          className="form-btn"
        >
          +
        </button>
      </div>
    );
  }

  resetInputValue = () => {
    let inputValue = "";
    this.setState({ inputValue });
  };

  updateInputValue(e) {
    this.setState({ inputValue: e.target.value });
  }
}

export default InputField;
