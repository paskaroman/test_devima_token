import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import { logoutUser } from "../../actions/authActions";

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
};

// Navigation component. TODO: change structure if routing will be changed
class Navigation extends Component {
  logouthandler = () => {
    this.props.logoutUser();
  };

  render() {
    const token = localStorage.getItem("token");
    const { isAuth } = this.props;

    return (
      <nav className="navigation">
        <ul>
          <li>
            {isAuth || token ? (
              <NavLink to="/login" onClick={this.logouthandler}>
                Logout
              </NavLink>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </li>
        </ul>
      </nav>
    );
  }
}

Navigation.propTypes = {
  isAuth: PropTypes.bool,
  logoutUser: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
