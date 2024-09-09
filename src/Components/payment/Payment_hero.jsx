import React from "react";
import "./Payment_hero.css";
import conimg from '../../assets/bgpay.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import { useState } from 'react'

function Payment_hero() {
  return (
    <div className="payment-hero-con">
      <div className="container-fluid payment-hero-container mx-auto">
        <img
          className="payment-background_image"
          src={conimg}
          alt="background_picture"
        />
        <div className="payment-overlay"></div>
        <div className="row mx-auto ms-5">
          <div className="col-md-6 mt-3">
            <div className="payment-backg_content p-5 mt-5">
              <p className="payment-hero-p1 fw-normal lh-base text-white text-md-start text-center mt-5">
                Health Information Management
              </p>
              <h3 className="payment-hero-h1 me-md-5 pe-md-5 text-md-start text-center fw-bold">
                Membership Checkout
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment_hero;
