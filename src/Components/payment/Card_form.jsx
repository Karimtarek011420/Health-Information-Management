import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import payimf from "../../assets/secure-payment.png";
import icon from "../../assets/cal_icon.svg";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button/Button";

const CARD_REGEX =
  /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
const CVC_REGEX = /^\d{3,4}$/;

export default function App(props) {
  const [paymethod, setpaymethod] = useState();
  const item = props.item;
  // const [paymentmethod, setpaymentmethod] = useState("");
  const [values, setvalues] = useState({
    paymentmethod: "",
    cardnumber: "",
    expiration: "",
    cvc: "",
  });

  const [validvalues, setvalidvalues] = useState({
    validcardnumber: false,
    validcvc: false,
  });

  const [focusvalues, setfocusvalues] = useState({
    focuscardnumber: false,
    focuscvc: false,
  });

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    // Check if the payment method is selected
    if (values.paymentmethod === "") {
      setIsDisabled(true); // Disable the text fields if no payment method is selected
    } else {
      setIsDisabled(false); // Enable the text fields if a payment method is selected
    }
  }, [values.paymentmethod]);

  useEffect(() => {
    setvalidvalues((prevvals) => ({
      ...prevvals,
      validcardnumber: CARD_REGEX.test(values.cardnumber),
    }));
  }, [values.cardnumber]);

  useEffect(() => {
    setvalidvalues((prevvals) => ({
      ...prevvals,
      validcvc: CVC_REGEX.test(values.cvc),
    }));
  }, [values.cvc]);

  return (
    <div className="card">
      <div
        style={{
          background: "linear-gradient(180deg, #17567a 0%, #43b6a7 100%)",
          borderRadius: "8px",
        }}
        className="px-md-5 py-md-4"
      >
        <h4
          className="fw-bold text-white"
          style={{ fontSize: "1rem", fontFamily: "Inter" }}
        >
          Upgrade your plan
        </h4>
        <p className="text-white pb-2" style={{ fontSize: "0.7rem" }}>
          Please make the payment to start enjoying all the features of our
          premium plan as soon as possible
        </p>
      </div>
      <div className="px-md-4">
        <div className="py-4 rounded mt-4 d-flex justify-content-between">
          <div className="d-flex flex-row align-items-center">
            <img src={payimf} className="rounded" width="60" />
            <div className="d-flex flex-column ms-4">
              <span
                className="h5 mb-1 fw-bold"
                style={{ fontSize: "0.9rem", color: "var(--primary)" }}
              >
                {item.name_en}
              </span>
              <Link to="/membership" style={{ textDecoration: "none" }}>
                <span className="small text-muted">CHANGE PLAN</span>
              </Link>
            </div>
          </div>
          <div className="d-flex flex-row align-items-center">
            <sup className="dollar font-weight-bold text-muted">SAR</sup>
            <span className="h2 mx-1 mb-0">{item.amount}</span>
            <span className="text-muted font-weight-bold mt-2">/ year</span>
          </div>
        </div>
        <h4
          className="mt-4 fw-bold"
          style={{ fontSize: "1rem", fontFamily: "Inter" }}
        >
          Payment details
        </h4>
        {/* <div className="mt-4 d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-row align-items-center">
                    <img
                      src="https://i.imgur.com/qHX7vY1.webp"
                      className="rounded"
                      width="70"
                    />
                    <div className="d-flex flex-column ms-3">
                      <span className="h5 mb-1">Credit Card</span>
                      <span className="small text-muted">
                        1234 XXXX XXXX 2570
                      </span>
                    </div>
                  </div>
                  <MDBInput
                    label="CVC"
                    id="form1"
                    type="text"
                    style={{ width: "70px" }}
                  />
                </div>
                <div className="mt-4 d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-row align-items-center">
                    <img
                      src="https://i.imgur.com/qHX7vY1.webp"
                      className="rounded"
                      width="70"
                    />
                    <div className="d-flex flex-column ms-3">
                      <span className="h5 mb-1">Credit Card</span>
                      <span className="small text-muted">
                        2344 XXXX XXXX 8880
                      </span>
                    </div>
                  </div>
                  <MDBInput
                    label="CVC"
                    id="form2"
                    type="text"
                    style={{ width: "70px" }}
                  />
                </div> */}
        <label
          className="payment-form-label fw-semibold"
          htmlFor="paymentmethod"
        >
          Payment Method:
        </label>
        <select
          className="form-control vclub-ins mt-2 p-2"
          id="paymentmethod"
          name="paymentmethod"
          value={values.paymentmethod}
          onChange={(e) =>
            setvalues({ ...values, paymentmethod: e.target.value })
          }
          required
        >
          <option value="" disabled>
            Select
          </option>
          <option value="credit card"> Credit Card</option>
          <option value="debit card">Debit Card</option>
          <option value="prepaid">Prepaid</option>
          <option value="visa">Visa</option>
        </select>
        <label className="payment-form-label fw-semibold" htmlFor="cardnumber">
          Card Number:
          <FontAwesomeIcon
            icon={faCheck}
            className={validvalues.validcardnumber ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={
              validvalues.validcardnumber || !values.cardnumber
                ? "hide"
                : "invalid"
            }
          />
        </label>
        <input
          placeholder="1234 1234 1234 1234"
          className="form-control vclub-ins mt-2"
          type="number"
          id="cardnumber"
          name="expiration"
          value={values.cardnumber}
          onChange={(e) => setvalues({ ...values, cardnumber: e.target.value })}
          required
          aria-invalid={validvalues.validcardnumber ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() =>
            setfocusvalues({ ...focusvalues, focuscardnumber: true })
          }
          onBlur={() =>
            setfocusvalues({ ...focusvalues, focuscardnumber: false })
          }
          disabled={isDisabled}
        />
        <p
          id="1"
          className={
            focusvalues.focuscardnumber &&
            values.cardnumber &&
            !validvalues.validcardnumber
              ? "instructions"
              : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Please enter a valid card number to proceed with your payment. Ensure that the card number you provided is correct and try again.
        </p>
        <div className="mt-2"></div>
        <div className="row">
          <div className="col-md-6">
            <label
              className="payment-form-label fw-semibold"
              htmlFor="expiration"
            >
              Expiration:
            </label>
            <input
              className="form-control vclub-ins mt-2"
              type="date"
              id="expiration"
              name="expiration"
              value={values.expiration}
              onChange={(e) =>
                setvalues({ ...values, expiration: e.target.value })
              }
              disabled={isDisabled}
            />
            <div className="mt-2"></div>
          </div>
          <div className="col-md-6">
            <label className="payment-form-label fw-semibold" htmlFor="cvc">
              CVC:
              <FontAwesomeIcon
                icon={faCheck}
                className={validvalues.validcvc ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validvalues.validcvc || !values.cvc ? "hide" : "invalid"
                }
              />
            </label>
            <input
              placeholder="123"
              className="form-control vclub-ins mt-2"
              type="number"
              id="cvc"
              name="cvc"
              value={values.cvc}
              onChange={(e) => setvalues({ ...values, cvc: e.target.value })}
              aria-invalid={validvalues.validcvc ? "false" : "true"}
              onFocus={() => setfocusvalues({ ...focusvalues, focuscvc: true })}
              onBlur={() => setfocusvalues({ ...focusvalues, focuscvc: false })}
              disabled={isDisabled}
            />
            <div className="mt-2">
              <p
                id="1"
                className={
                  focusvalues.focuscvc && values.cvc && !validvalues.validcvc
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />3 to 4 only Numbers.
              </p>
            </div>
          </div>
        </div>
        {/* <button onClick={console.log(JSON.stringify(values))}>Submit</button> */}
        <div className="my-3 ">
          <Link to="/contactus">
            <Button className="log-out-btn mt-auto" buttonStyle="btn--circular">
              Confirm
            </Button>
          </Link>
        </div>
      </div>

      {/*
       */}
      {/* <MDBBtn block size="lg" className="mt-3">
                {" "}
                Proceed to payment <MDBIcon fas icon="long-arrow-alt-right" />
              </MDBBtn> */}
    </div>
  );
}
