import React, { Component } from "react";
import InputField from "./InputField";

class Projects extends Component {
  render() {
    const {
      projects,
      onAdd,
      onSelect,
      onDelete,
      viewAll,
      inputDisabled
    } = this.props;
    return (
      <main className="col-sm-2 d-flex flex-column justify-content-between sidebar projects-list">
        <div className="mt-4">
          <h5 className="selector pb-2" onClick={() => viewAll()}>
            All Tasks
          </h5>
          {projects.map(project => (
            <div key={project.id} className="row justify-content-between">
              <p className="pl-3 selector" onClick={() => onSelect(project.id)}>
                {project.name}
              </p>
              <label
                onClick={() => onDelete(project.id)}
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
            type="Project"
          ></InputField>
        </div>
      </main>
    );
  }
}

export default Projects;
