import React from "react";

const Rating = ({
  setRatingHeartOn,
  setKeyword,
  setOpState,
  setSelectedCat,
  setRatingCommentOn,
}) => {
  return (
    <>
      <div className="justify-content-lg-between col-lg-3 col-12 mt-3 d-flex btn-rating-group justify-content-evenly">
        <button
          className="btn btn-round"
          onClick={() => {
            setRatingCommentOn(true);
            setRatingHeartOn(false);
            console.log("heart");
            setKeyword("");
            setOpState("");
            setSelectedCat("");
          }}
        >
          最多評價
        </button>
        <button
          className="btn btn-round"
          onClick={() => {
            setRatingHeartOn(true);
            setRatingCommentOn(false);
            setKeyword("");
            setOpState("");
            setSelectedCat("");
          }}
        >
          最多收藏
        </button>
      </div>
    </>
  );
};

export default Rating;
