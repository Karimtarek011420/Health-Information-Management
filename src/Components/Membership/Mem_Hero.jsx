import bg3 from "../../assets/third-bg.svg";
import React, { useContext, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import "./Mem_Hero.css";
import { useState } from "react";
import Navbar_animated from "../NabarTest/Navbar_animated";
import LangContext from "../../Context/LangProvider";

function Mem_Hero() {
  const memRef = useRef();

  const { english, setenglish } = useContext(LangContext);
  return (
    <>
      <Navbar_animated page={false} />

      <div className="memship-us-hero-con">
        <div className="container-fluid memship-us-hero-container mx-auto">
          <img
            className="memship-us-background_image"
            src={bg3}
            alt="background_picture"
          />
          <div className="memship-us-overlay"></div>
          <div className="row col-md-5">
            {english ? (
              <>
                <div className="mem-backg_content p-md-5 py-4 mt-5">
                  <h5 className="mem-hero-h2 mt-5">SAUDI SOCIETY FOR</h5>
                  <h3 className="mem-hero-h1 fw-bold">
                    Health Information Management
                  </h3>
                  <p className="mem-hero-para">
                    THE RITZ-CARLTON, RIYADH, FEBRUARY 19 - 20, 2024
                  </p>
                </div>
              </>
            ) : (
              <>
                <div
                  className="mem-backg_content p-md-5 py-4 mt-5"
                  style={{ textAlign: "right", direction: "rtl" }}
                >
                  <h5 className="mem-hero-h2 mt-5"> الجمعية السعودية</h5>
                  <h3 className="mem-hero-h1 fw-bold">
                    {" "}
                    لادارة المعلومات الصحية
                  </h3>
                  <p className="mem-hero-para">
                    {" "}
                    الريتز كارلتون، الرياض، 19 - 20 فبراير 2024
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Mem_Hero;

/**<div class="carousel-caption">
                    <h1>Second slide label</h1>
                    <p>Some representative placeholder content for the second slide.</p>
                </div> */
/**  console.log("jjjjjj", props.email)
  console.log("otp", props.otp) */
