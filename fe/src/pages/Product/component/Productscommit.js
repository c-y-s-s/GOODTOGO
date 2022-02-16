import { FiMoreVertical } from "react-icons/fi";
import React from "react";
// -------- 商品評論 --------
const StoreProductsCommit = () => {
  return (
    <div>
      <div className="container products-commit">
        <div className="text-end products-commit-total">共 24 則留言</div>
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
                  <div className="pt-2 user-data-name">王小明</div>
                  <div className="d-flex align-items-center">
                    <div className="user-data-commit-time">
                      2021-12-12 10 : 10 PM
                    </div>
                    <div className="">
                      <button
                        class=" user-data-report"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <FiMoreVertical />
                      </button>
                      <ul class="dropdown-menu">
                        <a href="">檢舉</a>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between  product-data">
                  <div>
                    <div className="d-flex ">
                      <div className="">星星</div>
                      <div className="ps-3 product-data-name">照燒雞腿</div>
                    </div>
                    <p className="pt-2 mb-0 user-commit">
                      踏碼的這個飯會不會好吃的太誇張?
                    </p>
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
      </div>
    </div>
  );
};

export default StoreProductsCommit;
