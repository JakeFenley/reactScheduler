import React, { Component } from "react";
import Projects from "../components/Projects";
import Project from "../components/Project";
import Task from "../components/Task";

class Main extends Component {
  state = {
    projects: [
      {
        id: 1,
        name: "Grocery List",
        tasks: [
          { id: 1, name: "Bananas", date: "02/03/20" },
          { id: 2, name: "Apples", date: "01/03/20" }
        ]
      }
    ],
    currentProjectID: 1,
    currentTaskID: 1,
    projectsCounter: 1,
    taskCounter: 2
  };

  render() {
    return (
      <div className="row">
        <Projects
          viewAll={this.handleViewAll}
          onSelect={this.handleProjectSelect}
          projects={this.state.projects}
          onAdd={this.handleProjectAdd}
          onDelete={this.handleProjectDelete}
        ></Projects>
        <Project
          onSelect={this.handleTaskSelect}
          onAdd={this.handleTaskAdd}
          project={this.getCurrentProject()}
        ></Project>
        <Task task={this.getCurrentTask()}></Task>
      </div>
    );
  }

  handleViewAll = () => {
    const currentProjectID = 0;
    const currentTaskID = 1;
    this.setState({ currentTaskID, currentProjectID });
  };

  handleProjectDelete = id => {
    if (this.state.projects.length > 1) {
      const p = this.state.projects.filter(p => p.id === id);
      const index = this.state.projects.indexOf(p[0]);
      let projects = this.state.projects;
      projects.splice(index, 1);
      this.setState({ projects });
      this.handleViewAll();
    }
  };

  handleProjectSelect = id => {
    const currentProjectID = id;
    const project = this.state.projects.filter(p => p.id === id);
    if (project[0].tasks.length > 0) {
      const currentTaskID = project[0].tasks[0].id;
      this.setState({ currentTaskID });
    }
    this.setState({ currentProjectID });
  };

  handleTaskSelect = id => {
    const currentTaskID = id;
    this.setState({ currentTaskID });
  };

  handleTaskAdd = name => {
    if (name.length < 1 || this.state.currentProjectID === 0) {
      return;
    } else {
      let project = this.getCurrentProject();
      const taskCounter = this.state.taskCounter + 1;
      this.setState({ taskCounter });
      const newTask = {
        id: taskCounter,
        name: name,
        date: "Date not set"
      };
      project.tasks.push(newTask);
      this.setState({ project });
    }
  };

  handleProjectAdd = name => {
    if (name.length < 1) {
      return;
    } else {
      const projectsCounter = this.state.projectsCounter + 1;
      const newProject = {
        id: projectsCounter,
        name: name,
        tasks: []
      };
      let projects = this.state.projects;
      projects.push(newProject);
      const currentProjectID = newProject.id;
      this.setState({ projectsCounter, projects, currentProjectID });
    }
  };

  getCurrentTask() {
    const currentTask = this.getCurrentProject().tasks.filter(
      task => task.id === this.state.currentTaskID
    );
    return currentTask[0];
  }

  getCurrentProject() {
    if (this.state.currentProjectID > 0) {
      const currentProject = this.state.projects.filter(
        p => p.id === this.state.currentProjectID
      );
      return currentProject[0];
    } else {
      let project = {
        id: 0,
        name: "All Tasks",
        tasks: []
      };
      for (var i = 0; i <= this.state.projects.length - 1; i++) {
        for (var y = 0; y <= this.state.projects[i].tasks.length - 1; y++) {
          project.tasks.push(this.state.projects[i].tasks[y]);
        }
      }
      return project;
    }
  }
}

export default Main;
