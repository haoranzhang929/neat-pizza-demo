import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ spacing, palette }) => ({
  dropContainer: {
    marginBottom: spacing(2),
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: palette.grey[400],
    borderStyle: "dashed",
    backgroundColor: palette.common.white,
    color: palette.text.secondary,
    outline: "none",
    transition: "border .24s ease-in-out"
  },
  activeStyle: {
    borderColor: palette.action.active
  },
  uploadSuccess: {
    backgroundColor: palette.grey[100],
    borderColor: palette.action.disabled,
    color: palette.text.disabled
  }
}));
