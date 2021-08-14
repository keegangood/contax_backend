import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import { useDispatch, useSelector, connect } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { logout } from "./state/AuthSlice";

import "./App.scss";

import { Container } from "reactstrap";

import NavDesktop from "./components/NavDesktop";
import NavMobile from "./components/NavMobile";
import Hamburger from "./components/Hamburger";

import Homepage from "./pages/Homepage/Homepage";
import UserAuth from "./pages/UserAuth/UserAuth";
import Contacts from "./pages/Contacts/Contacts";
import ContactDetail from "./pages/Contacts/ContactDetail";

import PrivateRoute from "./components/PrivateRoute";

import { requestAccessToken } from "./state/AuthSlice";

function App({ history }) {
  const dispatch = useDispatch();

  let { isAuthenticated, authLoadingStatus, user } = useSelector(
    (state) => state.auth
  );

  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && !user) {
      (async () => {
        await dispatch(requestAccessToken());
      })();
    }
  }, [isAuthenticated, user]);

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <Container fluid className="app g-0">
      <span className="d-none d-md-block">
        <NavDesktop
          user={user}
          onLogout={onLogout}
          isAuthenticated={isAuthenticated}
        />
      </span>
      <span className="d-block d-md-none">
        <Hamburger
          navOpen={navOpen}
          setNavOpen={setNavOpen}
          textColor={"secondary"}
        />
        <NavMobile
          user={user}
          isAuthenticated={isAuthenticated}
          onLogout={onLogout}
          navOpen={navOpen}
          setNavOpen={setNavOpen}
        />
      </span>
      <Switch>
        <Route
          exact
          path="/"
          component={(props) => (
            <Homepage
              isAuthenticated={isAuthenticated}
              authLoadingStatus={authLoadingStatus}
            />
          )}
        />
        <Route
          exact
          path="/login"
          component={(props) => (
            <UserAuth
              pageAction={"login"}
              pageTitle={"Log in"}
              isAuthenticated={isAuthenticated}
              authLoadingStatus={authLoadingStatus}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/signup"
          component={(props) => (
            <UserAuth
              pageAction={"signup"}
              pageTitle={"Sign up"}
              isAuthenticated={isAuthenticated}
              authLoadingStatus={authLoadingStatus}
              {...props}
            />
          )}
        />
        <PrivateRoute
          exact
          path="/app"
          history={history}
          user={user}
          isAuthenticated={isAuthenticated}
          authLoadingStatus={authLoadingStatus}
          component={Contacts}
        />
        <PrivateRoute
          exact
          path="/app/detail/:contactId"
          history={history}
          user={user}
          isAuthenticated={isAuthenticated}
          authLoadingStatus={authLoadingStatus}
          component={ContactDetail}
        />
        <PrivateRoute
          exact
          path="/app/:formAction?/:contactId?"
          history={history}
          user={user}
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
