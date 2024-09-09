import React, { useContext } from "react";
import { Button } from "../Button/Button";
import reg from "../../assets/reg.png";
import "./Registration.css";
import { Link } from "react-router-dom";
import LangContext from "../../Context/LangProvider";

function Registration() {
  const { english, setenglish } = useContext(LangContext);
  return (
    <div>
      <div className="container-fluid reg-container text-white justify-content-center">
        * <img src={reg} alt="registration" className="registration-img" />
        <div className="reg-sec-overlay "></div>
        <div className="row justify-content-center reg-rec-backg">
          {english ? (
            <>
              <div className="col-md-7 text-center mb-5 mt-5">
                <h3 className="header-registration fw-bold">
                  Do you want to registration for association membership
                </h3>
                <p className="header2-registration">
                  Registration process with check-in for payment. Several
                  different activities are offered that fall under the umbrella
                  of the association, including conferences, workshops, training
                  courses, and many other activities.
                </p>
                <div className="">
                  <Link to={"/membership"}>
                    <Button className="btns" buttonStyle="btn--white">
                      Registeration Now
                    </Button>
                  </Link>
                  <Link to={"/about-us"}>
                    <Button className="btns" buttonStyle="btn--outline">
                      Learn more
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                className="col-md-7 text-center mb-5 mt-5"
                style={{ textAlign: "right", direction: "rtl" }}
              >
                <h3 className="header-registration fw-bold">
                  هل تريد التسجيل لعضوية الجمعية
                </h3>
                <p className="header2-registration fs-6">
                  عملية التسجيل مع تسجيل الوصول للدفع. وتقدم العديد من الأنشطة
                  المختلفة التي تندرج تحت مظلة الجمعية، بما في ذلك المؤتمرات
                  وورش العمل والدورات التدريبية والعديد من الأنشطة الأخرى.
                </p>
                <div className="">
                  <Link to={"/membership"}>
                    <Button className="btns" buttonStyle="btn--white">
                      التسجيل الآن
                    </Button>
                  </Link>
                  <Link to={"/about-us"} className=" mx-md-3">
                    <Button className="btns" buttonStyle="btn--outline">
                      يتعلم أكثر{" "}
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Registration;
