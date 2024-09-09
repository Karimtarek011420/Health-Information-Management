import React, { useEffect, useRef, useState } from "react";
import "./My_Account_body.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button/Button";
import Card from "./card/card";
import { Link } from "react-router-dom";
import questionmark from "../../assets/questionmark.svg";
import QRCode from "react-qr-code";
import LogoutModal from "../LogoutModal";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/UserSlice";
import { useDispatch } from "react-redux";
import { logout } from "../../features/UserSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import My_Account_Delete_Modal from "../My_Account_Delete_Modal";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^([A-z]{2,23})?$/;
const PWD_REGEX = /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24})?$/;
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))?$|^$/;
const PHONE_REGEX =
/^\d{11,15}$|^$/;

function My_Account_body() {
  const [values, setValues] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phone: "",
  });
  const [values2, setValues2] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phone: "",
  });
  const [initialValue, setinitialValue] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phone: "",
  });
  const [validvalues, setvalidvalues] = useState({
    validfname: false,
    validlname: false,
    validemail: false,
    validpassword: false,
    validphone: false,
  });
  const [focusvalues, setfocusvalues] = useState({
    focusfname: false,
    focuslname: false,
    focusemail: false,
    focuspassword: false,
    focusphone: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [btn1, setBtn1] = useState(true);
  const [btn2, setBtn2] = useState(false);
  const [btn3, setBtn3] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const user = useSelector(selectUser);
  const token = user?.token;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  async function getAccount() {
    try {
      const { data } = await axios.get("/API/Auth/UserInfo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data.fname);
      setValues({
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        password: data.password,
        phone: data.phone,
      });
      setCode(data.code);
    } catch (error) {
      console.error("Error fetching account information:", error);
    }
  }

  useEffect(() => {
    getAccount();
  }, [token, values2]);

  useEffect(() => {
    getAccount();
    setIsButtonDisabled(
      JSON.stringify(values2) === JSON.stringify(initialValue)
    );
  }, [values2]);

  useEffect(() => {
    setvalidvalues((prevState) => ({
      ...prevState,
      validfname: USER_REGEX.test(values2.fname),
    }));
  }, [values2.fname]);

  useEffect(() => {
    setvalidvalues((prevState) => ({
      ...prevState,
      validlname: USER_REGEX.test(values2.lname),
    }));
  }, [values2.lname]);

  useEffect(() => {
    setvalidvalues((prevState) => ({
      ...prevState,
      validemail: EMAIL_REGEX.test(values2.email),
    }));
  }, [values2.email]);

  useEffect(() => {
    setvalidvalues((prevState) => ({
      ...prevState,
      validpassword: PWD_REGEX.test(values2.password),
    }));
  }, [values2.password]);

  useEffect(() => {
    setvalidvalues((prevState) => ({
      ...prevState,
      validphone: PHONE_REGEX.test(values2.phone),
    }));
  }, [values2.phone]);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues2((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  function mergeObjectsWithEmptyValues(obj1, obj2) {
    Object.keys(obj1).forEach((key) => {
      if (obj1[key] === null || obj1[key] === undefined || obj1[key] === "") {
        obj1[key] = obj2[key];
      }
    });
    return obj1;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const v1 = USER_REGEX.test(values2.fname);
    const v2 = USER_REGEX.test(values2.lname);
    const v3 = EMAIL_REGEX.test(values2.email);
    const v4 = PWD_REGEX.test(values2.password);
    const v5 = PHONE_REGEX.test(values2.phone);
    if (!v1 || !v2 || !v3 || !v4 || !v5) {
      // console.log("validation1",v1);
      // console.log("validation2",v2);
      // console.log("validation3",v3);
      // console.log("validation4",v4);
      // console.log("validation5",v5);
      toast.error("Please, Enter Valid values", {
        position: "top-center",
        duration: 4000,
        className: "text-white rounded-5",
        style: { backgroundColor: "#3AB2A6" },
      });
      setValues2({
        fname: "",
        lname: "",
        email: "",
        password: "",
        phone: "",
      });
      return;
    }
    mergeObjectsWithEmptyValues(values2, values);
    try {
      const { data } = await axios.post("/API/Auth/UpdateProfile", values2, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      console.log("Profile updated:", data.code);
      if (data.code == 200) {
        toast.success(data.message.split(" ").slice(0, 2).join(" "), {
          position: "top-center",
          duration: 3000,
          className: " text-white rounded-5",
          style: { backgroundColor: "#3AB2A6" },
        });
      }
      if (data.code == 400) {
        toast.error(data.message, {
          position: "top-center",
          duration: 3000,
          className: " text-white rounded-5",
          style: { backgroundColor: "#3AB2A6" },
        });
      }
      if (data.code == 402) {
        toast.error(data.message, {
          position: "top-center",
          duration: 3000,
          className: " text-white rounded-5",
          style: { backgroundColor: "#3AB2A6" },
        });
      }
      if (data.code == 404) {
        toast.error(data.message, {
          position: "top-center",
          duration: 3000,
          className: " text-white rounded-5",
          style: { backgroundColor: "#3AB2A6" },
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile.");
    } finally {
      setLoading(false);
      setValues2({
        fname: "",
        lname: "",
        email: "",
        password: "",
        phone: "",
      });
    }
  };

  const deleteup = () => {
    setValues2({
      fname: "",
      lname: "",
      email: "",
      password: "",
      phone: "",
    });
  };

  const setBtnOne = () => {
    setBtn1(true);
    setBtn2(false);
    setBtn3(false);
  };
  const setBtnTwo = () => {
    setBtn1(false);
    setBtn2(true);
    setBtn3(false);
  };
  const setBtnThree = () => {
    setBtn1(false);
    setBtn2(false);
    setBtn3(true);
  };

  const togglePasswordVisibility = () =>{
    setShowPassword((prevval) => !prevval)
  }

  return (
    <>
      <div className="container ">
        <div className="row mt-5 px-3">
          <div className="d-flex justify-content-between align-items-center wrapper">
            <div className="px-4">
              <Link to="/">
                <button className="fw-normal home-slash home-slash-home border-0">
                  Home/
                </button>
              </Link>
              <button className="home-slash home-slash-myaccount border-0">
                <span className="fw-medium slash">My Account</span>
              </button>
            </div>
            <div className="sign-out-btn-top">
              <Button
                className="log-out-btn"
                buttonStyle="btn--circular2"
                onClick={handleOpen2}
              >
                Delete My Account
              </Button>
            </div>
          </div>
          <div className="col-md-3 mb-5 px-4">
            <div className="card my-count-btns-card">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-semibold mt-2 ms-3 lh-base hello-msg">{`Hello ${values.fname}`}</h5>
                <hr />
                <div className="d-flex flex-column flex-grow-1">
                  <button
                    onClick={setBtnOne}
                    className={
                      btn1
                        ? "btn btn-myacc-active text-start fw-semibold"
                        : "btn btn-myacc text-start fw-semibold"
                    }
                  >
                    My Account
                  </button>
                  <button
                    onClick={setBtnTwo}
                    className={
                      btn2
                        ? "btn btn-myacc-events-active text-start fw-semibold"
                        : "btn btn-myacc-events text-start fw-semibold"
                    }
                  >
                    Events
                  </button>
                  <button
                    onClick={handleOpen}
                    className={
                      btn3
                        ? "btn btn-myacc-signout-active text-start fw-semibold"
                        : "btn btn-myacc-signout text-start fw-semibold"
                    }
                  >
                    Sign Out
                  </button>
                </div>
                <Link to="/contactus">
                  <Button
                    className="log-out-btn mt-auto"
                    buttonStyle="btn--circular"
                  >
                    Contact Us <img src={questionmark} alt="" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {btn1 && (
            <div className="col-md-9">
              <div className="card mb-5">
                <div className="card-body">
                  <div className="first-section-myacc-edit ">
                    <div className="row">
                      <div className="col-md-2">
                        <div className="inner">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label my-profile-lab text-start fw-semibold lh-sm"
                          >
                            My Profile
                          </label>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="inner">
                          <div className="inputs-fsme ">
                            <input
                              className="form-control disabled-textfield bg-white mb-2 border-0 text-start fw-medium lh-sm"
                              type="text"
                              value={`${values.fname} ${values.lname}`}
                              aria-label="Disabled input example"
                              disabled
                              readOnly
                            />
                            <input
                              className="form-control disabled-textfield bg-white border-0 text-start fw-medium lh-sm"
                              type="text"
                              value={values.email}
                              aria-label="Disabled input example"
                              disabled
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="inner">
                          <QRCode
                            size={90}
                            bgColor="white"
                            fgColor="#012572"
                            value={code}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="second-section-myacc-edit ">
                    {/* d-flex flex-column flex-md-row */}
                    <div className="row">
                      <div className="col-md-3">
                        <div className="inner">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label my-profile-lab text-start fw-semibold lh-sm"
                          >
                            General Info
                          </label>
                        </div>
                      </div>

                      <div className="col-md-9">
                        <div className="inner">
                          <div className="inputs-fsme5 ">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label general-info-lab text-start fw-medium lh-sm"
                            >
                              First Name
                              <FontAwesomeIcon
                                icon={faCheck}
                                className={
                                  validvalues.validfname ? "valid" : "hide"
                                }
                              />
                              <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                  validvalues.validfname || !values2.fname
                                    ? "hide"
                                    : "invalid"
                                }
                              />
                            </label>
                            <input
                              onChange={handleChange}
                              className="form-control disabled-textfield bg-white mb-2 text-start fw-normal lh-sm"
                              type="text"
                              id="fname"
                              name="fname"
                              aria-invalid={
                                validvalues.validfname ? "false" : "true"
                              }
                              aria-describedby="fname-note"
                              value={values2.fname}
                              placeholder={values.fname}
                              onFocus={() =>
                                setfocusvalues({
                                  ...focusvalues,
                                  focusfname: true,
                                })
                              }
                              onBlur={() =>
                                setfocusvalues({
                                  ...focusvalues,
                                  focusfname: false,
                                })
                              }
                            />
                            <p
                              id="fname-note"
                              className={
                                focusvalues.focusfname &&
                                !validvalues.validfname
                                  ? "instructions"
                                  : "offscreen"
                              }
                            >
                              <FontAwesomeIcon icon={faInfoCircle} />
                              2 to 24 characters.
                              <br />
                              Must begin with a letter.
                              <br />
                              Letters, numbers, underscores, hyphens allowed.
                            </p>
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label general-info-lab text-start fw-medium lh-sm"
                            >
                              Last Name
                              <FontAwesomeIcon
                                icon={faCheck}
                                className={
                                  validvalues.validlname ? "valid" : "hide"
                                }
                              />
                              <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                  validvalues.validlname || !values2.lname
                                    ? "hide"
                                    : "invalid"
                                }
                              />
                            </label>
                            <input
                              onChange={handleChange}
                              className="form-control disabled-textfield bg-white text-start fw-medium lh-sm"
                              type="text"
                              id="lname"
                              name="lname"
                              value={values2.lname}
                              placeholder={values.lname}
                              aria-invalid={
                                validvalues.validlname ? "false" : "true"
                              }
                              aria-describedby="lname-note"
                              onFocus={() =>
                                setfocusvalues({
                                  ...focusvalues,
                                  focuslname: true,
                                })
                              }
                              onBlur={() =>
                                setfocusvalues({
                                  ...focusvalues,
                                  focuslname: false,
                                })
                              }
                            />
                            <p
                              id="lname-note"
                              className={
                                focusvalues.focuslname &&
                                !validvalues.validlname
                                  ? "instructions"
                                  : "offscreen"
                              }
                            >
                              <FontAwesomeIcon icon={faInfoCircle} />
                              2 to 24 characters.
                              <br />
                              Must begin with a letter.
                              <br />
                              Letters, numbers, underscores, hyphens allowed.
                            </p>
                            <div className="general-info-btns d-flex mt-4 justify-content-center">
                              <Button
                                className=""
                                buttonStyle="btn--circular-line"
                                onClick={deleteup}
                              >
                                Cancel
                              </Button>
                              <div className="ms-1 w-28">
                                <button
                                  onClick={handleSubmit}
                                  buttonStyle="btn--circular2"
                                  className="save-change-btn"
                                  disabled={isButtonDisabled}
                                >
                                  Save Changes
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <form
                    onSubmit={handleSubmit}
                    className="third-section-myacc-edit "
                  >
                    <div className="row">
                      <div className="col-md-3">
                        <div className="inner">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label my-profile-lab text-start fw-semibold lh-sm"
                          >
                            Security
                          </label>
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="inner">
                          <div className="inputs-fsme w-sm-100 ms-md-5">
                            <div className="label-plus-change-btn d-flex justify-content-between">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label general-info-lab fw-medium lh-sm"
                              >
                                Email
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className={
                                    validvalues.validemail ? "valid" : "hide"
                                  }
                                />
                                <FontAwesomeIcon
                                  icon={faTimes}
                                  className={
                                    validvalues.validemail || !values2.email
                                      ? "hide"
                                      : "invalid"
                                  }
                                />
                              </label>
                              <button
                                type="submit"
                                className="orange-no-border-btn border-0"
                                disabled={isButtonDisabled}
                                onClick={handleSubmit}
                              >
                                change email address
                              </button>
                            </div>
                            <input
                              onChange={handleChange}
                              className="form-control security-textfield bg-white mb-2 text-start fw-medium lh-sm"
                              type="text"
                              name="email"
                              id="email"
                              placeholder={values.email}
                              value={values2.email}
                              aria-invalid={
                                validvalues.validemail ? "false" : "true"
                              }
                              aria-describedby="email-note"
                              onFocus={() =>
                                setfocusvalues({
                                  ...focusvalues,
                                  focusemail: true,
                                })
                              }
                              onBlur={() =>
                                setfocusvalues({
                                  ...focusvalues,
                                  focusemail: false,
                                })
                              }
                            />
                            <p
                              id="email-note"
                              className={
                                focusvalues.focusemail &&
                                !validvalues.validemail
                                  ? "instructions"
                                  : "offscreen"
                              }
                            >
                              <FontAwesomeIcon icon={faInfoCircle} />
                              Allowed Email Pattern Username
                              <span aria-label="at symbol">@</span>site
                              <span aria-label="hashtag">.</span>com
                            </p>
                            <div className="label-plus-change-btn d-flex justify-content-between">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label general-info-lab fw-medium lh-sm"
                              >
                                Password
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className={
                                    validvalues.validpassword ? "valid" : "hide"
                                  }
                                />
                                <FontAwesomeIcon
                                  icon={faTimes}
                                  className={
                                    validvalues.validpassword ||
                                    !values2.password
                                      ? "hide"
                                      : "invalid"
                                  }
                                />
                              </label>
                              <button
                                type="submit"
                                className="orange-no-border-btn border-0"
                                disabled={isButtonDisabled}
                                onClick={handleSubmit}
                              >
                                change Password
                              </button>
                            </div>
                            <div className="d-flex">  
                              <input
                                onChange={handleChange}
                                className="form-control security-textfield bg-white text-start fw-normal lh-sm"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="phone"
                                value={values2.password}
                                placeholder={"*********"}
                                onFocus={() =>
                                  setfocusvalues({
                                    ...focusvalues,
                                    focuspassword: true,
                                  })
                                }
                                onBlur={() =>
                                  setfocusvalues({
                                    ...focusvalues,
                                    focuspassword: false,
                                  })
                                }
                                aria-invalid={
                                  validvalues.validpassword ? "false" : "true"
                                }
                                aria-describedby="password-note"
                              />
                              <p>&nbsp;</p>
                              <button
                                type="button"
                                className="eyebutton-myacc p-0 m-0 mt-0 px-1"
                                onClick={togglePasswordVisibility}
                                aria-label={
                                  showPassword ? "Hide password" : "Show password"
                                }
                              >
                                <FontAwesomeIcon
                                  icon={showPassword ? faEyeSlash : faEye}
                                  className=""
                                />
                              </button>
                            </div>
                            <p
                              id="password-note"
                              className={
                                focusvalues.focuspassword &&
                                !validvalues.validpassword
                                  ? "instructions"
                                  : "offscreen"
                              }
                            >
                              <FontAwesomeIcon icon={faInfoCircle} />
                              8 to 24 characters.
                              <br />
                              Must include uppercase and lowercase letters, a
                              number and a special character.
                              <br />
                              Allowed special characters:{" "}
                              <span aria-label="exclamation mark">!</span>{" "}
                              <span aria-label="at symbol">@</span>{" "}
                              <span aria-label="hashtag">#</span>{" "}
                              <span aria-label="dollar sign">$</span>{" "}
                              <span aria-label="percent">%</span>
                            </p>
                            {/* .repeat(values.password.length) */}
                            <div className="label-plus-change-btn d-flex justify-content-between">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label general-info-lab fw-medium lh-sm"
                              >
                                Phone number
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className={
                                    validvalues.validphone ? "valid" : "hide"
                                  }
                                />
                                <FontAwesomeIcon
                                  icon={faTimes}
                                  className={
                                    validvalues.validphone || !values2.phone
                                      ? "hide"
                                      : "invalid"
                                  }
                                />
                              </label>
                              <button
                                type="submit"
                                className="orange-no-border-btn border-0"
                                disabled={isButtonDisabled}
                                onClick={handleSubmit}
                              >
                                change phone number
                              </button>
                            </div>
                            <input
                              onChange={handleChange}
                              className="form-control security-textfield bg-white text-start fw-normal lh-sm"
                              type="number"
                              name="phone"
                              id="phone"
                              placeholder={`+${values.phone}`}
                              value={values2.phone}
                              aria-invalid={
                                validvalues.validphone ? "false" : "true"
                              }
                              aria-describedby="phone-note"
                              onFocus={() =>
                                setfocusvalues({
                                  ...focusvalues,
                                  focusphone: true,
                                })
                              }
                              onBlur={() =>
                                setfocusvalues({
                                  ...focusvalues,
                                  focusphone: false,
                                })
                              }
                            />
                            <p
                              id="phone-note"
                              className={
                                focusvalues.focusphone &&
                                !validvalues.validphone
                                  ? "instructions"
                                  : "offscreen"
                              }
                            >
                              <FontAwesomeIcon icon={faInfoCircle} /> Must be a
                              valid phone number (e.g., +123456789).
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <LogoutModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
      <My_Account_Delete_Modal
        open2={open2}
        handleOpen={handleOpen2}
        handleClose={handleClose2}
        token={token}
        code={code}
      />
    </>
  );
}

export default My_Account_body;
