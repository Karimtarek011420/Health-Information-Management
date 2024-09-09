import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./card.css";
import { Button } from "../../Button/Button";
import check from "../../../assets/check.svg";
import cube from "../../../assets/cube2.svg";
import Mem_price_modal from "../../../Components/Mem_price_modal.jsx";
import LangContext from "../../../Context/LangProvider.jsx";

function Card({ item }) {
  const list = item.list_en || [];
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { english, setenglish } = useContext(LangContext);

  return (
    <>
      <div>
        <div className="card membership-card">
          {english ? (
            <>
              <div className="card-body">
                <div className="mem_active">
                  <p className="mem-card-name mt-2 lh-base fw-medium">
                    ⦁ {item.name_en}
                  </p>
                </div>
                <h4 className="mem_price lh-sm">{item.amount} S.R</h4>
                <hr className="w-75" />

                <p className="mem-card-title">Including:</p>
                <ul className="mem-list lh-base p-0">
                  {list?.map((listitem, index) => (
                    <li key={index} className="d-flex">
                      <img src={check} alt="Bullet point" className="me-2" />
                      <p className="mb-2">{listitem}</p>
                    </li>
                  ))}
                </ul>
                <Button
                  className="btns"
                  buttonStyle="btn--white2"
                  onClick={handleOpen}
                >
                  Register Now
                </Button>
              </div>
            </>
          ) : (
            <>
              <div
                className="card-body"
                style={{ textAlign: "right", direction: "rtl" }}
              >
                <div className="mem_active">
                  <p className="mem-card-name mt-2 lh-base fw-medium text-end">
                    ⦁ {item.name_en}
                  </p>
                </div>
                <h4 className="mem_price lh-sm text-end">{item.amount} S.R</h4>
                <hr className="w-75" />

                <p className="mem-card-title text-end"> مشتمل :</p>
                <ul className="mem-list lh-base p-0">
                  {list?.map((listitem, index) => (
                    <li key={index} className="d-flex">
                      <img src={check} alt="Bullet point" className="me-2" />
                      <p className="mb-2 text-end">{listitem}</p>
                    </li>
                  ))}
                </ul>
                <Button
                  className="btns"
                  buttonStyle="btn--white2"
                  onClick={handleOpen}
                >
                  سجل الآن{" "}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <Mem_price_modal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        title={item.name_en}
        price={item.amount}
        item={item}
      />
    </>
  );
}

export default Card;
