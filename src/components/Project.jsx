import React, { Component } from "react";
import InputField from "./InputField";

class Project extends Component {
  render() {
    const { onAdd, onSelect, project, onDelete, inputDisabled } = this.props;
    if (project.id > 0) {
      return (
        <main className="col-3 d-flex flex-column justify-content-between task-container ml-4">
          <div className="mt-4">
            <h5 className="pb-2">{project.name}</h5>
            {project.tasks.map(task => (
              <div key={task.id} className="row justify-content-between">
                <p className="pl-3 selector" onClick={() => onSelect(task.id)}>
                  {task.name}
                </p>
                <label
                  onClick={() => onDelete(task.id)}
                  className="badge badge-pill delete-btn align-middle mr-1"
                >
                  <span className=" align-middle">Delete</span>
                </label>
              </div>
            ))}
          </div>
          <div className="mb-2">
            <InputField
              inputDisabled={inputDisabled}
              onAdd={onAdd}
              type="Task"
            ></InputField>
          </div>
        </main>
      );
    } else {
      return (
        <main className="col-3 d-flex flex-column justify-content-between task-container ml-4">
          <div className="mt-4">
            <h5 className="pb-2">{project.name}</h5>
            {project.tasks.map(task => (
              <div key={task.id} className="row justify-content-between">
                <p className="pl-3 selector" onClick={() => onSelect(task.id)}>
                  {task.name}
                </p>
                <label
                  onClick={() => onDelete(task.id)}
                  className="badge badge-pill delete-btn align-middle mr-1"
                >
                  <span className=" align-middle">Delete</span>
                </label>
              </div>
            ))}
          </div>
        </main>
      );
    }
  }
}

export default Project;
