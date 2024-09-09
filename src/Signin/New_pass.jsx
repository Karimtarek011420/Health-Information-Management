import { useState, useContext ,useEffect} from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import { Link } from "react-router-dom";
import close from "../assets/close2.svg";
import AuthContext from "../Context/AuthProvider";
import "../Signup/Register.css";
import "./Login.css";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PulseLoader from "react-spinners/PulseLoader";
import toast from "react-hot-toast";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const New_pass = (props) => {
  const { setAuth } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [validpassword, setValidpassword] = useState(false);
  const [passwordFocus, setpasswordFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showconfrPassword, setshowconfrPassword] = useState(false);
  const [password_confirmation, setConfirmPassword] = useState("");
  const [validconfirmation, setValidconfirmation] = useState(false);
  const [confirmationFocus, setconfirmationFocus] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== password_confirmation) {
      toast.error("Passwords do not match", {
        position: "top-center",
        duration: 2000,
        className: " text-white rounded-5",
        style: { backgroundColor: "#3AB2A6" },
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/API/Auth/ResetPassword", {
        email: props.resetemail,
        password: password,
        password_confirmation: password_confirmation,
        otp: props.resetotp,
      });
      console.log(JSON.stringify(response?.data));
      toast.success("Your password change was successful", {
        position: "top-center",
        duration: 4000,
        className: "text-white rounded-5",
        style: { backgroundColor: "#3AB2A6" },
      });
      props.setcurrentPage("login");
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || "Failed to reset password";
      toast.error(errorMessage, {
        position: "top-center",
        duration: 2000,
        className: "text-white rounded-5",
        style: { backgroundColor: "#3AB2A6" },
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleconPasswordVisibility = () => setshowconfrPassword(!showconfrPassword);

  useEffect(() => {
    setValidpassword(PWD_REGEX.test(password));
    setValidconfirmation(password === password_confirmation);
  }, [password, password_confirmation]);

  console.log("email new pass", props.resetemail);
  console.log("otp", props.resetotp);

  return (
    <div>
      <section className="container-fluid reg-bg-con">
        <div className="row vh-100">
          <div className="col-md-12 col-sm-12">
            <div className="form-container-log">
              <div className="inner">
                <div className="close-btn-container">
                  <Link to="/" className="no-underline-close">
                    <img src={close} onClick={props.onClose} alt="Close" />
                  </Link>
                </div>
                <div className="row">
                  <div className="col-12 d-flex justify-content-between align-items-center">
                    <h1 className="title mx-auto text-center fw-semibold">
                      New Password
                    </h1>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="ms-4 me-4">
                  <label className="label--log" htmlFor="password">
                    New Password:
                    <FontAwesomeIcon
                        icon={faCheck}
                        className={validpassword ? "valid" : "hide"}
                      />
                      <FontAwesomeIcon
                        icon={faTimes}
                        className={validpassword || !password ? "hide" : "invalid"}
                      />
                  </label>
                  <div className="d-flex">
                    <input
                      placeholder="********"
                      className="form-control mt-2"
                      type={showPassword  ? "text" : "password"}
                      id="password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      aria-invalid={validpassword ? "false" : "true"}
                        aria-describedby="passwordnote"
                        onFocus={() => setpasswordFocus(true)}
                        onBlur={() => setpasswordFocus(false)}
                    />
                    <button
                        className=" mt-2 ms-1 p-1 py-2 border border-0"
                        type="button"
                        onClick={togglePasswordVisibility}
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                          className=""
                        />
                      </button>
                  </div>
                  <p
                      id="passwordnote"
                      className={passwordFocus && !validpassword ? "instructions" : "offscreen"}
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character.
                    </p>
                  <label className="label--log" htmlFor="confirm_password">
                    Confirm Password:
                    <FontAwesomeIcon
                        icon={faCheck}
                        className={validconfirmation && password_confirmation ? "valid" : "hide"}
                      />
                      <FontAwesomeIcon
                        icon={faTimes}
                        className={validconfirmation || !password_confirmation ? "hide" : "invalid"}
                      />
                  </label>
                  <div className="d-flex">
                    <input
                      placeholder="********"
                      className="form-control mt-2"
                      type={showconfrPassword  ? "text" : "password"}
                      id="confirm_password"
                      required
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={password_confirmation}
                      aria-invalid={validconfirmation ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setconfirmationFocus(true)}
                        onBlur={() => setconfirmationFocus(false)}
                    />
                   <button
                        className=" mt-2 p-1 ms-1 py-2 border border-0"
                        type="button"
                        onClick={toggleconPasswordVisibility}
                      >
                        <FontAwesomeIcon
                          icon={showconfrPassword ? faEyeSlash : faEye}
                          className=""
                        />
                      </button>
                  </div>
                  <p
                      id="confirmnote"
                      className={confirmationFocus && !validconfirmation ? "instructions" : "offscreen"}
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Must match the first password input field.
                    </p>
                  <button className="btn submit mt-4" type="submit">
                    {loading ? (
                      <PulseLoader className="mt-1" size="16" color="white" />
                    ) : (
                      "Submit"
                    )}
                  </button>
                  <p className="line mt-2">
                    Don't have an Account?&nbsp;
                    <span className="line">
                      <Link onClick={() => props.setcurrentPage("register")}>
                        Sign Up
                      </Link>
                    </span>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default New_pass;
