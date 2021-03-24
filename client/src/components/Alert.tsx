import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { Severity, Message } from "../common/enum";

interface ALertProps {
  open: boolean;
  handleClose: () => void;
  severity: Severity;
  message: Message;
}

const Alert = ({ open, handleClose, severity, message }: ALertProps) => (
  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={severity}>
      {message}
    </MuiAlert>
  </Snackbar>
);

export default Alert;
