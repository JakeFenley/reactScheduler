import React, { Component } from "react";
import InputField from "./InputField";

class Project extends Component {
  formatLabelClass(priority) {
    return priority === true ? "selector priority" : "selector";
  }

  render() {
    const { onAdd, onSelect, project, onDelete, inputDisabled } = this.props;

    return (
      <main className="col-3 d-flex flex-column justify-content-between task-container ml-4">
        <div className="mt-4">
          <h5 className="project-title">{project.name}</h5>
          {project.tasks.map(task => (
            <div
              key={task.id}
              className="row justify-content-between align-items-center"
            >
              <span
                className={this.formatLabelClass(task.priority)}
                onClick={() => onSelect(task.id)}
              >
                {task.name}
              </span>
              <label
                onClick={() => onDelete(task.id)}
                className="delete-btn mr-1"
              >
                <span className="align-middle">Delete</span>
              </label>
            </div>
          ))}
        </div>
        <div className="mb-2">
          <InputField
            projId={project.id}
            inputDisabled={inputDisabled}
            onAdd={onAdd}
            type="Task"
          ></InputField>
        </div>
      </main>
    );
  }
}

export default Project;
