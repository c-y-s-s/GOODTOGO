import React from "react";

// Sort icon
import { BsSortUp } from "react-icons/bs";

const NewProduct = () => {
  return (
    <>
      <div className="store-bg-sortAndAdd">
        <div className="store-bg-sort">
          <BsSortUp />
          排序
        </div>
        <div>
          <button>新增商品</button>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
