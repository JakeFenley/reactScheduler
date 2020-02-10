import React, { Component } from "react";
import InputField from "./InputField";

class Project extends Component {
  render() {
    const { onAdd, onSelect, project, onDelete } = this.props;
    return (
      <main className="col-4 d-flex flex-column justify-content-between">
        {project.tasks.map(task => (
          <div key={task.id} className="row justify-content-between">
            <p onClick={() => onSelect(task.id)}>{task.name}</p>
            <label
              onClick={() => onDelete(task.id)}
              className="badge badge-pill badge-danger align-middle"
            >
              <span className=" align-middle">Delete</span>
            </label>
          </div>
        ))}
        <InputField onAdd={onAdd} type="Task"></InputField>
      </main>
    );
  }
}

export default Project;
