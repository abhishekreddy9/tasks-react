import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import TaskGroupItem from "../components/TaskGroupItem";
import { Input } from "semantic-ui-react";
import { Button } from "semantic-ui-react";

const Container = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const TaskGroupList = styled.div`
  background-color: "#fff";
  min-height: calc(100vh - 60px);
  display: inline-flex;
`;
const NewTaskGroupItem = styled.div`
  padding: 15px;
  width: 400px;
`;
class Home extends React.Component {
  state = {
    loading: false,
    taskgroups: [],
    error: false,
    newTaskGroupTitle: ""
  };

  componentDidMount() {
    fetch("/api/taskgroup", {
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
          taskgroups: res
        });
      })
      .catch(error => {
        this.setState({
          error: true
        });
      });
  }

  handleAddTaskGroup() {
    fetch(`/api/taskgroup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${window.localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        title: this.state.newTaskGroupTitle
      })
    })
      .then(res => res.json())
      .then(res => {
        this.setState(state => ({
          taskgroups: [...state.taskgroups, res],
          newTaskGroupTitle: ""
        }));
      })
      .catch(error => {
        this.setState({
          error: true
        });
      });
  }

  handleTaskGroupDelete(task_group_id) {
    this.setState(state => ({
      taskgroups: state.taskgroups.filter(item => item.id !== task_group_id)
    }));
  }

  handleTaskGroupEdit(task_group_id, title) {
    this.setState(state => ({
      taskgroups: state.taskgroups.map(item =>
        item.id == task_group_id ? { ...item, title: title } : item
      )
    }));
  }

  handleLogout() {
    const { history } = this.props;
    window.localStorage.removeItem("token");
    history.replace("/login");
  }

  render() {
    if (this.state.error) return <p>Something Went Wrong!</p>;
    if (this.state.loading) return <p>Loading!!</p>;
    return (
      <>
        <Button onClick={() => this.handleLogout()} style={{ margin: 10 }}>
          Logout
        </Button>
        <Container>
          <TaskGroupList>
            {this.state.taskgroups.map(item => (
              <TaskGroupItem
                key={`task-group-${item.id}`}
                title={item.title}
                id={item.id}
                onDelete={task_group_id =>
                  this.handleTaskGroupDelete(task_group_id)
                }
                onUpdate={(task_group_id, content) =>
                  this.handleTaskGroupEdit(task_group_id, content)
                }
              />
            ))}
            <NewTaskGroupItem>
              <Input
                fluid
                value={this.state.newTaskGroupTitle}
                onChange={e =>
                  this.setState({ newTaskGroupTitle: e.target.value })
                }
                action={{
                  icon: "add",
                  onClick: () => this.handleAddTaskGroup()
                }}
                placeholder="Add New Task List"
                onClick={() => console.log("clicked")}
              />
            </NewTaskGroupItem>
          </TaskGroupList>
        </Container>
      </>
    );
  }
}

export default withRouter(Home);
