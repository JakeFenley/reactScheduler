import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";

class Burger extends Component {
  showSettings(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Menu pageWrapId={"inner-container"} outerContainerId={"Wrapper"} right>
          <a id="home" className="menu-item" href="/">
            Home
          </a>
          <a id="about" className="menu-item" href="/about">
            About
          </a>
          <a id="contact" className="menu-item" href="/contact">
            Contact
          </a>
          <a onClick={this.showSettings} className="menu-item--small" href="#e">
            Settings
          </a>
        </Menu>{" "}
      </div>
    );
  }
}

export default Burger;
