import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import "./App.scss";

function App() {
  const history = createBrowserHistory();

  return <div className="App container-fluid">
    <Router history={history}>
      <Route exact path="/" component={()=>("Hello")} />
    </Router>
  </div>;
}

export default App;
