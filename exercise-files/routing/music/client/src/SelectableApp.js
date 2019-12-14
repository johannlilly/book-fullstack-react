// This file exports a component that makes it possible to switch between
// all completed versions of `App` in this project.
import React from "react";

import App from "./components/App";
import { SelectableComponents } from "fsr-helpers";
import App1 from "./components-complete/App-1";
import App2 from "./components-complete/App-2";
import App3 from "./components-complete/App-3";
import App4 from "./components-complete/App-4";
import AppComplete from "./components-complete/App-5";

const components = {
  "App-5": AppComplete,
  "App": App,
  "App-1": App1,
  "App-2": App2,
  "App-3": App3,
  "App-4": App4
};

const SelectableApp = () => <SelectableComponents components={components} />;

export default SelectableApp;
