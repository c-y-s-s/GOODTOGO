import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ImFacebook2 } from "react-icons/im";
import { ReactComponent as Logo } from "../../images/logo-face.svg";
import "./Storecheck.scss"
import axios from "axios";
import { API_URL } from "../../utils/config";
import { ERR_MSG } from "../../utils/error";


const Storecheck = () => {
  const [member, setMember] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "申請人姓名",
    phone: "",


  });

  // -------- checkbox 同意條款 --------
  const [agree, setAgree] = useState(true);
  // -------- 處理表格改變 --------
  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };
  // -------- 表單送出 --------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.post(`${API_URL}/auth/register`, member);
      console.log(response.data);
    } catch (e) {
      // console.error("錯誤:", e.response.data);
      console.error(ERR_MSG[e.response.data].code);
    }
  };

  return (
    <div className="container-fluid storereg-con">
      <div className="row">
        <div className="col-lg-4 m-0 p-0">
          <Logo className="" />
        </div>
        <div className="col-lg-7 m-0 p-0">
          <div className="content text-center row justify-content-between gy-0">
            <div className="col-lg-1  m-0 p-0"></div>
            <div className="col-lg-10 mt-3 mb-3 p-0 ">
              <div className="col-lg-12 row m-0 p-0 gy-3 flex-column ">
                <div className="h6">商家註冊</div>
                {/* -------- 註冊資料開始 -------- */}
                <div className="label-group d-flex text-start flex-column justify-content-evenly gy-2">
                  <form
                    className="d-flex row"
                    onSubmit={handleSubmit}
                  >
                    {/* -------- 姓名 -------- */}
                    <div className="col-lg-6">
                      <label
                        htmlFor="name"
                        className="col-form-label input-label-title text-green p-0"
                      >
                        姓名
                      </label>
                      <div class="form-floating mb-3">
                        <input
                          name="name"
                          type="text"
                          className="form-control custom-input "
                          id="name"
                          placeholder="name"
                          value={member.name}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="name"
                          className="floating-label text-grey"
                        >
                          請填入中文 / 英文姓名
                        </label>
                      </div>
                    </div>
                    {/* -------- 店家LOGO上傳 -------- */}
                    <div className="col-lg-6">
                      <label
                        htmlFor="formFile"
                        className="col-form-label input-label-title text-green p-0"
                      >
                        店家LOGO上傳
                      </label>
                      <div className="form-floating mb-3">
                        <input
                          name="storeLogo"
                          type="file"
                          className="form-control custom-input"
                          id="storeLogo"
                          placeholder=".jpg/.jpeg/.png 上限 2MB"

                        />
                      </div>
                    </div>
                    {/* -------- 電子郵件 -------- */}
                    <div className="col-lg-6">
                      <label
                        htmlFor="email"
                        className="col-form-label input-label-title text-green p-0"
                      >
                        電子郵件
                      </label>
                      <div class="form-floating mb-3">
                        <input
                          name="email"
                          value={member.email}
                          type="email"
                          className="form-control custom-input"
                          id="email"
                          placeholder="email"
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="email"
                          className="floating-label  text-grey"
                        >
                          請填入電子信箱
                        </label>
                      </div>
                    </div>
                    {/* -------- 營業登記證上傳 -------- */}

                    <div className="col-lg-6">
                      <label
                        htmlFor="formFile"
                        className="col-form-label input-label-title text-green p-0"
                      >
                        營業登記證上傳
                      </label>
                      <div className="form-floating mb-3">
                        <input
                          name="storeLicence"
                          type="file"
                          className="form-control custom-input"
                          id="storeLogo"
                          placeholder=".jpg/.jpeg/.png 上限 2MB"

                        />
                      </div>
                    </div>
                    {/* -------- 密碼 -------- */}
                    <div className="col-lg-6"><label
                      htmlFor="password"
                      className="col-form-label input-label-title  text-green p-0"
                    >
                      密碼
                    </label>
                      <div class="form-floating mb-3">
                        <input
                          name="password"
                          type="password"
                          className="form-control custom-input"
                          id="password"
                          placeholder="密碼"
                          value={member.password}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="password"
                          className="floating-label text-grey"
                        >
                          請填入密碼
                        </label>
                      </div>
                    </div>
                    {/* ------- 營業星期 (複選) -------- */}
                    <div className="col-lg-6"><label
                      htmlFor="opendayCheck"
                      className="col-form-label input-label-title text-green p-0"
                    >
                      營業星期(複選)
                    </label>
                      <div className="d-block mb-3 me-0 opendayCheck">
                        <div className="form-check row align-items-center">
                          <div className="col">
                            <input
                              name="Mon"
                              type="checkbox"
                              className="form-check-input"
                              id="mon"
                              placeholder=""
                              value={member.openDays}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col">
                            <input
                              name="Tue"
                              type="checkbox"
                              className="form-check-input"
                              id="tue"
                              placeholder=""
                              value={member.openDays}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col">
                            <input
                              name="Wed"
                              type="checkbox"
                              className="form-check-input"
                              id="wed"
                              placeholder=""
                              value={member.openDays}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col">
                            <input
                              name="Thu"
                              type="checkbox"
                              className="form-check-input"
                              id="thu"
                              placeholder=""
                              value={member.openDays}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col">
                            <input
                              name="Fri"
                              type="checkbox"
                              className="form-check-input"
                              id="fri"
                              placeholder=""
                              value={member.openDays}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col">
                            <input
                              name="Sat"
                              type="checkbox"
                              className="form-check-input"
                              id="sat"
                              placeholder=""
                              value={member.openDays}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col">
                            <input
                              name="Sun"
                              type="checkbox"
                              className="form-check-input"
                              id="sun"
                              placeholder=""
                              value={member.openDays}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>


                    {/* -------- 密碼確認 -------- */}
                    <div className="col-lg-6">
                      <label
                        htmlFor="confirmPassword"
                        className="col-form-label input-label-title text-green p-0"
                      >
                        密碼確認
                      </label>
                      <div class="form-floating mb-3">
                        <input
                          name="confirmPassword"
                          type="password"
                          className="form-control custom-input"
                          id="confirm-password"
                          placeholder="請再次輸入密碼"
                          value={member.confirmPassword}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="confirmpassword"
                          className="floating-label text-grey"
                        >
                          請再次輸入密碼
                        </label>
                      </div>
                    </div>
                    {/* -------- 手機-------- */}
                    <div className="col-lg-6">
                      <label
                        htmlFor="phone"
                        className="col-form-label input-label-title  text-green p-0"
                      >
                        手機
                      </label>
                      <div class="form-floating mb-3">
                        <input
                          name="phone"
                          type="phone"
                          className="form-control custom-input"
                          id="floatingInput"
                          placeholder="name@example.com"
                          value={member.phone}
                          maxLength="10"
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="phone"
                          className="floating-label  text-grey"
                        >
                          09XXXXXXXX
                        </label>
                      </div>
                    </div>
                    {/* -------- 使用者同意條款 -------- */}
                    <div className="col-lg-12 align-items-center text-grey input-label-title ">
                      <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => {
                          setAgree(e.target.checked);
                        }}
                      />
                      我已閱讀並同意
                      <Link to="" className="no-link text-yellow">
                        用戶權益和隱私條款
                      </Link>
                      {/* -------- 縣市 -------- */}
                      {/* <div class="col-lg-6">
                          <select
                            className="form-select custom-input"
                            aria-label="Default select example"
                          >
                            <option selected className="">
                              請選擇縣市
                            </option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div> */}
                      {/* -------- 區域 -------- */}
                      {/* <div class=" col-lg-6">
                          <select
                            className="form-select custom-input"
                            aria-label="Floating label select example"
                          >
                            <option selected>請選擇區域 </option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div> */}
                    </div>
                    {/* TODO:當同意條款為true時以下按鈕才生效 */}
                    <button
                      type="submit"
                      className="btn btn-register col-lg-12 mb-2"
                      disabled={!agree}
                    >
                      註冊
                    </button>
                  </form>
                  {/* -------- 註冊資料結束 -------- */}
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <hr className="col-lg-5" />或<hr className="col-lg-5" />
                  </div>
                  {/* -------- Facebook 登入 -------- */}
                  <button
                    className="col-lg-12 btn-fb-login btn d-flex align-items-center text-center justify-content-center m-0 mb-3"
                  >
                    <ImFacebook2 className="big-icon col-lg-2" />
                    使用 Facebook 註冊<div className="col-lg-2"> </div>
                  </button>

                  <p className=" input-label-title text-grey text-center m-0 mb-3">
                    已經註冊過您的店舖 ,
                    <Link to="/StoreLogin" className="no-link">
                      <span className=" text-yellow ">由這裡立即登入</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-1"></div>
          </div>

          <div className="col-lg-1"></div>
        </div>
      </div>
      <div className="col-lg-1 m-0 p-0"></div>
    </div>

  );
};

export default Storecheck;
