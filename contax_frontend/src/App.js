import { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { useDispatch, useSelector, connect } from "react-redux";

import "./App.scss";

import { Container } from "reactstrap";
import Homepage from "./pages/Homepage/Homepage";
import UserAuth from "./pages/UserAuth/UserAuth";
import Contacts from "./pages/Contacts/Contacts";

import PrivateRoute from "./components/PrivateRoute";

import { requestAccessToken, getUser } from "./state/AuthSlice";

function App() {
  let history = createBrowserHistory();
  const dispatch = useDispatch();
  let { isAuthenticated, authLoadingStatus, user } = useSelector(
    (state) => state.auth
  );
  let {contactLoadingStatus}=useSelector(state=>state.contacts)

  useEffect(() => {
    if (!isAuthenticated && !user) {
      (async () => {
        console.log("app loaded");
        await dispatch(requestAccessToken());
      })();
    }
  }, [isAuthenticated, user]);

  return (
    <Container fluid className="g-0">
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <PrivateRoute
            exact
            path="/app"
            history={history}
            isAuthenticated={isAuthenticated}
            loadingStatuses={[authLoadingStatus, contactLoadingStatus]}
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
          <Route
            exact
            path="/login"
            render={(props) => {
              return (
                <UserAuth
                  pageAction={"login"}
                  pageTitle={"Log in"}
                  history={history}
                />
              );
            }}
          />
          <Route
            exact
            path="/signup"
            render={(props) => {
              return (
                <UserAuth
                  pageAction={"signup"}
                  pageTitle={"Sign up"}
                  history={history}
                />
              );
            }}
          />
        </Switch>
      </Router>
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
