import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { loginUser } from "../../actions/authActions";

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => dispatch(loginUser(user)),
  };
};

class Login extends Component {
  state = {
    username: null,
    password: null,
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.loginUser(this.state);
  };

  render() {
    const { isAuthErr, isAuth } = this.props.auth;

    if (isAuth) {
      return <Redirect to="/" />;
    }

    return (
      <div className="wrapper">
        <h1>Login</h1>
        <form className="form">
          <label htmlFor="username">
            Your username
            <input id="username" name="username" onChange={this.handleChange} />
          </label>
          <label htmlFor="password">
            Your password
            <input id="password" name="password" onChange={this.handleChange} />
          </label>
          {isAuthErr ? (
            <span className="error">
              User not found: Invalid username or password
            </span>
          ) : null}
          <button onClick={this.onSubmit}>Login</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object,
  loginUser: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
