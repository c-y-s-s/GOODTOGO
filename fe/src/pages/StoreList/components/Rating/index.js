import React from "react";

const Rating = () => {
  return (
    <>
      <div className="justify-content-lg-between col-lg-3 col-12 mt-3 d-flex btn-rating-group justify-content-evenly">
        <button className="btn btn-round">最多評價</button>
        <button className="btn btn-round">最多收藏</button>
      </div>
    </>
  );
};

export default Rating;
