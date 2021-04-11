import React from "react";
import { useHistory } from "react-router-dom";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Footer from "./Footer";

import { useStyles as useStyleRoot } from "./index.style";

import Logo from "../assets/Logo.png";

const useStyles = makeStyles(({ spacing }) => ({
  page404: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    background: "rgba(255,255,255, 0.8)",
    borderRadius: "25px",
    margin: spacing(2),
    color: "rgba(0, 0, 0, 0.7)"
  },
  button: { width: "100px", alignSelf: "center", margin: spacing(2), color: "rgba(0, 0, 0, 0.7)" }
}));

const PageNotFound = () => {
  const { page404, button } = useStyles();
  const { root, container, header, logo, logoSmall } = useStyleRoot();

  const history = useHistory();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className={root}>
      <Container component="main" maxWidth="sm">
        <div className={container}>
          <header className={header}>
            <img className={matches ? logoSmall : logo} src={Logo} alt="Neat Pizza Logo" />
          </header>
          <div className={page404}>
            <Typography variant="h1" align="center">
              404
            </Typography>
            <Typography variant="h4" align="center" style={{ padding: "20px" }}>
              O-o-oh! Something broke.
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => history.goBack()}
              className={button}
            >
              Go Back
            </Button>
          </div>
          <Footer />
        </div>
      </Container>
    </div>
  );
};

export default PageNotFound;
