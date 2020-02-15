import React, { Component } from "react";
import Moment from "react-moment";

class Task extends Component {
  render() {
    const { task, onEdit } = this.props;
    if (task) {
      return (
        <main className="col-3 d-flex flex-column justify-content-between task-container ml-4">
          <div className="mt-4">
            <h5 className="task-title">{task.name}</h5>
            <Moment className="taskinfo" format="DD/MM/YYYY">
              {task.date}
            </Moment>
            <div className="mt-2">
              <Moment className="taskinfo" format="LT">
                {task.date}
              </Moment>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <p className="taskinfo">{task.desc}</p>
            </div>
          </div>
          <div className="row justify-content-between">
            <div className="col-1"></div>
            <label
              onClick={() => onEdit()}
              className="badge badge-pill edit-add-btn align-middle px-3 mr-4"
            >
              <span className=" align-middle">Edit/Add Details</span>
            </label>
          </div>
        </main>
      );
    } else {
      return (
        <main className="col-4 d-flex flex-column justify-content-between task-container ml-4">
          <div className="mt-4">
            <h5>No Task Selected</h5>
          </div>
        </main>
      );
    }
  }
}

export default Task;
