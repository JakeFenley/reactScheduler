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
    mainToggle: "todo-hidden"
  };

  showSettings(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div id="Wrapper">
        <Burger></Burger>
        <div id="inner-container" className="container-fluid">
          <Navbar></Navbar>
          <section className="row" id="main-section">
            <TaskEditor
              onTimeChange={this.handleTimeUpdate}
              onDateChange={this.handleDateUpdate}
              task={this.getCurrentTask()}
              onClose={this.handleCloseTaskEdit}
              mainToggle={this.state.mainToggle}
            ></TaskEditor>
            <Projects
              viewAll={this.handleViewAll}
              onSelect={this.handleProjectSelect}
              projects={this.state.projects}
              onAdd={this.handleProjectAdd}
              onDelete={this.handleProjectDelete}
            ></Projects>

            <Project
              onDelete={this.handleTaskDelete}
              onSelect={this.handleTaskSelect}
              onAdd={this.handleTaskAdd}
              project={this.getCurrentProject()}
            ></Project>

            <Task
              onEdit={this.handleOpenTaskEdit}
              task={this.getCurrentTask()}
            ></Task>
          </section>
        </div>
      </div>
    );
  }

  handleTimeUpdate = e => {
    if (e !== null) {
      let projects = this.state.projects;
      const task = this.getCurrentTask();
      const tIndex = this.getTaskIndex(task);
      const pIndex = this.getProjectIndex(task.id, tIndex);
      const hr = e._d.getHours();
      const min = e._d.getMinutes();
      const y = projects[pIndex].tasks[tIndex].date.getFullYear();
      const m = projects[pIndex].tasks[tIndex].date.getMonth();
      const d = projects[pIndex].tasks[tIndex].date.getDate();
      task.date = new Date(y, m, d, hr, min);
      projects[pIndex].tasks[tIndex] = task;
      this.setState({ projects });
    }
  };

  handleDateUpdate = e => {
    let projects = this.state.projects;
    const task = this.getCurrentTask();
    const tIndex = this.getTaskIndex(task);
    const pIndex = this.getProjectIndex(task.id, tIndex);
    const hr = projects[pIndex].tasks[tIndex].date.getHours();
    const min = projects[pIndex].tasks[tIndex].date.getMinutes();
    const y = e.getFullYear();
    const m = e.getMonth();
    const d = e.getDate();
    task.date = new Date(y, m, d, hr, min);
    projects[pIndex].tasks[tIndex] = task;
    this.setState({ projects });
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

  handleCloseTaskEdit = () => {
    if (this.state.mainToggle === "todo-visible") {
      const mainToggle = "todo-hidden";
      this.setState({ mainToggle });
    }
  };

  handleOpenTaskEdit = () => {
    if (this.state.mainToggle === "todo-hidden") {
      const mainToggle = "todo-visible";
      this.setState({ mainToggle });
    }
  };

  handleTaskDelete = id => {
    for (var i = 0; i <= this.state.projects.length - 1; i++) {
      for (var y = 0; y <= this.state.projects[i].tasks.length - 1; y++) {
        if (this.state.projects[i].tasks[y].id === id) {
          let projects = this.state.projects;
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
