import React from 'react';

const StoreProductsCommit = () => {
  return (
    <div>
      <div className="container products-commit w-75 ">
        <div className="text-end">共 24 則留言</div>

        <div className="col-12 mt-5 product-commit">
          <div className="d-flex justify-content-between ">
            <div className="">
              <div className="d-flex user-data ">
                <div className="user-photo">
                  <img
                    src={require(`../../../images/store_img/01.jpg`)}
                    alt=""
                  />
                </div>
                <div className="ms-4">
                  <div className="pt-1">王小明</div>
                  <div className="d-flex pt-2">
                    <div className="">星星</div>
                    <div className="ps-3">照燒雞腿</div>
                  </div>
                  <p className="pt-2 mb-0">
                    好好吃喔!!好好吃喔!!好好吃喔!!好好吃喔!!好好吃喔!!好好吃喔!!
                    好好吃喔!!好好吃喔!!好好吃喔!!
                  </p>
                </div>
              </div>
            </div>
            <div className="text-end">
              <div className="d-flex">
                <div>
                  <div>2021-12-12 10 : 10 PM</div>
                  <img
                    className="product-photo mt-2"
                    src={require(`../../../images/store_img/01.jpg`)}
                    alt=""
                  />
                </div>

                <div className="ps-3 ">
                  <div >
                    <button
                      class="btn"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      &#x22EE;
                    </button>
                    <ul class="dropdown-menu">
                      <a href="">檢舉</a>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreProductsCommit;
