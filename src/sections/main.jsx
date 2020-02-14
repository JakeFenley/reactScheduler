import React, { Component } from "react";
import Projects from "../components/Projects";
import Project from "../components/Project";
import Task from "../components/Task";
import TaskEditor from "../components/TaskEditor";
import Navbar from "../components/Nav";
import Burger from "../components/Burger";

class Main extends Component {
  state = {
    projects: [
      {
        id: 1,
        name: "Grocery List",
        tasks: [
          {
            id: 1,
            name: "Bananas",
            date: new Date(),
            desc: "Eat a barrel of bananas",
            priority: true
          },
          {
            id: 2,
            name: "Apples",
            date: new Date(),
            desc: "Go apeshit for apples",
            priority: false
          }
        ]
      }
    ],
    currentProjectID: 1,
    currentTaskID: 1,
    projectsCounter: 1,
    taskCounter: 2,
    mainToggle: "todo-hidden",
    inputDisabled: false
  };

  showSettings(event) {
    event.preventDefault();
  }

  formatOverlay = () => {
    if (this.state.inputDisabled === false) {
      return "task-editor-overlay todo-hidden";
    } else {
      return "task-editor-overlay todo-visible";
    }
  };

  render() {
    return (
      <div id="Wrapper">
        <Burger></Burger>
        <div id="inner-container" className="container-fluid">
          <div
            onClick={this.handleTaskEditToggle}
            className={this.formatOverlay()}
          ></div>
          <Navbar></Navbar>
          <TaskEditor
            onNameChange={this.handleNameUpdate}
            onTimeChange={this.handleTimeUpdate}
            onDateChange={this.handleDateUpdate}
            task={this.getCurrentTask()}
            onClose={this.handleTaskEditToggle}
            mainToggle={this.state.mainToggle}
          ></TaskEditor>
          <section className="row" id="main-section">
            <Projects
              inputDisabled={this.state.inputDisabled}
              viewAll={this.handleViewAll}
              onSelect={this.handleProjectSelect}
              projects={this.state.projects}
              onAdd={this.handleProjectAdd}
              onDelete={this.handleProjectDelete}
            ></Projects>

            <Project
              inputDisabled={this.state.inputDisabled}
              onDelete={this.handleTaskDelete}
              onSelect={this.handleTaskSelect}
              onAdd={this.handleTaskAdd}
              project={this.getCurrentProject()}
            ></Project>

            <Task
              onEdit={this.handleTaskEditToggle}
              task={this.getCurrentTask()}
            ></Task>
          </section>
        </div>
      </div>
    );
  }
  _updateTaskState = task => {
    const projects = this.state.projects;
    const tIndex = this.getTaskIndex(task);
    const pIndex = this.getProjectIndex(task.id, tIndex);
    projects[pIndex].tasks[tIndex] = task;
    this.setState({ projects });
  };

  handleNameUpdate = e => {
    const task = this.getCurrentTask();
    task.name = e.target.value;
    this._updateTaskState(task);
  };

  handleTimeUpdate = e => {
    if (e !== null) {
      const task = this.getCurrentTask();
      task.date = new Date(
        task.date.getFullYear(),
        task.date.getMonth(),
        task.date.getDate(),
        e._d.getHours(),
        e._d.getMinutes()
      );
      this._updateTaskState(task);
    }
  };

  handleDateUpdate = e => {
    const task = this.getCurrentTask();
    task.date = new Date(
      e.getFullYear(),
      e.getMonth(),
      e.getDate(),
      task.date.getHours(),
      task.date.getMinutes()
    );
    this._updateTaskState(task);
  };

  getProjectIndex = (taskID, index) => {
    for (var i = 0; i <= this.state.projects.length - 1; i++) {
      if (this.state.projects[i].tasks[index].id === taskID) {
        return i;
      }
    }
  };

  getTaskIndex = task => {
    for (var i = 0; i <= this.state.projects.length - 1; i++) {
      for (var y = 0; y <= this.state.projects[i].tasks.length - 1; y++) {
        if (this.state.projects[i].tasks[y].id === task.id) {
          return y;
        }
      }
    }
  };

  handleTaskEditToggle = () => {
    if (this.state.mainToggle === "todo-hidden") {
      const mainToggle = "todo-visible";
      this.setState({ mainToggle, inputDisabled: true });
    } else if (this.state.mainToggle === "todo-visible") {
      const mainToggle = "todo-hidden";
      this.setState({ mainToggle, inputDisabled: false });
    }
  };

  handleTaskDelete = id => {
    for (var i = 0; i <= this.state.projects.length - 1; i++) {
      for (var y = 0; y <= this.state.projects[i].tasks.length - 1; y++) {
        if (this.state.projects[i].tasks[y].id === id) {
          const projects = this.state.projects;
          projects[i].tasks.splice(y, 1);
          this.setState({ projects });
          return;
        }
      }
    }
  };

  handleViewAll = () => {
    const currentProjectID = 0;
    const currentTaskID = 1;
    this.setState({ currentTaskID, currentProjectID });
  };

  handleProjectDelete = id => {
    if (this.state.projects.length > 1) {
      const p = this.state.projects.filter(p => p.id === id);
      const index = this.state.projects.indexOf(p[0]);
      const projects = this.state.projects;
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
      const project = this.getCurrentProject();
      const taskCounter = this.state.taskCounter + 1;
      this.setState({ taskCounter });
      const newTask = {
        id: taskCounter,
        name: name,
        date: new Date(),
        desc: "",
        priority: false
      };
      project.tasks.push(newTask);
      const currentTaskID = taskCounter;
      this.setState({ project, currentTaskID });
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
      const projects = this.state.projects;
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
      const project = {
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
