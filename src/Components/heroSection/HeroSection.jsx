import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import bg1 from "../../assets/background2.png";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import "./HeroSection.css";
import { useState } from "react";
import Register from "../../Signup/Register";
import LoginModal from "../LoginModal";
import RegisterModal from "../RegisterModal";
import { LangProvider } from "../../Context/LangProvider";
import LangContext from "../../Context/LangProvider";
import ForgotpassModal from "../FogotpassModal";
import NewpassModal from "../NewpassModal";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/UserSlice";

function HeroSection() {
  let { english, setenglish } = useContext(LangContext);
  const [isopen, setisopen] = useState(false);
  const user = useSelector(selectUser);
  const isLoggedIn = user?.loggedin;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [resetemail, setresetemail] = useState("");
  const [resetotp, setresetotp] = useState();
  const [page, setPage] = useState("register");

  const setcurrentPage = (pg) => {
    setPage(pg);
  };

  const emailresetfunction = (e_mail) => {
    setresetemail(e_mail);
  };

  const otpresetfunction = (r_otp) => {
    setresetotp(r_otp);
  };

  const popup = (
    page,
    open,
    resetemail,
    resetotp,
    handleOpen,
    handleClose,
    setcurrentPage,
    emailresetfunction,
    otpresetfunction
  ) => {
    if (page === "register") {
      return (
        <RegisterModal
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          setcurrentPage={setcurrentPage}
        />
      );
    } else if (page === "login") {
      return (
        <LoginModal
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          setcurrentPage={setcurrentPage}
        />
      );
    } else if (page === "forgotpass") {
      return (
        <ForgotpassModal
          open={open}
          resetemail={resetemail}
          resetotp={resetotp}
          handleOpen={handleOpen}
          handleClose={handleClose}
          setcurrentPage={setcurrentPage}
          emailresetfunction={emailresetfunction}
          otpresetfunction={otpresetfunction}
        />
      );
    } else if (page === "newpass") {
      return (
        <NewpassModal
          open={open}
          resetemail={resetemail}
          resetotp={resetotp}
          handleOpen={handleOpen}
          handleClose={handleClose}
          setcurrentPage={setcurrentPage}
          emailresetfunction={emailresetfunction}
          otpresetfunction={otpresetfunction}
        />
      );
    }
  };

  return (
    <>
      <div className="home-hero-con">
        <div className="container-fluid home-hero-container mx-auto">
          <img
            className="home-background_image"
            src={bg1}
            alt="background_picture"
          />
          <div className="home-overlay"></div>
          <div className="row col-md-6">
            <div className="backg_content p-5 mt-md-5 mt-3 ">
              {english ? (
                <>
                  <h5 className="home-hero-h2 fw-medium text-start text-white mt-5 mt-lg-3 pt-4">
                    SAUDI SOCIETY FOR
                  </h5>
                  <h3 className="home-hero-h1 me-5 pe-5 fw-bold text-start text-white">
                    Health Information Management
                  </h3>
                  <p className="home-hero-para fw-bold text-start text-white">
                    THE RITZ-CARLTON, RIYADH, FEBRUARY 19 - 20, 2024
                  </p>
                </>
              ) : (
                <>
                  <h5 className="home-hero-h2 fw-medium text-start text-white mt-5 mt-lg-3 pt-4">
                    الجمعية السعودية
                  </h5>
                  <h3 className="home-hero-h1 me-5 pe-5 fw-bold text-start text-white">
                    لادارة المعلومات الصحية
                  </h3>
                  <p className="home-hero-para fw-bold text-start text-white">
                    الريتز كارلتون، الرياض، 19 - 20 فبراير 2024
                  </p>
                </>
              )}
              <div className="hero-btns">
                {english ? (
                  <>
                    <button
                      className="btns btn-join me-3 mb-2"
                      disabled={isLoggedIn}
                      onClick={handleOpen}
                    >
                      Join Us
                    </button>
                    <Link to={"/about-us"}>
                      <button className="btns btn-learnmore ">
                        Learn More
                      </button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Button
                      className="btns"
                      buttonStyle="btn--primary"
                      buttonSize="btn--large"
                      onClick={handleOpen}
                    >
                      انضم الينا
                    </Button>
                    <Link to={"/about-us"}>
                      <Button
                        className="btns"
                        buttonStyle="btn--outline"
                        buttonSize="btn--large"
                      >
                        اعرف المزيد
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {popup(
        page,
        open,
        resetemail,
        resetotp,
        handleOpen,
        handleClose,
        setcurrentPage,
        emailresetfunction,
        otpresetfunction
      )}
    </>
  );
}

export default HeroSection;
