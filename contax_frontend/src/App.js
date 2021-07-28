import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import "./App.scss";

import Homepage from "./pages/Homepage/Homepage";
import {Container} from 'reactstrap';

function App() {
  const history = createBrowserHistory();

  return (
    <>
      <Container fluid className="g-0">
        <Router history={history}>
          <Route exact path="/" component={Homepage} />
        </Router>
      </Container>
    </>
  );
}

export default App;
