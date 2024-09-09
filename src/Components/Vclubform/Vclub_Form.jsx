import React, { useEffect, useState } from "react";
import "./Vclub_Form.css";
import { Button } from "../Button/Button";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import Vclub_form_suceess from "../Vclub_form_suceess";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
/// karim tarek edris uuuuu
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const USER_REGEX = /^[A-z]{2,23}$/;
const PHONE_REGEX = /\+\d{11,15}/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
function Vclub_Form() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ fname: "", lname: "", education: "" });
  const [Fname, setFname] = useState("");
  const [validFname, setValidFname] = useState(false);
  const [FnameFocus, setFnameFocus] = useState(false);
  const [Lname, setLname] = useState("");
  const [validLname, setValidLname] = useState(false);
  const [LnameFocus, setLnameFocus] = useState(false);
  const [email, setemail] = useState("");
  const [validemail, setValidemail] = useState(false);
  const [emailFocus, setemailFocus] = useState(false);
  const [phone, setphone] = useState("");
  const [validphone, setValidphone] = useState(false);
  const [phoneFocus, setphoneFocus] = useState(false);
  const [password, setpassword] = useState("");
  const [validpassword, setValidpassword] = useState(false);
  const [passwordFocus, setpasswordFocus] = useState(false);
  const [password_confirmation, setpassword_confirmation] = useState("");
  const [validconfirmation, setValidconfirmation] = useState(false);
  const [confirmationFocus, setconfirmationFocus] = useState(false);
  const [address, setaddress] = useState("");
  const [gender, setgender] = useState("");
  const [whatsapp, setwhatsapp] = useState("");
  const [age, setage] = useState("");
  const [education, seteducation] = useState("");
  const [valideducation, setValideducation] = useState(false);
  const [educationFocus, seteducationFocus] = useState(false);
  const [language, setlanguage] = useState("");
  const [socials, setsocials] = useState("");
  const [
    volunteer_interest_administration,
    setvolunteer_interest_administration,
  ] = useState(false);
  const [volunteer_interest_field_work, setvolunteer_interest_field_work] =
    useState(false);
  const [volunteer_interest_campaigning, setvolunteer_interest_campaigning] =
    useState(false);
  const [
    volunteer_interest_media_maintenance_gardening,
    setvolunteer_interest_media_maintenance_gardening,
  ] = useState(false);
  const [
    volunteer_interest_health_wellness_disability,
    setvolunteer_interest_health_wellness_disability,
  ] = useState(false);
  const [
    volunteer_interest_festivals_culture,
    setvolunteer_interest_festivals_culture,
  ] = useState(false);
  const [volunteer_interest_other, setvolunteer_interest_other] =
    useState(false);
  const [talents_qu, settalents_qu] = useState("");
  const [availability_qu, setavailability_qu] = useState("");
  const [qualifications_qu, setqualifications_qu] = useState("");
  const [notes, setnotes] = useState("");
  useEffect(() => {
    setValidFname(USER_REGEX.test(Fname));
  }, [Fname]);
  useEffect(() => {
    setValidLname(USER_REGEX.test(Lname));
  }, [Lname]);
  useEffect(() => {
    setValideducation(USER_REGEX.test(education));
  }, [education]);
  useEffect(() => {
    setValidemail(emailRegex.test(email));
  }, [email]);
  useEffect(() => {
    setValidpassword(PWD_REGEX.test(password));
    setValidconfirmation(password === password_confirmation);
  }, [password, password_confirmation]);
  useEffect(() => {
    setValidphone(PHONE_REGEX.test(phone));
  }, [phone]);

  // const [values, setValues] = useState({
  //     fname: '',
  //     lname: '',
  //     address: '',
  //     email: '',
  //     phone: '',
  //     whatsapp: '',
  //     age: '',
  //     gender: '',
  //     password: '',
  //     confirm_password: '',
  //     education: '',
  //     language: '',
  //     socials: '',
  //     volunteer_interest_administration: false,
  //     volunteer_interest_field_work: false,
  //     volunteer_interest_campaigning: false,
  //     volunteer_interest_media_maintenance_gardening: false,
  //     volunteer_interest_health_wellness_disability: false,
  //     volunteer_interest_festivals_culture: false,
  //     volunteer_interest_other: false,
  //     talents_qu: '',
  //     availability_qu: '',
  //     qualifications_qu: '',
  //     notes: ''
  // });

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setValues((prevValues) => ({
//       ...prevValues,
//       [name]: value,
//     }));
//   }

//   const handlePhoneChange = (phone) => {
//     setValues((prevValues) => ({
//       ...prevValues,
//       phone: phone,
//     }));
//   };

//   const handleWtsChange = (phone) => {
//     setValues((prevValues) => ({
//       ...prevValues,
//       whatsapp: phone,
//     }));
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let response = null;
    let parsedphone = String(phone);
    let parsedwts = String(whatsapp);
    const valuesVclub = {
      fname: Fname,
      lname: Lname,
      address,
      email,
      phone: parsedphone,
      whatsapp: parsedwts,
      age,
      gender,
      password,
      password_confirmation,
      education,
      language,
      socials,
      volunteer_interest_administration,
      volunteer_interest_field_work,
      volunteer_interest_campaigning,
      volunteer_interest_media_maintenance_gardening,
      volunteer_interest_health_wellness_disability,
      volunteer_interest_festivals_culture,
      volunteer_interest_other,
      talents_qu,
      availability_qu,
      qualifications_qu,
      notes,
    };

    try {
      response = await axios.post("/API/Form-Volunteer/Volunteer", valuesVclub);
      setFname("");
      setLname("");
      setemail("");
      setpassword("");
      setpassword_confirmation("");
      setphone("");
      setaddress("");
      setage("");
      setgender("");
      seteducation("");
      setlanguage("");
      setwhatsapp("");
      setnotes("");
      setavailability_qu("");
      setqualifications_qu("");
      settalents_qu("");
      setvolunteer_interest_administration(false);
      setvolunteer_interest_field_work(false);
      setvolunteer_interest_campaigning(false);
      setvolunteer_interest_media_maintenance_gardening(false);
      setvolunteer_interest_health_wellness_disability(false);
      setvolunteer_interest_festivals_culture(false);
      setvolunteer_interest_other(false);
      setvolunteer_interest_administration(false);
      // Assuming the API returns the success message in response.data.message
      toast.success(response.data.message, {
        position: "top-center",
        duration: 3000,
        className: " text-white rounded-5",
        style: { backgroundColor: "#3AB2A6", width: "100%" },
      });
      setTimeout(() => {
        handleOpen();

      }, 2000);
    } catch (err) {
      // Assuming the error message is in err.response.data.message
      toast.error(err.response?.data?.message.split(" ").slice(0, ).join(" ") || "please fill form correctly", {
        position: "top-center",
        duration: 2000,
        className: " text-white",
        style: { backgroundColor: "#3AB2A6" },
      });
    } finally {
      setLoading(false);
      // Reset form values if needed
      setValues({
        fname: "",
        lname: "",
        address: "",
        email: "",
        phone: "",
        whatsapp: "",
        age: "",
        gender: "",
        password: "",
        confirm_password: "",
        education: "",
        language: "",
        socials: "",
        volunteer_interest_administration: false,
        volunteer_interest_field_work: false,
        volunteer_interest_campaigning: false,
        volunteer_interest_media_maintenance_gardening: false,
        volunteer_interest_health_wellness_disability: false,
        volunteer_interest_festivals_culture: false,
        volunteer_interest_other: false,
        talents_qu: "",
        availability_qu: "",
        qualifications_qu: "",
        notes: "",
      });
    }
  };

  const handleRadioChange = (event) => {
    setValues({
      ...values,
      volunteer_interest_administration: false,
      volunteer_interest_field_work: false,
      volunteer_interest_campaigning: false,
      volunteer_interest_media_maintenance_gardening: false,
      volunteer_interest_health_wellness_disability: false,
      volunteer_interest_festivals_culture: false,
      volunteer_interest_other: false, // Update the state with the selected value
    });

    if (event.target.value == "Administration") {
      setValues({
        ...values,
        volunteer_interest_administration: true,
        volunteer_interest_field_work: false,
        volunteer_interest_campaigning: false,
        volunteer_interest_media_maintenance_gardening: false,
        volunteer_interest_health_wellness_disability: false,
        volunteer_interest_festivals_culture: false,
        volunteer_interest_other: false, // Update the state with the selected value
      });
    } else if (event.target.value == "Field Work") {
      setValues({
        ...values,
        volunteer_interest_field_work: true,
        volunteer_interest_administration: false,
        volunteer_interest_campaigning: false,
        volunteer_interest_media_maintenance_gardening: false,
        volunteer_interest_health_wellness_disability: false,
        volunteer_interest_festivals_culture: false,
        volunteer_interest_other: false, // Update the state with the selected value
      });
    } else if (event.target.value == "Campaigning") {
      setValues({
        ...values,
        volunteer_interest_campaigning: true,
        volunteer_interest_administration: false,
        volunteer_interest_field_work: false,
        volunteer_interest_media_maintenance_gardening: false,
        volunteer_interest_health_wellness_disability: false,
        volunteer_interest_festivals_culture: false,
        volunteer_interest_other: false, // Update the state with the selected value
      });
    } else if (event.target.value == "Festivals and Culture") {
      setValues({
        ...values,
        volunteer_interest_festivals_culture: true,
        volunteer_interest_administration: false,
        volunteer_interest_field_work: false,
        volunteer_interest_campaigning: false,
        volunteer_interest_media_maintenance_gardening: false,
        volunteer_interest_health_wellness_disability: false,
        volunteer_interest_other: false, // Update the state with the selected value
      });
    } else if (event.target.value == "Media, Maintenance, Gardening") {
      setValues({
        ...values,
        volunteer_interest_media_maintenance_gardening: true,
        volunteer_interest_administration: false,
        volunteer_interest_field_work: false,
        volunteer_interest_campaigning: false,
        volunteer_interest_health_wellness_disability: false,
        volunteer_interest_festivals_culture: false,
        volunteer_interest_other: false, // Update the state with the selected value
      });
    } else if (
      event.target.value == "Health and Wellness, Disability Services"
    ) {
      setValues({
        ...values,
        volunteer_interest_health_wellness_disability: true,
        volunteer_interest_administration: false,
        volunteer_interest_field_work: false,
        volunteer_interest_campaigning: false,
        volunteer_interest_media_maintenance_gardening: false,
        volunteer_interest_festivals_culture: false,
        volunteer_interest_other: false, // Update the state with the selected value
      });
    } else if (event.target.value == "Other") {
      setValues({
        ...values,
        volunteer_interest_other: true,
        volunteer_interest_administration: false,
        volunteer_interest_field_work: false,
        volunteer_interest_campaigning: false,
        volunteer_interest_media_maintenance_gardening: false,
        volunteer_interest_health_wellness_disability: false,
        volunteer_interest_festivals_culture: false,
      });
    }
  };

  return (
    <>
      <div className="container my-5">
        <h3 className="vform-header fw-bold lh-base">Personal Information</h3>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <label className="vclub-form-label fw-semibold" htmlFor="Fname">
                First Name:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validFname ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validFname || !Fname ? "hide" : "invalid"}
                />
              </label>
              <input
                placeholder=" your first name"
                className="form-control vclub-ins mt-2"
                type="text"
                id="Fname"
                name="fname"
                value={Fname}
                onChange={(e) => setFname(e.target.value)}
                required
                aria-invalid={validFname ? "false" : "true"}
                aria-describedby="uidnote"
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
                  <FontAwesomeIcon icon={faInfoCircle} />2 to 24 only Letters.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <label className="vclub-form-label fw-semibold" htmlFor="Lname">
                Last Name:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validLname ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validLname || !Lname ? "hide" : "invalid"}
                />
              </label>
              <input
                placeholder=" your last name"
                className="form-control vclub-ins mt-2"
                type="text"
                id="Lname"
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
                  <FontAwesomeIcon icon={faInfoCircle} />2 to 24 only Letters.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="vclub-form-label fw-semibold" htmlFor="Address">
                Address:
              </label>
              <input
                placeholder=" your address"
                className="form-control vclub-ins mt-2"
                type="text"
                id="Address"
                name="address"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="vclub-form-label fw-semibold" htmlFor="Email">
                Email:
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
                placeholder=" your email"
                className="form-control vclub-ins mt-2"
                type="email"
                id="Email"
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
                  <FontAwesomeIcon icon={faInfoCircle} /> Allowed Email Pattern
                  Username
                  <span aria-label="at symbol">@</span>site
                  <span aria-label="hashtag">.</span>com
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label
                htmlFor="phoneInput"
                className="vclub-form-label fw-semibold"
              >
                Phone Number
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
            <div className="col-md-6">
              <label
                htmlFor="phoneInput"
                className="vclub-form-label fw-semibold"
              >
                WhatsApp Number
              </label>
              <PhoneInput
                defaultCountry="sa"
                id="WhatsApp"
                name="whatsapp"
                placeholder="(123) 456-7890"
                aria-label="WhatsApp"
                value={whatsapp}
                onChange={setwhatsapp}
                className="form-control phoneinput phonecontect p-1 mt-2"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="vclub-form-label fw-semibold" htmlFor="Age">
                Age:
              </label>
              <input
                placeholder=" your age"
                className="form-control vclub-ins mt-2"
                type="number"
                id="Age"
                name="age"
                value={age}
                onChange={(e) => setage(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="vclub-form-label fw-semibold" htmlFor="Gender">
                Gender:
              </label>
              <select
                className="form-control vclub-ins mt-2"
                id="Gender"
                name="gender"
                value={gender}
                onChange={(e) => setgender(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label
                className="vclub-form-label fw-semibold"
                htmlFor="Password"
              >
                Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validpassword ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validpassword || !password ? "hide" : "invalid"}
                />
              </label>
              <input
                placeholder="********"
                className="form-control vclub-ins mt-2"
                type="password"
                id="Password"
                name="password"
                onChange={(e) => setpassword(e.target.value)}
                value={password}
                required
                aria-invalid={validpassword ? "false" : "true"}
                aria-describedby="passwordnote"
                onFocus={() => setpasswordFocus(true)}
                onBlur={() => setpasswordFocus(false)}
              />
              <p
                id="passwordnote"
                className={
                  passwordFocus && !validpassword ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>
            </div>
            <div className="col-md-6">
              <label
                className="vclub-form-label fw-semibold"
                htmlFor="Confirm_Password"
              >
                Confirm Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={
                    validconfirmation && password_confirmation
                      ? "valid"
                      : "hide"
                  }
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={
                    validconfirmation || !password_confirmation
                      ? "hide"
                      : "invalid"
                  }
                />
              </label>
              <input
                placeholder="********"
                className="form-control vclub-ins mt-2"
                type="password"
                id="Confirm_Password"
                name="confirm_password"
                onChange={(e) => setpassword_confirmation(e.target.value)}
                value={password_confirmation}
                required
                aria-invalid={validconfirmation ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setconfirmationFocus(true)}
                onBlur={() => setconfirmationFocus(false)}
              />
              <p
                id="confirmnote"
                className={
                  confirmationFocus && !validconfirmation
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label
                className="vclub-form-label fw-semibold"
                htmlFor="Education"
              >
                Education:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={valideducation ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={valideducation || !education ? "hide" : "invalid"}
                />
              </label>
              <input
                placeholder="Type your education"
                className="form-control vclub-ins mt-2"
                type="text"
                id="Education"
                name="education"
                value={education}
                aria-describedby="1"
                onChange={(e) => seteducation(e.target.value)}
                aria-invalid={valideducation ? "false" : "true"}
                onFocus={() =>seteducationFocus(true)}
                onBlur={() => seteducationFocus(false)}
                required
              />
              <div className="mt-2">
                <p
                  id="1"
                  className={
                    educationFocus && education && !valideducation
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />2 to 24 only Letters.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <label
                className="vclub-form-label fw-semibold"
                htmlFor="Language"
              >
                Language:
              </label>
              <select
                className="form-control vclub-ins mt-2"
                id="Language"
                name="language"
                value={language}
                onChange={(e) => setlanguage(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Arabic">Arabic</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </div>
          </div>
          <div className="row mt-2">
            <label className="vclub-form-label fw-semibold" htmlFor="Socials">
              Social Media Links
            </label>
            <div className="px-2">
              <textarea
                className="form-control vclub-ins mt-2 textrealize"
                id="Socials"
                rows="3"
                name="socials"
                value={socials}
                onChange={(e) => setsocials(e.target.value)}
              ></textarea>
            </div>
          </div>
          <h3 className="vs-form-h1 mt-2 fw-semibold">
            Your Volunteer Interest
          </h3>
          <div onChange={handleRadioChange}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="volunteer_interest"
                id="Administration"
                value="Administration"
              />
              <label className="form-check-label" htmlFor="Administration">
                Administration
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="volunteer_interest"
                id="Field_Work"
                value="Field Work"
              />
              <label className="form-check-label" htmlFor="Field_Work">
                Field Work
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="volunteer_interest"
                id="Campaigning"
                value="Campaigning"
              />
              <label className="form-check-label" htmlFor="Campaigning">
                Campaigning
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="volunteer_interest"
                id="Volunteer_Coordination"
                value="Volunteer Coordination"
              />
              <label
                className="form-check-label"
                htmlFor="Volunteer_Coordination"
              >
                Volunteer Coordination
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="volunteer_interest"
                id="MMG"
                value="Media, Maintenance, Gardening"
              />
              <label className="form-check-label" htmlFor="MMG">
                Media, Maintenance, Gardening
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="volunteer_interest"
                id="HWD"
                value="Health and Wellness, Disability Services"
              />
              <label className="form-check-label" htmlFor="HWD">
                Health and Wellness, Disability Services
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="volunteer_interest"
                id="Festivals_Culture"
                value="Festivals and Culture"
              />
              <label className="form-check-label" htmlFor="Festivals_Culture">
                Festivals and Culture
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="volunteer_interest"
                id="Other"
                value="Other"
              />
              <label className="form-check-label" htmlFor="Other">
                Other
              </label>
            </div>
          </div>
          <div className="row mt-2">
            <label className="vclub-form-label fw-semibold " htmlFor="Talent">
              Do You Have Any Talents?
            </label>
            <div className="px-2">
              <textarea
                className="form-control vclub-ins mt-2 textrealize"
                id="Talent"
                rows="3"
                name="talents_qu"
                value={talents_qu}
                onChange={(e) => settalents_qu(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="row mt-3">
            <label className="vclub-form-label fw-semibold" htmlFor="Aval">
              What time is most convenient for you to volunteer?
            </label>
            <div className="px-2">
              <select
                className="form-control vclub-ins mt-2"
                id="Aval"
                name="availability_qu"
                value={availability_qu}
                onChange={(e) => setavailability_qu(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Weekdays">Weekdays</option>
                <option value="Weekends">Weekends</option>
                <option value="Evenings">Evenings</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>
          </div>
          <div className="row mt-2">
            <label className="vclub-form-label fw-semibold" htmlFor="Quals">
              Summarize the special skills and qualifications you have acquired
              from fieldwork, previous volunteer work, or other activities,
              including hobbies or sports.
            </label>
            <div className="px-2">
              <textarea
                className="form-control vclub-ins mt-2 textrealize"
                id="Quals"
                rows="3"
                name="qualifications_qu"
                value={qualifications_qu}
                onChange={(e) => setqualifications_qu(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="row mt-2">
            <label className="vclub-form-label fw-semibold" htmlFor="Onotes">
              Other Notes
            </label>
            <div className="px-2">
              <textarea
                className="form-control vclub-ins mt-2 textrealize"
                id="Onotes"
                rows="3"
                name="notes"
                value={notes}
                onChange={(e) => setnotes(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="mb-2 mt-3 w-50 mx-auto">
            <Button className="btns" buttonStyle="btn--circular2" type="submit">
              {loading ? (
                <PulseLoader className="mt-1" size="16" color="white" />
              ) : (
                "Send Form"
              )}
            </Button>
          </div>
        </form>
      </div>
      <Vclub_form_suceess
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </>
  );
}

export default Vclub_Form;
