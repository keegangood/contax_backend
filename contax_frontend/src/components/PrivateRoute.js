import { React } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  authLoadingStatus,
  history,
  ...rest
}) => {
  return (
    <Route
      // pass the rest of the props
      {...rest}
      render={(props) =>
        // if not authenticated when loaded, redirect to login page
        !isAuthenticated && authLoadingStatus === "IDLE" ? (
          <Redirect
            to={{
              pathname: "/login",
              state: { referrer: props.history.location.pathname },
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
