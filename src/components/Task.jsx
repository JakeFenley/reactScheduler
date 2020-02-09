import React, { Component } from "react";

class Task extends Component {
  render() {
    const { task } = this.props;
    if (task) {
      return (
        <main className="col-4">
          <p>{task.name}</p>
          <p>{task.date}</p>
        </main>
      );
    } else {
      return <div></div>;
    }
  }
}

export default Task;
