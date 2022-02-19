import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ImFacebook2 } from "react-icons/im";
import { ReactComponent as Logo } from "../../images/logo-face.svg";
import "./Storecheck.scss"
import axios from "axios";
import TWzipcode from "react-twzipcode";
import TwCitySelector from "tw-city-selector";
import { API_URL } from "../../utils/config";
import { ERR_MSG } from "../../utils/error";

new TwCitySelector({
  el: ".city-selector-standard-words",
  elCounty: ".county", // 在 el 裡查找 element
  elDistrict: ".district", // 在 el 裡查找 element
  elZipcode: ".zipcode", // 在 el 裡查找 element
  standardWords: true, // 使用正體字 臺
});

const Storecheck = () => {
  const [member, setMember] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
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
            <div className="col-lg-1 m-0 p-0"></div>
            <div className="col-lg-10 mt-3 mb-3 p-0 ">
              <div className="col-lg-12 row m-0 p-0 gy-3 flex-column ">
                <div className="h6">商家註冊
                </div>
                {/* -------- 註冊資料開始 -------- */}
                <div className="label-group d-flex text-start flex-column justify-content-evenly gy-2">
                  <form className="d-flex row"
                    onSubmit={handleSubmit}>
                    <div className="d-block d-sm-block d-md-block d-lg-none d-xl-none d-xxl-none col-1"></div>
                    <div className="col-lg-6 col-md-10 col-sm-10 col-10">
                      {/* -------- 姓名 -------- */}
                      <label
                        htmlFor="name"
                        className="col-form-label input-label-title text-green p-0"
                      >
                        姓名
                      </label>
                      <div className="form-floating mb-3">
                        <input
                          name="name"
                          value={member.name}
                          type="text"
                          className="form-control custom-input"
                          id="name"
                          placeholder="請填入中文 / 英文姓名"
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="name"
                          className="floating-label text-grey"
                        >
                          請填入中文 / 英文姓名
                        </label>
                      </div>
                      {/* -------- 電子郵件 -------- */}
                      <label
                        htmlFor="email"
                        className="col-form-label input-label-title text-green p-0"
                      >
                        電子郵件
                      </label>
                      <div className="form-floating mb-3">
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
                      {/* -------- 密碼 -------- */}
                      <label
                        htmlFor="password"
                        className="col-form-label input-label-title  text-green p-0"
                      >
                        密碼
                      </label>
                      <div className="form-floating mb-3">
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
                          請設定密碼(須包含最少一個大、小寫英文字母與數字)
                        </label>
                      </div>
                      
                      {/* -------- 密碼確認 -------- */}
                      <label
                        htmlFor="confirmpassword"
                        className="col-form-label input-label-title text-green p-0"
                      >
                        密碼確認
                      </label>
                      <div className="form-floating mb-3">
                        <input
                          name="confirmPassword"
                          type="password"
                          className="form-control custom-input"
                          id="confirmpassword"
                          placeholder="請再次輸入密碼"
                          value={member.confirmPassword}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="confirmpassword"
                          className="floating-label text-grey"
                        >
                          請再次輸入密碼確認
                        </label>
                      </div>
                        {/* -------- 地址資料 -------- */}
                        <div className="row">
                        <div className="col-6">
                          <select
                            className="form-select custom-input"
                          >
                            <option className="">
                              請選擇縣市
                            </option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                          </div>
                         {/* -------- 區域 -------- */}
                          <div className="col-6">
                          <select
                            className="form-select custom-input"
                          >
                            <option >請選擇區域 </option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                          </div>
                          
                          <TWzipcode css={["col-6 form-select custom-input county-sel", "col-6 form-select custom-input district-sel", "d-none zipcode"]}
                          handleChangeCoounty={member.county}
                          handleChangeDistrict={member.district}
                          onChange={handleChange}
                          />
                          <div className="city-selector-standard-words d-flex flex-grow-1">
                          <select className="county form-select me-3"></select>
                          <select 
                          className="district form-select"></select>
                          </div>
                          </div>
                      {/* -------- 營業店家名稱 -------- */}
                      <label
                        htmlFor="storename"
                        className="col-form-label input-label-title  text-green p-0"
                      >
                        營業店家名稱
                      </label>
                      <div className="form-floating mb-3">
                        <input
                          name="storename"
                          type="text"
                          className="form-control custom-input"
                          id="storename"
                          placeholder="營業店家名稱"
                          value={member.storename}
                          maxLength="30"
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="phone"
                          className="floating-label  text-grey"
                        >
                          請輸入營業商店名稱
                        </label>
                      </div>
                      {/* -------- 營業店家電話 -------- */}
                      <label
                        htmlFor="storephone"
                        className="col-form-label input-label-title  text-green p-0"
                      >
                        營業店家電話
                      </label>
                      <div className="form-floating mb-3">
                        <input
                          name="storephone"
                          type="phone"
                          className="form-control custom-input"
                          id="storephone"
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
                      {/* -------- 使用者同意條款 -------- */}

                    </div>
                    <div className="d-block d-sm-block d-md-block d-lg-none d-xl-none d-xxl-none col-1"></div>
                    <div className="d-block d-sm-block d-md-block d-lg-none d-xl-none d-xxl-none col-1"></div>
                    <div className="col-lg-6 col-md-10 col-sm-10 col-10">
                      {/* -------- 店家LOGO上傳 -------- */}
                      {/* -------- 營業登記證上傳 -------- */}
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

                      {/* ------- 營業星期 (複選) -------- */}
                      <label
                        htmlFor="opendayCheck"
                        className="col-form-label input-label-title text-green p-0"
                      >
                        營業星期(複選)
                      </label>
                      <div className="d-block mb-3 me-0 opendayCheck">
                        <div className="row mt-3 mb-3 ms-1 me-1">
                          <input type="checkbox" id="mon" value="一" className="col dayCheck"></input>
                          <input type="checkbox" id="tue" value="三" className="col dayCheck"></input>
                          <input type="checkbox" id="wed" value="二" className="col dayCheck"></input>
                          <input type="checkbox" id="thu" value="四" className="col dayCheck"></input>
                          <input type="checkbox" id="fri" value="五" className="col dayCheck"></input>
                          <input type="checkbox" id="sat" value="六" className="col dayCheck"></input>
                          <input type="checkbox" id="sun" value="日" className="col dayCheck"></input>
                        </div>
                        <div className="row input-label-title text-green text-center mt-3 mb-3 ms-1 me-1">
                          <label htmlFor="mon" className="col">一</label>
                          <label htmlFor="tue" className="col">二</label>
                          <label htmlFor="wed" className="col">三</label>
                          <label htmlFor="thu" className="col">四</label>
                          <label htmlFor="fri" className="col">五</label>
                          <label htmlFor="sat" className="col">六</label>
                          <label htmlFor="sun" className="col">七</label>
                        </div>
                      </div>
                      {/* -------- 註冊同意按鈕開始 -------- */}
                      <div className="align-items-center text-grey input-label-title">
                        <input
                          type="checkbox"
                          checked={agree}
                          onChange={(e) => {
                            setAgree(e.target.checked);
                          }}
                        />
                        我已閱讀並同意
                        <Link to="" className="no-link text-yellow" >
                          用戶權益和隱私條款
                        </Link>
                      </div>
                      {/* TODO:當同意條款為true時以下按鈕才生效 */}
                      <button
                        type="submit"
                        className="btn btn-register col-lg-12 mb-2"
                        disabled={!agree}
                      >
                        註冊
                      </button>
                      {/* -------- 註冊同意按鈕結束 -------- */}
                    </div>

                    <div className="d-block d-sm-block d-md-block d-lg-none d-xl-none d-xxl-none col-1"></div>

                  </form>
                  {/* -------- 註冊資料結束 -------- */}
                  <div className="d-flex align-items-center justify-content-between mb-2" >
                    <hr className="col-lg-5" />或 <hr className="col-lg-5" />
                  </div>
                  {/* -------- Facebook 登入 -------- */}
                  <button
                    className="col-lg-12 btn-fb-login btn d-flex align-items-center text-center justify-content-center m-0 mb-3"
                  >
                    <ImFacebook2 className="big-icon col-lg-2" />
                    使用 Facebook 註冊
                    <div className="col-lg-2"> </div>
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
