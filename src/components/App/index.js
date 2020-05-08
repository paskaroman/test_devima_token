import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";

//components
import UsersList from "../UsersList";
import Login from "../Login";
import PrivateRoute from "./PrivateRoute";
import Navigation from "../Navigation";

// Styles
import "./styles.scss";

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

class App extends Component {
  render() {
    const token = localStorage.getItem("token");
    const { isAuth } = this.props;

    //TODO: restructure routes if quantity of routes will be bigger
    return (
      <Router>
        <Navigation />
        <Switch>
          <PrivateRoute
            path="/list"
            exact
            component={UsersList}
            token={token}
          />
          {token && isAuth ? (
            <Redirect exact from="/login" to="/list" />
          ) : (
            <Redirect exact from="/" to="/login" />
          )}
          <Route path="/login" exact component={Login} />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  isAuth: PropTypes.bool,
};

export default connect(mapStateToProps, null)(App);
