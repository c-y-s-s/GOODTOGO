import React from "react";

const Card = () => {
  return (
    <div>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <div className="card mb-3 border-top-0 border-start-0 border-end-0">
            <img
              src={require(`../images/LatestNews.png`)}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">2021.12.15</h5>
              <p className="card-text">
                迎接虎年，謝謝 2021
                年各位的支持，特別感恩回饋，發送喜迎新年優惠券，讓大家新年呷虎飽飽！使用期限至
                2022.03.31 止，數量有限，送完為止～
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
