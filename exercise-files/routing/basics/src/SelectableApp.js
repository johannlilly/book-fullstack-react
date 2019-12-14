// Readers: Feel free to ignore.
// Adds a menu for switching between components. Used for testing.
import React from "react";

import App from "./App";
import { SelectableComponents } from "fsr-helpers";
import App1 from "./complete/App-1";
import App2 from "./complete/App-2";
import App3 from "./complete/App-3";
import App4 from "./complete/App-4";
import App5 from "./complete/App-5";
import App6 from "./complete/App-6";
import App7 from "./complete/App-7";

const components = {
  "App-7": App7,
  "App": App,
  "App-1": App1,
  "App-2": App2,
  "App-3": App3,
  "App-4": App4,
  "App-5": App5,
  "App-6": App6
};

const SelectableApp = () => <SelectableComponents components={components} />;

export default SelectableApp;
