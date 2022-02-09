import React from "react";
import { Link } from "react-router-dom";
const Storebutton = () => {
  return (
    <div>
      <div class="product-button text-center">
        <Link to="/store/1" className="btn" type="button">
          餐點
        </Link>
        <Link to="/productcomment" className="btn" type="button">
          評論
        </Link>
      </div>
    </div>
  );
};

export default Storebutton;
