import { makeStyles } from "@material-ui/core/styles";
import BackGround from "../assets/bg.webp";

export const useStyles = makeStyles(({ spacing }) => ({
  root: {
    backgroundImage: `url(${BackGround})`,
    backgroundPosition: "center top",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh"
  },
  header: {
    marginTop: spacing(2),
    marginBottom: spacing(2)
  },
  logo: {
    width: "400px"
  },
  logoSmall: {
    width: "100%"
  }
}));
