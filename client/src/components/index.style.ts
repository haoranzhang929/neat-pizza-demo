import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ spacing }) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh"
  },
  header: {
    marginTop: spacing(2),
    marginBottom: spacing(2)
  }
}));
