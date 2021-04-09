import React from "react";

import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ spacing }) => ({
  footer: {
    marginTop: "auto",
    padding: spacing(1)
  }
}));

const Footer = () => {
  const { footer } = useStyles();
  return (
    <Typography variant="body2" color="textSecondary" align="center" className={footer}>
      {"Copyright © "}
      <Link color="inherit" href="https://www.neatpizza.com/" target="_blank">
        Neat Pizza
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Footer;
