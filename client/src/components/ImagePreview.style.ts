import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ spacing }) => ({
  gridList: {
    width: 400,
    height: 400,
    marginBottom: spacing(2)
  },
  gridListSmall: {
    width: 350,
    height: 350,
    marginBottom: spacing(2)
  },
  gridItem: {
    borderRadius: "25px"
  }
}));
