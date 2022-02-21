import React from "react";

const Card = () => {
  return (
    <div>
      <div className="row">
        <div className="col-4">
          <img
            src={require(`../images/coupon5.png`)}
            alt="..."
            className="card-images"
          />
        </div>
        <div className="col-4">
        <img
            src={require(`../images/coupon5.png`)}
            alt="..."
            className="card-images"
          />
        </div>
        <div className="col-4">
        <img
            src={require(`../images/coupon5.png`)}
            alt="..."
            className="card-images"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
