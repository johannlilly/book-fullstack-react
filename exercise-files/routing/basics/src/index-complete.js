import React from "react";
import ReactDOM from "react-dom";

// SelectableApp wraps all App components under `complete/` and makes
// it easy to switch between them
import SelectableApp from "./SelectableApp";

ReactDOM.render(
  <SelectableApp />,
  document.getElementById("root")
);
