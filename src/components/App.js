import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../components/Header";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import PrivateRoute from "../components/PrivateRoute";

class App extends React.Component {
  render() {
    return (
      <Router>
        {/* <Header /> */}
        <div>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <PrivateRoute path="/" exact component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
