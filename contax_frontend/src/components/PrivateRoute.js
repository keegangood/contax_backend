import { React } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  authLoadingStatus,
  ...rest
}) => {
  return (
      <Route
        // pass the rest of the props
        {...rest}
        render={(props) =>
          // if not authenticated when loaded, redirect to login page
          !isAuthenticated && authLoadingStatus === "IDLE" ? (
            <Redirect to={{
              pathname:'/login',
              
            }}/>
            ) : (
            <Component {...props} />
          )
        }
      />
  );
};

export default PrivateRoute;
