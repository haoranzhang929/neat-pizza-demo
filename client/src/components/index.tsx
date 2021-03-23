import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ImageUploader from "./ImageUploader";
import ImagesViewer from "./ImagesViewer";

import { Routes } from "../common/enum";

const routes = [
  { path: Routes.Home, component: ImageUploader, exact: true },
  { path: Routes.ViewUploads, component: ImagesViewer, exact: true }
];

function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route, i) => (
          <Route key={`route-${i}`} {...route} />
        ))}
      </Switch>
    </Router>
  );
}

export default App;
