import React from "react";
import styled from "styled-components";
import { Button } from "semantic-ui-react";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
  background-color: #fafafa;
`;

const SignUpBox = styled.div`
  width: 400px;
  height: 400px;
  border: 1px solid #efefef;
  border-radius: 3px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

class SignUp extends React.Component {
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
    this.makeSignUpAPI();
  };

  makeSignUpAPI() {
    fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        email: this.state.username,
        password: this.state.password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        console.log(res.status); // Will show you the status
        if (res.status == 400) {
          throw new Error(JSON.stringify(res.json()));
        }
        return res.json();
      })
      .then(res => {
        this.redirectToLogin();
      })
      .catch(err => {
        alert("cannot signup", JSON.stringify(err));
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
    history.push("/login");
  }

  render() {
    return (
      <Container>
        <SignUpBox>
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
              <Button fluid color="orange" type="submit">
                {" "}
                Sign Up
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
                Already have account ? Login
              </Button>
            </div>
          </form>
        </SignUpBox>
      </Container>
    );
  }
}

export default SignUp;
