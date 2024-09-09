import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Forgot_password from "../Signin/Forgot_pass";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%",
    sm: "80%",
    md: "60%",
    lg: "50%",
  },
  height: {
    xs: "50%",
    sm: "60%",
  },
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "18px",
  boxShadow: 24,
  p: 4,
};

const ForgotpassModal = (props) => {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Forgot_password
          onClose={props.handleClose}
          setcurrentPage={props.setcurrentPage}
          emailresetfunction={props.emailresetfunction}
          otpresetfunction={props.otpresetfunction}
          resetemail={props.resetemail}
          resetotp={props.resetotp}
        />
      </Box>
    </Modal>
  );
};

export default ForgotpassModal;
