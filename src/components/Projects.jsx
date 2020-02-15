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
      <main className="col-sm-3 d-flex flex-column justify-content-between sidebar projects-list">
        <div className="mt-4">
          <div className="row">
            <h5 className="selector pb-2" onClick={() => viewAll()}>
              All Tasks
            </h5>
          </div>
          {projects.map(project => (
            <div key={project.id} className="row justify-content-between">
              <p className="selector" onClick={() => onSelect(project.id)}>
                {project.name}
              </p>
              <div className="delete-btn-wrap">
                <label
                  onClick={() => onDelete(project.id)}
                  className="delete-btn align-middle mr-1"
                >
                  <span className=" align-middle">Delete</span>
                </label>
              </div>
            </div>
          ))}
        </div>
        <div className="mb-2">
          <InputField
            projId={1}
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
