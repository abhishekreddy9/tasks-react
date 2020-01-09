import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { Button } from "semantic-ui-react";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
  background-color: #fafafa;
`;

const LoginBox = styled.div`
  width: 400px;
  height: 400px;
  border: 1px solid #efefef;
  border-radius: 3px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", error: "" };
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.username == "" || this.state.password == "") {
      alert("Every Field is Mandatory!");
      return;
    }
    this.makeLoginAPI();
  };

  makeLoginAPI() {
    const { history } = this.props;

    fetch("/auth", {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.token) {
          window.localStorage.setItem("token", res.token);
          history.push("/");
        } else {
          alert("Invalid Credentials");
        }
      });
  }

  handlePassChange = event => {
    this.setState({ ...this.state, password: event.target.value });
  };

  handleUsernameChange = event => {
    this.setState({ ...this.state, username: event.target.value });
  };
  //   password: event.target.password;

  redirectToLogin() {
    const { history } = this.props;
    history.push("/signup");
  }

  render() {
    return (
      <Container>
        <LoginBox>
          <form onSubmit={this.handleSubmit}>
            <label>Email:</label>
            <input
              type="text"
              name="username"
              className="inputs"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
            <label>Password:</label>
            <input
              type="password"
              name="password"
              className="inputs"
              value={this.state.password}
              onChange={this.handlePassChange}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "15px"
              }}
            >
              <Button fluid color="green" type="submit">
                {" "}
                Login
              </Button>
            </div>
            <br />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Button type="button" onClick={() => this.redirectToLogin()}>
                Do not have Account? Sign Up
              </Button>
            </div>
          </form>
        </LoginBox>
      </Container>
    );
  }
}

export default withRouter(Login);
