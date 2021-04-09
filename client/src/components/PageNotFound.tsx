import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(({ spacing }) => ({
  page404: { display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" },
  button: { width: "100px", alignSelf: "center", margin: spacing(2) }
}));

const PageNotFound = () => {
  const { page404, button } = useStyles();
  const history = useHistory();
  return (
    <div className={page404}>
      <Typography variant="h1" align="center">
        404
      </Typography>
      <Typography variant="h3" align="center">
        O-o-oh! Something broke.
      </Typography>
      <Button variant="outlined" size="small" onClick={() => history.goBack()} className={button}>
        Go Back
      </Button>
    </div>
  );
};

export default PageNotFound;
