import React from "react";
import { ReactComponent as Star } from "../../images/star.svg";
import RecomCard from "./RecomCard";

const Recomm = (props) => {
  const { totalHeart, productAmount } = props;
  return (
    <>
      <div className="rec-content">
        <div className="header text-center">
          <div className="title-box mt-5 mb-5 m-auto">
            <Star />
            <span className="ps-3 pe-3 text-dark-grey input-label-title">
              限時推薦
            </span>
            <Star />
          </div>
        </div>
        <div className="rec-cards-holder col-10 d-flex align-items-center m-auto">
          <RecomCard totalHeart={totalHeart} productAmount={productAmount} />
        </div>

        <div className="bottom-area"></div>
      </div>
    </>
  );
};

export default Recomm;
