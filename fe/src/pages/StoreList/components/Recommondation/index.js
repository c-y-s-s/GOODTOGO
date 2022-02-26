import React from "react";
import { ReactComponent as Star } from "../../images/star.svg";
import RecomCard from "./RecomCard";

const Recomm = () => {
  return (
    <>
      <div className="rec-content d-grid">
        <div className="header text-center">
          <div className="title-box">
            <Star />
            <span className="ps-3 pe-3 text-dark-grey input-label-title">
              限時推薦
            </span>
            <Star />
          </div>
        </div>
        <div className="rec-cards-holder d-flex">
          <RecomCard />
        </div>

        <div className="bottom-area"></div>
      </div>
    </>
  );
};

export default Recomm;
