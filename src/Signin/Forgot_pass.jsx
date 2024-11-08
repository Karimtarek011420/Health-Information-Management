import { useRef, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import { Link } from "react-router-dom";
import close from "../assets/close2.svg";
import "../Signup/Register.css";
import "./Login.css";
import PulseLoader from "react-spinners/PulseLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const otp_REGEX = /^\d{6}$/;


const Forgot_password = (props) => {
  const userRef = useRef();
  const errRef = useRef();
  const otpRef = useRef();
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [validotp, setValidotp] = useState(false);
  const [otpFocus, setotpFocus] = useState(false);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, otp]);
  useEffect(() => {
    setValidotp(otp_REGEX.test(otp));
  }, [otp]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/API/Auth/ForgetPassword", { email });
      console.log(JSON.stringify(response?.data));
      setSuccess(true);
      props.emailresetfunction(email); // Set reset email in the parent component
      setTimeout(() => otpRef.current?.focus(), 0);
    } catch (err) {
      setErrMsg(err?.response?.data?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  const handleOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const otpResponse = await axios.post("/API/Auth/ValidateOTP", { otp });
      console.log(otpResponse);
      props.otpresetfunction(otp); // Set reset OTP in the parent component
      props.setcurrentPage("newpass");
    } catch (err) {
      console.error("Error during OTP validation:", err);
      setErrMsg("OTP validation failed");
    } finally {
      setLoading(false);
    }
  };

console.log("email", props.resetemail);
console.log("otp", props.resetotp);

  return (
    <>
      {success ? (
        <section className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-12">
              <form onSubmit={handleOtp}>
                <h3 className="otp-header1 text-center fw-bold lh-base">
                  OTP Verification
                </h3>
                <h6 className="otp-header2 text-center fw-semibold lh-base">
                  {"Hi there"}
                </h6>
                <p className="otp-paragraph text-center fw-medium lh-base">
                  {
                    "Please type in the Verification code that was sent to your email"
                  }
                </p>
                <div>
                  <input
                    type="number"
                    className="form-control otp-input text-center"
                    id="otpInput"
                    placeholder="XXXXXX"
                    aria-label="otp"
                    name="otp"
                    value={otp}
                    ref={otpRef}
                    maxLength="6"
                    onChange={(e) => setOtp(e.target.value)}
                    onFocus={() => setotpFocus(true)}
                    onBlur={() => setotpFocus(false)}
                  />
                <p
                    id="otpInput"
                    className={
                      otpFocus && otp && !validotp
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must be a only 6 numbers.
                  </p>
                </div>
                <button
                  className="btn submit mt-2 mb-2 btn--border"
                  type="submit"
                >
                  {loading ? (
                    <PulseLoader className="mt-1" size="16" color="white" />
                  ) : (
                    "Submit"
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      ) : (
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
                    <p
                      ref={errRef}
                      className={errMsg ? "errmsg" : "offscreen"}
                      aria-live="assertive"
                    >
                      {errMsg}
                    </p>
                    <div className="row">
                      <div className="col-12 d-flex justify-content-between align-items-center">
                        <h1 className="title mx-auto">Enter your Account</h1>
                      </div>
                    </div>
                    <form onSubmit={handleSubmit} className="ms-4 me-4">
                      <label className="label--log" htmlFor="email">
                        Email:
                      </label>
                      <input
                        placeholder="Type your email"
                        className="form-control mt-2"
                        type="email" // Ensure it's an email input
                        id="email"
                        ref={userRef}
                        autoComplete="off"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                      <button className="btn submit mt-4">
                        {loading ? (
                          <PulseLoader
                            className="mt-1"
                            size="16"
                            color="white"
                          />
                        ) : (
                          "Submit"
                        )}
                      </button>
                      <p className="line mt-2">
                        Don't have an Account?&nbsp;
                        <span className="line">
                          <Link
                            onClick={() => props.setcurrentPage("register")}
                          >
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
      )}
    </>
  );
};

export default Forgot_password;
