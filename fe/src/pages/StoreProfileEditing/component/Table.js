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
                    defaultValue=""
                  >
                    <option value="">請選擇縣市</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <select
                    className="form-select mx-1 text-muted"
                    aria-label="Default select example"
                    defaultValue=""
                  >
                    <option value="">請選擇區域</option>
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
          <div className="col-6">
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <label htmlFor="logoImage" className="form-label fw-bold">
                  店家 Logo 圖像
                </label>
                <label className="text-danger">
                  限用.jpg/.jpeg/.png檔 上限 2MB
                </label>
              </div>
              <input
                className=" form-control"
                type="file"
                id="logoImage"
                accept=".png, .jpg, .jpeg"
              />
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <label htmlFor="logoImage" className="form-label fw-bold">
                  店家營業登記證
                </label>
                <label className="text-danger">
                  限用.jpg/.jpeg/.png檔 上限 2MB
                </label>
              </div>
              <input
                className=" form-control"
                type="file"
                id="businessLicense"
                accept=".png, .jpg, .jpeg"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-bold">
                營業星期 (複選)
              </label>
              <div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox1"
                    value="option1"
                  />
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox2"
                    value="option2"
                  />
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox3"
                    value="option3"
                  />
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox3"
                    value="option3"
                  />
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox3"
                    value="option3"
                  />
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox3"
                    value="option3"
                  />
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox3"
                    value="option3"
                  />
                </div>
              </div>
              <div>
                <label className="form-check-label  form-check-inline" htmlFor="inlineCheckbox1">
                  一
                </label>
                <label className="form-check-label  form-check-inline" htmlFor="inlineCheckbox2">
                  二
                </label>
                <label className="form-check-label  form-check-inline" htmlFor="inlineCheckbox3">
                  三
                </label>
                <label className="form-check-label  form-check-inline" htmlFor="inlineCheckbox4">
                  四
                </label>
                <label className="form-check-label  form-check-inline" htmlFor="inlineCheckbox5">
                  五
                </label>
                <label className="form-check-label  form-check-inline" htmlFor="inlineCheckbox6">
                  六
                </label>
                <label className="form-check-label  form-check-inline" htmlFor="inlineCheckbox7">
                  日
                </label>
              </div>
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
