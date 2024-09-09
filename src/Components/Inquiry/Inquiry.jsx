import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./inquiry.css";
import { Button } from "../Button/Button";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import toast from "react-hot-toast";
import { useEffect } from "react";
import reg from "../../assets/reg.png";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import LangContext from "../../Context/LangProvider";
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const USER_REGEX = /^[A-z]{2,23}$/;
const PHONE_REGEX = /\+\d{11,15}/;
function Inquiry() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setemail] = useState("");
  const [validemail, setValidemail] = useState(false);
  const [emailFocus, setemailFocus] = useState(false);
  const [UName, setUName] = useState("");
  const [validFUName, setValidUName] = useState(false);
  const [UNameFocus, setUNameFocus] = useState(false);
  const [phone, setphone] = useState("");
  const [validphone, setValidphone] = useState(false);
  const [phoneFocus, setphoneFocus] = useState(false);
  const [message, setmessage] = useState("");
  useEffect(() => {
    setValidUName(USER_REGEX.test(UName));
  }, [UName]);
  useEffect(() => {
    setValidemail(emailRegex.test(email));
  }, [email]);
  useEffect(() => {
    setValidphone(PHONE_REGEX.test(phone));
  }, [phone]);
  const fetchData = async (e) => {
    e.preventDefault();
    let parsedphone = parseInt(phone);
    const valuescont = {
      name: UName,
      email,
      phone: parsedphone,
      message,
    };
    setLoading(true);
    try {
      const response = await axios.post("/API/Form-Request/Add", valuescont);
      setPosts(response.data);
      setemail("");
      setUName("");
      setphone("");
      setmessage("");
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
      setValues({ UName, phone, email, message });
    }
  };

  // const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setValues({ ...values, [name]: value });

  //     // Validation
  //     if (!textOnlyRegex.test(value)) {
  //       setErrors({
  //         ...errors,
  //         [name]: '2 to 24 characters. Only Letters are Allowed.'
  //       });
  //     } else {
  //       setErrors({
  //         ...errors,
  //         [name]: ''
  //       });
  //       setErrors('')
  //     }
  // };

  const handlePhoneChange = (phone) => {
    setValues((prevValues) => ({
      ...prevValues,
      phone: phone,
    }));
  };

  const { english, setenglish } = useContext(LangContext);

  return (
    <div>
      <div className="container-fluid fluid-container position-relative z-3">
        <img
          src={reg}
          alt="registration"
          className="registration-img-inquriy"
        />
        <div className="inquiry-sec-overlay "></div>
        <div className="row position-relative ">
          {english ? (
            <>
              <div className="col-md-6 header-inquiry-container px-md-5 py-md-3 p-2">
                <h3 className="header-inquiry fw-bold lh-base text-md-start text-center me-md-5 mx-md-5 mt-4">
                  General Inquiries and Questions relatedd to Membership
                </h3>
                <p className="header2-inquiry fw-medium lh-base text-md-start text-center mx-md-5">
                  Lorem ipsum dolor sit amet consectetur adipiscing eli mattis
                  sit phasellus mollis sit aliquam sit nullam.
                </p>
              </div>
            </>
          ) : (
            <>
              <div
                className="col-md-6 header-inquiry-container px-md-5 py-md-3 p-2"
                style={{ textAlign: "right", direction: "rtl" }}
              >
                <h3 className="header-inquiry fw-bold lh-base   text-end me-md-5 mx-md-5 mt-4">
                  الاستفسارات العامة والأسئلة المتعلقة بالعضوية{" "}
                </h3>
                <p className="header2-inquiry fw-medium lh-base  mx-md-5">
                  Lorem ipsum dolor sit amet consectetur adipiscing eli mattis
                  sit phasellus mollis sit aliquam sit nullam.
                </p>
              </div>
            </>
          )}
          {english ? (
            <>
              <div className="col-md-6 p-3">
                <form onSubmit={fetchData}>
                  <div className="form-inquiry px-md-5 py-md-3 p-2">
                    <div className="row mb-2">
                      <div className="col-md-6">
                        <label htmlFor="nameInput" className="form-label">
                          First Name
                          <FontAwesomeIcon
                            icon={faCheck}
                            className={validFUName ? "valid" : "hide"}
                          />
                          <FontAwesomeIcon
                            icon={faTimes}
                            className={
                              validFUName || !UName ? "hide" : "invalid"
                            }
                          />
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="nameInput"
                          placeholder="Your Name"
                          aria-label="name"
                          name="name"
                          value={UName}
                          aria-describedby="1"
                          onChange={(e) => setUName(e.target.value)}
                          aria-invalid={validFUName ? "false" : "true"}
                          onFocus={() => setUNameFocus(true)}
                          onBlur={() => setUNameFocus(false)}
                        />
                        <div className="mt-2">
                          <p
                            id="1"
                            className={
                              UNameFocus && UName && !validFUName
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
                        <label htmlFor="phoneInput" className="form-label">
                          Phone
                        </label>
                        <PhoneInput
                          defaultCountry="sa"
                          id="phoneInput"
                          placeholder="(123) 456 7890"
                          aria-label="Phone"
                          name="phone"
                          value={phone}
                          onChange={setphone}
                          className="form-control phoneinput  p-1 phonequery"
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
                    </div>
                    <div className="col mb-2">
                      <label htmlFor="emailInput" className="form-label">
                        Email address
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={validemail ? "valid" : "hide"}
                        />
                        <FontAwesomeIcon
                          icon={faTimes}
                          className={validemail || !email ? "hide" : "invalid"}
                        />
                      </label>
                      <input
                        type="email"
                        className="form-control form-email"
                        id="emailInput"
                        placeholder="example@email.com"
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
                      <label htmlFor="messageInput" className="form-label">
                        Message
                      </label>
                      <textarea
                        className="form-control"
                        id="messageInput"
                        rows="3"
                        name="message"
                        value={message}
                        onChange={(e) => setmessage(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="my-4 mx-auto">
                      <Button
                        className="btns"
                        buttonStyle="btn--circular2"
                        type="submit"
                      >
                        {loading ? (
                          <PulseLoader
                            className="mt-1"
                            size="16"
                            color="white"
                          />
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <>
              <div className="col-md-6 p-3" >
                <form onSubmit={fetchData}>
                  <div className="form-inquiry px-md-5 py-md-3 p-2" style={{ textAlign: 'right', direction: 'rtl' }}>
                    <div className="row mb-2">
                      <div className="col-md-6">
                        <label htmlFor="nameInput" className="form-label">
                        الاسم الأول
                          <FontAwesomeIcon
                            icon={faCheck}
                            className={validFUName ? "valid" : "hide"}
                          />
                          <FontAwesomeIcon
                            icon={faTimes}
                            className={
                              validFUName || !UName ? "hide" : "invalid"
                            }
                          />
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="nameInput"
                          placeholder="إسمك"
                          aria-label="name"
                          name="name"
                          value={UName}
                          aria-describedby="1"
                          onChange={(e) => setUName(e.target.value)}
                          aria-invalid={validFUName ? "false" : "true"}
                          onFocus={() => setUNameFocus(true)}
                          onBlur={() => setUNameFocus(false)}
                        />
                        <div className="mt-2">
                          <p
                            id="1"
                            className={
                              UNameFocus && UName && !validFUName
                                ? "instructions"
                                : "offscreen"
                            }
                          >
                            <FontAwesomeIcon icon={faInfoCircle} /> من 2 إلى 24 حرفًا فقط
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="phoneInput" className="form-label">
                        الهاتف
                        </label>
                        <PhoneInput
                          defaultCountry="sa"
                          id="phoneInput"
                          placeholder="(123) 456 7890"
                          aria-label="Phone"
                          name="phone"
                          value={phone}
                          onChange={setphone}
                          className="form-control phoneinput  p-1 phonequery"
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
                          <FontAwesomeIcon icon={faInfoCircle} />   يجب أن يكون رقم هاتف سعودي صالح                          </p>
                      </div>
                    </div>
                    <div className="col mb-2">
                      <label htmlFor="emailInput" className="form-label">
                      عنوان البريد الإلكتروني                        <FontAwesomeIcon
                          icon={faCheck}
                          className={validemail ? "valid" : "hide"}
                        />
                        <FontAwesomeIcon
                          icon={faTimes}
                          className={validemail || !email ? "hide" : "invalid"}
                        />
                      </label>
                      <input
                        type="email"
                        className="form-control form-email"
                        id="emailInput"
                        placeholder="example@email.com"
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
                          <FontAwesomeIcon icon={faInfoCircle} /> البريد الإلكتروني المسموح به
                          اسم مستخدم النمط
                          <span aria-label="at symbol">@</span>site
                          <span aria-label="hashtag">.</span>com
                        </p>
                      </div>
                    </div>
                    <div className="col mb-2">
                      <label htmlFor="messageInput" className="form-label">
                      رسالة
                      </label>
                      <textarea
                        className="form-control"
                        id="messageInput"
                        rows="3"
                        name="message"
                        value={message}
                        onChange={(e) => setmessage(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="my-4 mx-auto">
                      <Button
                        className="btns"
                        buttonStyle="btn--circular2"
                        type="submit"
                      >
                        {loading ? (
                          <PulseLoader
                            className="mt-1"
                            size="16"
                            color="white"
                          />
                        ) : (
                          "أرسل الرسالة"
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Inquiry;
