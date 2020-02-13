import React, { Component } from "react";

class CloseIcon extends Component {
  render() {
    return (
      <svg
        style={{ width: "20px", height: "20px" }}
        viewport="0 0 12 12"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="1" y1="15" x2="15" y2="1" stroke="black" strokeWidth=".7" />
        <line x1="1" y1="1" x2="15" y2="15" stroke="black" strokeWidth=".7" />
      </svg>
    );
  }
}

export default CloseIcon;
