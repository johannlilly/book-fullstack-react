import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";

// SelectableApp wraps all App components under `complete/` and makes
// it easy to switch between them
import SelectableApp from "./SelectableApp";

ReactDOM.render(
  <Router>
    <SelectableApp />
  </Router>,
  document.getElementById("root")
);
