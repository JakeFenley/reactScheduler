import React, { Component } from "react";
import Calendar from "react-calendar";
import CloseIcon from "./CloseIcon";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import moment from "moment";

const timeFormat = "h:mm a";
class TaskEditor extends Component {
  state = {
    calendarToggle: "todo-hidden"
  };

  render() {
    const {
      mainToggle,
      onClose,
      onDateChange,
      task,
      onTimeChange
    } = this.props;

    if (task) {
      return (
        <main id="task-editor-wrap" className={mainToggle}>
          <div id="task-editor">
            <Calendar
              value={task.date}
              className={this.state.calendarToggle + " todo-calendar"}
              onChange={e => {
                this.onCalClose(e);
                onDateChange(e);
              }}
            ></Calendar>
            <div className="row justify-content-end mx-1">
              <div
                onClick={() => {
                  onClose();
                }}
              >
                <CloseIcon></CloseIcon>
              </div>
            </div>
            <div className="row justify-content-around">
              <form onSubmit={this.submitHandler}>
                <input
                  onChange={e => this.updateTitle(e)}
                  value={task.name}
                ></input>
              </form>
              <button
                onClick={() => this.onCalOpen()}
                className="btn btn-light"
              >
                Date
              </button>
            </div>
            <div className="row mx-1">
              <TimePicker
                showSecond={false}
                defaultOpenValue={this.formatTime(task.date)}
                value={this.formatTime(task.date)}
                format={timeFormat}
                use12Hours
                onChange={e => onTimeChange(e)}
              ></TimePicker>
              <p></p>
            </div>
          </div>
        </main>
      );
    } else {
      return <div></div>;
    }
  }

  formatTime = t => {
    let now = moment()
      .hour(t.getHours())
      .minute(t.getMinutes());
    return now;
  };

  submitHandler = e => {
    e.preventDefault();
  };

  onCalOpen = () => {
    if (this.state.calendarToggle === "todo-hidden") {
      const calendarToggle = "todo-visible";
      this.setState({ calendarToggle });
    }
  };

  onCalClose = e => {
    if (this.state.calendarToggle === "todo-visible") {
      const calendarToggle = "todo-hidden";

      this.setState({ calendarToggle });
    }
  };
}

export default TaskEditor;
