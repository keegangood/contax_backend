import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";

import "./App.scss";

import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./state";
import thunk from "redux-thunk";

import { Container } from "reactstrap";
import Homepage from "./pages/Homepage/Homepage";
import UserAuth from "./pages/UserAuth/UserAuth";
import Contacts from "./pages/Contacts/Contacts";

let store = configureStore({ reducer: rootReducer }, applyMiddleware(thunk));

function App() {
  let history = createBrowserHistory();

  return (
    <Provider store={store}>
      <Container fluid className="g-0">
        <Router history={history}>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/app" component={Contacts} />
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
        </Router>
      </Container>
    </Provider>
  );
}

export default App;
