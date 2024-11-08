import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React from "react";
import New_pass from "../Signin/New_pass";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%", // 90% width on small screens
    sm: "70%", // 70% width on medium screens
    md: "50%", // 50% width on larger screens
  },
  height: {
    xs: "80%", // 80% height on small screens
    sm: "70%", // 70% height on medium screens
    md: "70%", // 70% height on larger screens
  },
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "18px",
  boxShadow: 24,
  p: {
    xs: 2, // 2 units padding on small screens
    sm: 3, // 3 units padding on medium screens
    md: 4, // 4 units padding on larger screens
  },
};

const NewpassModal = (props) => {
  // props.email
  // props.otp
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <New_pass
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

export default NewpassModal;
/**            emailresetfunction={emailresetfunction}
            otpresetfunction={otpresetfunction}
            resetemail={resetemail}
            resetotp={resetotp} */