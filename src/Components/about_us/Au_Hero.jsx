import bg2 from "../../assets/second-bg.svg";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import bg1 from "../../assets/Topback.svg";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import "./Au_Hero.css";
import { useState } from "react";

function Au_Hero() {
  return (
    <div className='about-us-hero-con'>
      <div className="container-fluid about-us-hero-container mx-auto">
        <img
          className="about-us-background_image"
          src={bg2}
          alt="background_picture"
        />
        <div className="about-us-overlay"></div>
        <div className="row col-md-5">
          <div className="Au-backg_content p-md-5 p-3 py-5 mt-5">
            <h5 className="Au-hero-h2 fw-medium text-start text-white mt-5 ">
              SAUDI SOCIETY FOR
            </h5>
            <h3 className="Au-hero-h1 me-5 fw-bold text-start text-white">
              Health Information Management
            </h3>
            <p className="Au-hero-para fw-bold text-start text-white">
              THE RITZ-CARLTON, RIYADH, FEBRUARY 19 - 20, 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Au_Hero;
