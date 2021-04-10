import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ImageUploader from "./ImageUploader";
import ImagesViewer from "./ImagesViewer";
import PageNotFound from "./PageNotFound";

import { Routes } from "../common/enum";

const routes = [
  { path: `/${Routes.Store}/:store/${Routes.OrderID}/:orderId`, component: ImageUploader },
  { path: Routes.ViewUploads, component: ImagesViewer, exact: true },
  { path: Routes.NoMatch, component: PageNotFound }
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
