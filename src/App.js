import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Home from "./pages/home/Home";
import Brador from "./pages/brador/Brador";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/b/:index" component={Brador} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
