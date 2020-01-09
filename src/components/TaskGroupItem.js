import React from "react";
import styled from "styled-components";
import TaskItem from "./TaskItem";
import { Input } from "semantic-ui-react";

const TaskGroupItemWrapper = styled.div`
  margin: 15px;
  width: 400px;
  overflow-y: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.09);
  padding: 10px;
`;

const TaskGroupHeading = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #3d3d3d;
`;

const TaskGroupTitle = styled.div`
  padding: 10px;
  color: #fff;
  right: 0;
  left: 0;
  top: 0;
`;

const TaskGroupControls = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TaskGroupSave = styled.div`
  color: #fff;
  padding: 5px;
`;
const TaskGroupEdit = styled.div`
  color: #fff;
  padding: 5px;
`;
const TaskGroupDeleteItem = styled.div`
  color: #fff;
  padding: 5px;
`;

const TaskInput = styled.div`
  margin-top: 20px;
`;

class TaskGroupItem extends React.Component {
  state = {
    loading: true,
    tasks: [],
    isEdit: false,
    addText: "",
    editText: this.props.title
  };

  componentDidMount() {
    fetch(`/api/tasks?id=${this.props.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${window.localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          loading: false,
          tasks: res
        });
      })
      .catch(error => {
        this.setState({
          error: true
        });
      });
  }

  handleTaskDelete(task_id) {
    console.log(task_id);
    this.setState(state => ({
      tasks: state.tasks.filter(item => item.id !== task_id)
    }));
  }

  handleTaskEdit(task_id, content) {
    console.log(content);
    this.setState(state => ({
      tasks: state.tasks.map(item =>
        item.id == task_id ? { ...item, content: content } : item
      )
    }));
  }

  handleAddTask() {
    console.log("hi", this.state.addText, this.props.id);
    fetch(`/api/createtask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${window.localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        taskgroupid: this.props.id,
        content: this.state.addText
      })
    })
      .then(res => res.json())
      .then(res => {
        this.setState(state => ({
          tasks: [...state.tasks, res],
          addText: ""
        }));
      })
      .catch(error => {
        this.setState({
          error: true
        });
      });
  }

  handleTaskGroupDelete() {
    fetch(`/api/taskgroup/${this.props.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${window.localStorage.getItem("token")}`
      }
    })
      .then(res => {
        this.props.onDelete(this.props.id);
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: true
        });
      });
  }

  handleTaskGroupEdit() {
    fetch(`/api/taskgroup/${this.props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${window.localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        title: this.state.editText
      })
    })
      .then(res => {
        this.props.onUpdate(this.props.id, this.state.editText);
        this.setState({ isEdit: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: true
        });
      });
  }

  renderTasks() {
    if (this.state.loading) return <p>Loading!!</p>;
    return this.state.tasks.map(task => (
      <TaskItem
        taskgroupid={this.props.id}
        id={task.id}
        content={task.content}
        key={`task-${task.id}`}
        onDelete={task_id => this.handleTaskDelete(task_id)}
        onUpdate={(task_id, content) => this.handleTaskEdit(task_id, content)}
      />
    ));
  }

  render() {
    return (
      <TaskGroupItemWrapper>
        <TaskGroupHeading>
          {this.state.isEdit && (
            <Input
              style={{ flex: 1 }}
              fluid
              value={this.state.editText}
              onChange={e => this.setState({ editText: e.target.value })}
              action={{
                icon: "save",
                onClick: () => this.handleTaskGroupEdit()
              }}
              placeholder="Save"
            />
          )}
          {!this.state.isEdit && (
            <TaskGroupTitle>{this.props.title}</TaskGroupTitle>
          )}
          <TaskGroupControls>
            {!this.state.isEdit && (
              <TaskGroupEdit onClick={() => this.setState({ isEdit: true })}>
                Edit
              </TaskGroupEdit>
            )}
            {!this.state.isEdit && (
              <TaskGroupDeleteItem onClick={() => this.handleTaskGroupDelete()}>
                Delete
              </TaskGroupDeleteItem>
            )}
          </TaskGroupControls>
        </TaskGroupHeading>
        <TaskInput>
          <Input
            fluid
            value={this.state.addText}
            onChange={e => this.setState({ addText: e.target.value })}
            action={{
              icon: "add",
              onClick: () => this.handleAddTask()
            }}
            placeholder="Add Task"
            onClick={() => console.log("clicked")}
          />
        </TaskInput>
        {this.renderTasks()}
      </TaskGroupItemWrapper>
    );
  }
}

export default TaskGroupItem;
