import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getUsersRequest } from "../../actions/usersActions";
import Loader from "../Loader";

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsersRequest: () => dispatch(getUsersRequest()),
  };
};

class UsersList extends Component {
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.props.getUsersRequest();
    }
  }

  renderUsers = () => {
    const { users } = this.props.users;

    return users.map(({ id, name, email }) => (
      <li key={id}>
        <span className="col">Name: {name}</span>
        <span className="col">Email: {email}</span>
      </li>
    ));
  };

  refreshList = () => {
    this.props.getUsersRequest();
  };

  render() {
    const { isLoading } = this.props.users;

    if (isLoading) {
      return <Loader />;
    }

    return (
      <div className="wrapper">
        <h1>Users list</h1>
        <button onClick={this.refreshList}>Refresh</button>
        <ul className="user-list">{this.renderUsers()}</ul>
      </div>
    );
  }
}

UsersList.propTypes = {
  users: PropTypes.object,
  getUsersRequest: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
