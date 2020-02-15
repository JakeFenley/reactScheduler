import React, { Component } from "react";

class InputField extends Component {
  state = {
    inputValue: ""
  };
  render() {
    const { type, onAdd, inputDisabled, projId } = this.props;
    return (
      <div id="form-group" className={this.formatWrap(projId)}>
        <input
          onKeyPress={e => this.handleKeyPress(e)}
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

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.props.onAdd(this.state.inputValue);
      this.resetInputValue();
    }
  };

  formatWrap(id) {
    return id > 0 ? "todo-visible" : "todo-hidden";
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
