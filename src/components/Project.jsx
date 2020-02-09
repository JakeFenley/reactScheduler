import React, { Component } from "react";
import InputField from "./InputField";

class Project extends Component {
  render() {
    const { onAdd, onSelect, project } = this.props;
    return (
      <main className="col-4 d-flex flex-column justify-content-between">
        <div>
          {project.tasks.map(task => (
            <p onClick={() => onSelect(task.id)} key={task.id}>
              {task.name}
            </p>
          ))}
        </div>
        <InputField onAdd={onAdd} type="Task"></InputField>
      </main>
    );
  }
}

export default Project;
