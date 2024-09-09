import React, { useContext } from "react";
import "./Section2.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Section3 from "./Section3";
import LangContext from "../../Context/LangProvider";

function Section2() {
  const { english, setenglish } = useContext(LangContext);
  return (
    <>
      <div className="second_half mt-5">
        <div className="col-sm-12 justify-content-center">
          {english ? (
            <>
              <div className="parent text-center p-0">
                <h2 className="header_21 fw-bold lh-1 ">
                  About Saudi Society for
                </h2>
                <h2 className="header_22 fw-bold lh-1">
                  {" "}
                  Health Information Management
                </h2>
                <p className="paragraph_11 fw-medium lh-1 p-2 mb-5">
                  Lorem ipsum dolor sit amet consectetur adipiscing eli mattis
                  sit phasellus mollis sit aliquam sit nullam.
                </p>
              </div>
            </>
          ) : (
            <>
              <div
                className="parent text-center p-0"
                style={{ textAlign: "right", direction: "rtl" }}
              >
                <h2 className="header_21 fw-bold lh-1 ">عن الجمعية السعودية</h2>
                <h2 className="header_22 fw-bold lh-1">
                  {" "}
                  لادارة المعلومات الصحية
                </h2>
                <p className="paragraph_11 fw-medium lh-1 p-1 mb-5 fs-6">
                  Lorem ipsum dolor sit amet consectetur adipiscing eli mattis
                  sit phasellus mollis sit aliquam sit nullam.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      <Section3 />
    </>
  );
}

export default Section2;
