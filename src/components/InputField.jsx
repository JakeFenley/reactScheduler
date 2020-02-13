import React, { Component } from "react";

class InputField extends Component {
  state = {
    inputValue: ""
  };
  render() {
    const { type, onAdd } = this.props;
    return (
      <div className="input-group">
        <input
          value={this.state.inputValue}
          onChange={e => this.updateInputValue(e)}
          className="form-control"
          placeholder={"Click to add a new " + type}
        ></input>
        <button
          onClick={() => {
            onAdd(this.state.inputValue);
            this.resetInputValue();
          }}
          className={this.formatBtn()}
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

  formatBtn() {
    const { type } = this.props;
    if (type === "Project") {
      return "btn btn-outline-dark";
    } else if (type === "Task") {
      return "btn btn-outline-dark";
    }
  }
}

export default InputField;
