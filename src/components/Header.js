import React from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  background-color: #1a237e;
  justify-content: flex-end;
  height: 48px;
`;

const MainText = styled.div`
  color: white;
  font-size: 23px;
`;

const MenuItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const LeftItems = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  align-items: center;
`;

const RightItems = styled.div``;

const SignOut = styled.li`
  padding: 10px;
  color: rgba(255, 255, 255, 0.9);
`;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: window.localStorage.getItem("token") ? true : false
    };
  }

  handleSignOut() {
    window.localStorage.removeItem("token");
    this.setState({
      isAuthenticated: false
    });
  }

  handleSignIn() {}

  render() {
    return (
      <Container>
        <MenuItem>
          <LeftItems>
            <Icon className="icons" name="edit outline" size="big" />
            <MainText>TaskBook</MainText>
          </LeftItems>
          <RightItems>
            {!this.state.isAuthenticated && (
              <Link to="/login">
                <SignOut>Login</SignOut>
              </Link>
            )}
            {this.state.isAuthenticated && (
              <SignOut onClick={() => this.handleSignOut()}>Sign Out</SignOut>
            )}
          </RightItems>
        </MenuItem>
      </Container>
    );
  }
}

export default Header;
