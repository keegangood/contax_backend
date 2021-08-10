import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import { useDispatch, useSelector, connect } from "react-redux";

import "./App.scss";

import { Container } from "reactstrap";
import Homepage from "./pages/Homepage/Homepage";
import UserAuth from "./pages/UserAuth/UserAuth";
import Contacts from "./pages/Contacts/Contacts";

import PrivateRoute from "./components/PrivateRoute";

import { requestAccessToken } from "./state/AuthSlice";

function App({history}) {
  const dispatch = useDispatch();

  let { isAuthenticated, authLoadingStatus, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!isAuthenticated && !user) {
      (async () => {
        console.log("app loaded");
        await dispatch(requestAccessToken());
      })();
    }
  }, [isAuthenticated, user, dispatch]);

  return (
    <Container fluid className="g-0">
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route
            exact
            path="/login"
            component={(props) => (
              <UserAuth pageAction={"login"} pageTitle={"Log in"} {...props}/>
            )}
          />
          <Route
            exact
            path="/signup"
            component={(props) => (
              <UserAuth pageAction={"signup"} pageTitle={"Sign up"} {...props}/>
            )}
            
          />
          <PrivateRoute
            exact
            path="/app"
            history={history}
            isAuthenticated={isAuthenticated}
            authLoadingStatus={authLoadingStatus}
            component={Contacts}
          />
          <PrivateRoute
            exact
            path="/app/:formAction?/:contactId?"
            history={history}
            isAuthenticated={isAuthenticated}
            authLoadingStatus={authLoadingStatus}
            component={Contacts}
          />
        </Switch>
    </Container>
  );
}

const mapPropsToState = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    authLoadingStatus: state.auth.authLoadingStatus,
  };
};

export default connect(mapPropsToState)(App);
