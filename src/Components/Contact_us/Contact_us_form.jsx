import React, { useEffect, useState } from "react";
import "./Contact_us_form.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Button } from "../Button/Button";
import email1 from "../../assets/email.png";
import axios from "axios";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import PulseLoader from "react-spinners/PulseLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PhoneInput } from "react-international-phone";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import "react-international-phone/style.css";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const USER_REGEX = /^[A-z]{2,23}$/;
const PHONE_REGEX = /\+\d{11,15}/;
function Contact_us_form() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({ fname: "", lname: "" });
  const [isChecked, setIsChecked] = useState(false);
  const [email, setemail] = useState("");
  const [validemail, setValidemail] = useState(false);
  const [emailFocus, setemailFocus] = useState(false);
  const [Fname, setFname] = useState("");
  const [validFname, setValidFname] = useState(false);
  const [FnameFocus, setFnameFocus] = useState(false);
  const [Lname, setLname] = useState("");
  const [validLname, setValidLname] = useState(false);
  const [LnameFocus, setLnameFocus] = useState(false);
  const [phone, setphone] = useState("");
  const [validphone, setValidphone] = useState(false);
  const [phoneFocus, setphoneFocus] = useState(false);
  const [message, setmessage] = useState("");
  useEffect(() => {
    setValidFname(USER_REGEX.test(Fname));
  }, [Fname]);

  useEffect(() => {
    setValidLname(USER_REGEX.test(Lname));
  }, [Lname]);
  useEffect(() => {
    setValidemail(emailRegex.test(email));
  }, [email]);
  useEffect(() => {
    setValidphone(PHONE_REGEX.test(phone));
  }, [phone]);
  const fetchData = async (e) => {
    let parsedphone = parseInt(phone);
    const valuescont = {
      fname: Fname,
      lname: Lname,
      email,
      phone: parsedphone,
      message,
    };

    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/API/Form-Contact/Contact", valuescont);
      setPosts(response.data);
      setemail('')
      setFname('')
      setLname('')
      setphone('')
      setmessage('')
      setIsChecked(false);
      toast.success("message send Successfully", {
        position: "top-center",
        duration: 2000,
        className: " text-white rounded-5",
        style: { backgroundColor: "#3AB2A6" },
      });
    } catch (err) {
      setError(err);
      toast.error("please fill form correctly", {
        position: "top-center",
        duration: 2000,
        className: " text-white",
        style: { backgroundColor: "#3AB2A6" },
      });
    } finally {
      setLoading(false);
      setvalue({ Fname, lname: "", phone: "", email: "", message: "" });
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setvalue((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  const handlePhoneChange = (phone) => {
    setvalue((prevValues) => ({
      ...prevValues,
      phone: phone,
    }));
  };

 
  return (
    <>
      <div className="container ">
        <div className="row my-5">
          <h3 className="contact-us-header fw-bold lh-base text-center">
            Contact us
          </h3>
          <p className="contact-us-paragraph lh-base text-center mb-5">
            We would like to hear from you!
          </p>
          <div className="col-md-6 align-items-center">
            <div className="contact-us-img-wrapper">
              <img src={email1} alt="" className="align-self-center w-100" />
            </div>
          </div>
          <div className="col-md-6">
            <form onSubmit={fetchData}>
              <div className="form-contactus">
                <div className="row mb-2">
                  <div className="col-md-6">
                    <label
                      htmlFor="nameInput1"
                      className="form-label form-contact-us-lab  "
                    >
                      First Name
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={validFname ? "valid" : "hide"}
                      />
                      <FontAwesomeIcon
                        icon={faTimes}
                        className={
                          validFname || !Fname ? "hide" : "invalid"
                        }
                      />
                    </label>
                    <input
                      type="text"
                      className="form-control form-conatct-us-ins"
                      id="nameInput1"
                      placeholder="first name"
                      aria-label="Name"
                      name="fname"
                      value={Fname}
                      aria-describedby="1"
                      onChange={(e) => setFname(e.target.value)}
                      aria-invalid={validFname ? "false" : "true"}
                      onFocus={() => setFnameFocus(true)}
                      onBlur={() => setFnameFocus(false)}
                    />
                    <div className="mt-2">
                      <p
                        id="1"
                        className={
                          FnameFocus && Fname && !validFname
                            ? "instructions"
                            : "offscreen"
                        }
                      >
                        <FontAwesomeIcon icon={faInfoCircle} />2 to 24 only
                        Letters.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="nameInput2"
                      className="form-label form-contact-us-lab  "
                    >
                      Last Name
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={validLname ? "valid" : "hide"}
                      />
                      <FontAwesomeIcon
                        icon={faTimes}
                        className={
                          validLname ||  !Lname? "hide" : "invalid"
                        }
                      />
                    </label>
                    <input
                      type="text"
                      className="form-control form-conatct-us-ins"
                      id="nameInput2"
                      placeholder="last name"
                      aria-label="Name"
                      name="lname"
                      value={Lname}
                      onChange={(e) => setLname(e.target.value)}
                      aria-invalid={validLname ? "false" : "true"}
                      onFocus={() => setLnameFocus(true)}
                      onBlur={() => setLnameFocus(false)}
                    />
                    <div className="mt-2">
                      <p
                        id="1"
                        className={
                          LnameFocus && Lname && !validLname
                            ? "instructions"
                            : "offscreen"
                        }
                      >
                        <FontAwesomeIcon icon={faInfoCircle} />2 to 24 only
                        Letters.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col mb-2">
                  <label
                    htmlFor="emailInput"
                    className="form-label form-contact-us-lab  "
                  >
                    Email address
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={validemail ? "valid" : "hide"}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={
                        validemail || !email ? "hide" : "invalid"
                      }
                    />
                  </label>
                  <input
                    type="email"
                    className="form-control form-conatct-us-ins form-email"
                    id="emailInput"
                    placeholder="you@company.com"
                    aria-label="email"
                    name="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    required
                    aria-invalid={validemail ? "false" : "true"}
                    onFocus={() => setemailFocus(true)}
                    onBlur={() => setemailFocus(false)}
                  />
                  <div className="mt-2">
                    <p
                      id="1"
                      className={
                        emailFocus && email && !validemail
                          ? "instructions"
                          : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} /> Allowed Email
                      Pattern Username
                      <span aria-label="at symbol">@</span>site
                      <span aria-label="hashtag">.</span>com
                    </p>
                  </div>
                </div>
                <div className="col mb-2">
                  <label
                    htmlFor="phoneInput"
                    className="form-label form-contact-us-lab  "
                  >
                    Phone Numaber
                  </label>
                  <PhoneInput
                    defaultCountry="sa"
                    id="phoneInput"
                    placeholder="(123) 456-7890"
                    aria-label="Phone"
                    name="phone"
                    value={phone}
                    onChange={setphone}
                    className="form-control phoneinput phonecontect p-1 mt-2"
                    aria-invalid={validphone ? "false" : "true"}
                    onFocus={() => setphoneFocus(true)}
                    onBlur={() => setphoneFocus(false)}
                    required
                  />
                  <p
                    id="phonenote"
                    className={
                      phoneFocus && phone && !validphone
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must be a valid Saudi phone number.
                  </p>
                </div>
                <div className="col mb-2">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label form-contact-us-lab"
                  >
                    Message
                  </label>
                  <textarea
                    className="form-control form-conatct-us-ins "
                    id="exampleFormControlTextarea1"
                    rows="3"
                    name="message"
                    value={message}
                    onChange={(e) => setmessage(e.target.value)}
                    ></textarea>
                </div>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input mt-3"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                    onChange={handleCheckboxChange}
                    checked={isChecked}
                  />
                  <label className="form-check-label mt-3" htmlFor="defaultCheck1">
                    &nbsp; You agree to our friendly{" "}
                    <Link to="/">privacy policy</Link>.
                  </label>
                </div>
                <div className="mb-2">
                  <Button
                    disabled
                    className="btns"
                    buttonStyle="btn--orange"
                    type="submit"
                  >
                    {loading ? (
                      <PulseLoader className="mt-1" size="16" color="white" />
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact_us_form;
