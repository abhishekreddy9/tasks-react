import React from "react";
import styled from "styled-components";
import { Input } from "semantic-ui-react";

const TaskItemWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  border-top: 3px solid #3d3d3d;
  border-radius: 3px;
  background-color: #efefef;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TaskContent = styled.div`
  padding: 5px;
  align-items: center;
  justify-content: center;
`;
const TaskControls = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TaskSave = styled.div`
  padding: 5px;
`;
const TaskEdit = styled.div`
  padding: 5px;
`;
const TaskDeleteItem = styled.div`
  padding: 5px;
`;

class TaskItem extends React.Component {
  state = {
    isEdit: false,
    editText: this.props.content
  };

  handleDelete() {
    fetch(`/api/task/${this.props.id}`, {
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

  handleEditSave() {
    fetch(`/api/task/${this.props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${window.localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        tasks: this.props.taskgroupid,
        content: this.state.editText
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

  render() {
    console.log("Tets");
    return (
      <TaskItemWrapper>
        {!this.state.isEdit && <TaskContent>{this.props.content}</TaskContent>}
        {this.state.isEdit && (
          <Input
            style={{ flex: 1 }}
            fluid
            value={this.state.editText}
            onChange={e => this.setState({ editText: e.target.value })}
            action={{
              icon: "save",
              onClick: () => this.handleEditSave()
            }}
            placeholder="Save"
          />
        )}
        <TaskControls>
          {!this.state.isEdit && (
            <TaskEdit onClick={() => this.setState({ isEdit: true })}>
              Edit
            </TaskEdit>
          )}
          {!this.state.isEdit && (
            <TaskDeleteItem onClick={() => this.handleDelete()}>
              Delete
            </TaskDeleteItem>
          )}
        </TaskControls>
      </TaskItemWrapper>
    );
  }
}

export default TaskItem;
