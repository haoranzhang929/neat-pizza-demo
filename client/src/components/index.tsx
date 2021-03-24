import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Container from "@material-ui/core/Container";

import ImageUploader from "./ImageUploader";
import ImagesViewer from "./ImagesViewer";
import Footer from "./Footer";

import { useStyles } from "./index.style";
import { Routes } from "../common/enum";

const routes = [
  { path: Routes.Home, component: ImageUploader, exact: true },
  { path: Routes.ViewUploads, component: ImagesViewer, exact: true }
];

function App() {
  const { container } = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <div className={container}>
        <header>Neat Pizza Header</header>
        <Router>
          <Switch>
            {routes.map((route, i) => (
              <Route key={`route-${i}`} {...route} />
            ))}
          </Switch>
        </Router>
        <Footer />
      </div>
    </Container>
  );
}

export default App;
