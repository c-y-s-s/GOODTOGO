import { FiMoreVertical } from "react-icons/fi";
import React from "react";
// -------- 商品評論 --------
const StoreProductsCommit = ({ productsComment }) => {
  return (
    <div>
      <div className="container products-commit">
        <div className="text-end products-commit-total">
          共 {productsComment.length} 則留言
        </div>
        {productsComment.map((item)=>{
          return (
            <div className="col-12 mt-3 product-commit">
              <div className="d-flex justify-content-between ">
                <div className="d-flex user-data w-100">
                  <div>
                    <div className="user-photo mt-3">
                      <img
                        className="cover-photo"
                        src={require(`../../../images/store_img/01.jpg`)}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className="ms-4 w-100">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                      <div className="pt-2 user-data-name">{item.name}</div>
                      <div className="d-flex align-items-center">
                        <div className="user-data-commit-time">
                          {/* 2021-12-12 10 : 10 PM */}
                          {item.create_time}
                        </div>
                        <div className="">
                          <button
                            className=" user-data-report"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <FiMoreVertical />
                          </button>
                          <ul className="dropdown-menu">
                            <a href="">檢舉</a>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between  product-data">
                      <div>
                        <div className="d-flex ">
                          <div className="">星星</div>
                          <div className="ps-3 product-data-name">
                            {item.products}
                          </div>
                        </div>
                        <p className="pt-2 mb-0 user-commit">{item.comment}</p>
                      </div>
                      <img
                        className="product-photo "
                        src={require(`../../../images/store_img/01.jpg`)}
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  <div className="d-flex">
                    <div className="d-flex"></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
   
      </div>
    </div>
  );
};

export default StoreProductsCommit;
