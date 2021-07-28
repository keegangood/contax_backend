import { React } from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  authStatus,
  ...rest
}) => {
  return (
    <Route
      // pass the rest of the props
      {...rest}
      render={(props) =>
        // if not authenticated when loaded, redirect to login page
        !isAuthenticated && authStatus === "IDLE" ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;