import React from "react";

const Table = () => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-bold">
                姓名
              </label>
              <input
                className="form-control"
                id="name"
                placeholder="請輸入中文 / 英文姓名"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold">
                電子信箱
              </label>
              <input
                className="form-control"
                id="email"
                placeholder="請輸入電子信箱"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold">
                密碼
              </label>
              <input
                className="form-control"
                id="password"
                placeholder="請設定密碼"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="passwordConfirmation"
                className="form-label fw-bold"
              >
                密碼確認
              </label>
              <div className="input-group has-validation">
                <input
                  type="text"
                  className="form-control"
                  id="passwordConfirmation"
                  aria-describedby="inputGroupPrepend"
                  placeholder="請再次輸入密碼確認"
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="storeName" className="form-label fw-bold">
                營業店家名稱
              </label>
              <div className="input-group has-validation">
                <input
                  type="text"
                  className="form-control"
                  id="storeName"
                  aria-describedby="inputGroupPrepend"
                  placeholder="請輸入營業店家名稱"
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="storePhoneNumber" className="form-label fw-bold">
                營業店家電話
              </label>
              <div className="input-group has-validation">
                <input
                  type="text"
                  className="form-control"
                  id="storePhoneNumber"
                  aria-describedby="inputGroupPrepend"
                  placeholder="請輸入營業店家電話"
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="storeAddress" className="form-label fw-bold">
                營業店家地址
              </label>
              <div className="input-group has-validation ">
                <div className="input-group mb-3">
                  <select
                    className="form-select mx-1 text-muted"
                    aria-label="Default select example"
                  >
                    <option selected>請選擇縣市</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <select
                    className="form-select mx-1 text-muted"
                    aria-label="Default select example"
                  >
                    <option selected>請選擇區域</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="storeAddress"
                  aria-describedby="inputGroupPrepend"
                  placeholder="請輸入詳細地址"
                  required
                />
              </div>
            </div>
          </div>
          <div className="col-6 d-flex justify-content-center">
            <div className="mb-3">
              <label
                htmlFor="formFile"
                className="form-label d-flex justify-content-center fw-bold"
              >
                商品圖片
              </label>
              <input
                className="mt-3 form-control"
                type="file"
                id="formFile"
                data-buttonText="Your label here."
              />

            </div>
          </div>
        </div>
        <div className="row  mt-3">
          <div className="col-3"></div>
          <button type="button" className="col-2 btn btn-light btn-lg ">
            取消
          </button>
          <div className="col-1"></div>
          <div className="col-1"></div>
          <button type="submit" className="col-2 btn btn-warning btn-lg ">
            上架
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
