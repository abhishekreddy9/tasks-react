import React from "react";
import styled from "styled-components";

const SideNavContainer = styled.section`
  transition: all 0.3s ease-out;
  height: 100vh;
  width: ${props => (props.open ? "300px" : "0px")};
  top: 48px;
  background-color: rgba(255, 255, 255, 1);
  border: 20px;
  border-color: #1a237e;
  opacity: ${props => (props.open ? "1" : "0")};
  position: absolute;
`;

class SideNav extends React.Component {
  render() {
    return <SideNavContainer open={this.props.show} />;
  }
}

export default SideNav;
