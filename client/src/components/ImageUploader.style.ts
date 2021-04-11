import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

export const useStyles = makeStyles(({ spacing }) => ({
  mainApp: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    background: "rgba(255,255,255, 0.9)",
    borderRadius: "25px",
    paddingTop: spacing(2)
  },
  userInput: {
    marginBottom: spacing(2)
  },
  note: {
    width: "300px",
    marginBottom: spacing(2),
    color: "rgba(0, 0, 0, 0.6)"
  },
  note2: {
    width: "90%",
    minWidth: "300px",
    margin: spacing("auto", 2, 2, 2),
    color: "rgba(0, 0, 0, 0.65)"
  },
  wrapper: {
    marginBottom: spacing(2),
    position: "relative"
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  retryButton: {
    marginLeft: spacing(1)
  }
}));
