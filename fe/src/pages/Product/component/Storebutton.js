import React from "react";
import { Link } from "react-router-dom";
const StoreButton = ({ storeId }) => {
  return (
    <div>
      <div className="product-button text-center">
        <Link to={"/store/" + storeId} className="btn" type="button">
          餐點
        </Link>
        <Link to={"/productcomment/" + storeId} className="btn" type="button">
          評論
        </Link>
      </div>
    </div>
  );
};

export default StoreButton;
