import React, { Component } from "react";
import InputField from "./InputField";

class Projects extends Component {
  render() {
    const { projects, onAdd, onSelect, onDelete, viewAll } = this.props;
    return (
      <main className="col-sm-3 d-flex flex-column justify-content-between bg-dark sidebar">
        <div>
          <p onClick={() => viewAll()}>All Tasks</p>
          {projects.map(project => (
            <div key={project.id} className="row justify-content-between">
              <p onClick={() => onSelect(project.id)}>{project.name}</p>
              <label
                onClick={() => onDelete(project.id)}
                className="badge badge-pill badge-danger align-middle"
              >
                <span className=" align-middle">Delete</span>
              </label>
            </div>
          ))}
        </div>
        <InputField onAdd={onAdd} type="Project"></InputField>
      </main>
    );
  }
}

export default Projects;
