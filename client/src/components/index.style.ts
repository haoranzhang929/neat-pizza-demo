import { makeStyles } from "@material-ui/core/styles";
import bgCustomer from "../assets/bg-customer.webp";
import bgStaff from "../assets/bg-staff.webp";

export const useStyles = makeStyles(({ spacing }) => ({
  rootCustomer: {
    backgroundImage: `url(${bgCustomer})`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
  rootStaff: {
    backgroundImage: `url(${bgStaff})`,
    backgroundPosition: "center center",
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
