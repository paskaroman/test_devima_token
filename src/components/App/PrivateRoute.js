import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, token, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to={"/login"} />
      }
    />
  );
};

PrivateRoute.propTypes = {
  token: PropTypes.string,
};

export default PrivateRoute;
