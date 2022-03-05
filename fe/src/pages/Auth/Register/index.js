import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//-------- 引用icon --------
import { ImFacebook2 } from "react-icons/im";
import { FiEye, FiEyeOff } from "react-icons/fi";

//後端套件
import axios from "axios";
import { API_URL } from "../../../utils/config";
// import useAuth from "../../src/hooks/authForm.js";
import { ERR_MSG } from "../../../utils/error";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const swal = Swal.mixin({
    customClass: {
      confirmButton: " btn cancelbtn ms-2 me-2",
    },
    buttonsStyling: false,
  });
  const registrationSuccessAlert = () => {
    return (
      <>
        {swal
          .fire({
            text: "註冊成功",
            icon: "success",
            showCancelButton: false,
            confirmButtonText: "立即登入",
          })
          .then((result) => {
            if (result.isConfirmed) {
              navigate("/auth/login");
            }
          })}
      </>
    );
  };
  //預設個欄位的值為空（開發中所以有先給值）
  const [user, setUser] = useState({
    email: "song@test.com",
    password: "song12345",
    confirmPassword: "song12345",
    name: "song",
    phone: "0911122233",
  });
  //制定錯誤訊息，預設為沒有錯誤訊息
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  // -------- 切換看密碼開關 --------
  const [eye, setEye] = useState({
    passwordEye: false,
    confirmPasswordEye: false,
  });
  // --------切換顯示/隱藏密碼 --------
  //眼睛for密碼
  function passwordShow() {
    setEye(
      eye.passwordEye
        ? { ...eye, passwordEye: false }
        : { ...eye, passwordEye: true }
    );
  }
  //眼睛for確認密碼
  function confirmPasswordShow() {
    setEye(
      eye.confirmPasswordEye
        ? { ...eye, confirmPasswordEye: false }
        : { ...eye, confirmPasswordEye: true }
    );
  }
  // -------- checkbox 同意條款 --------
  const [agree, setAgree] = useState(true);
  // -------- 處理表格改變 --------
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  // -------- 檢查表單有不合法的訊息時會呼叫 --------
  const handleFormInvalid = (e) => {
    // 阻擋form的預設送出行為(錯誤泡泡訊息和method="get")
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;

    // -------- 自訂個欄位錯誤訊息 --------
    //姓名欄位錯誤
    if (name === "name") {
      const updatedFieldErrors = {
        ...fieldErrors,
        name: "您希望我們怎麼稱呼您？",
      };
      setFieldErrors(updatedFieldErrors);
      //email欄位錯誤
    } else if (name === "email") {
      const updatedFieldErrors = {
        ...fieldErrors,
        email: "email格式輸入錯誤",
      };
      setFieldErrors(updatedFieldErrors);
      //密碼欄位錯誤
    } else if (name === "password") {
      const updatedFieldErrors = {
        ...fieldErrors,
        password: "密碼至少為6個字元",
      };
      setFieldErrors(updatedFieldErrors);
      //手機欄位錯誤
    } else if ((name = "phone")) {
      const updatedFieldErrors = {
        ...fieldErrors,
        phone: "手機號碼為10位數字",
      };
      setFieldErrors(updatedFieldErrors);
    }
  };
  // 當整個表單有更動時會觸發
  // 認定使用者輸入某個欄位(更正某個有錯誤的欄位)
  const handleFormChange = (e) => {
    // 清空某個欄位錯誤訊息
    const updatedFieldErrors = {
      ...fieldErrors,
      [e.target.name]: "",
    };

    // 設定回錯誤訊息狀態
    setFieldErrors(updatedFieldErrors);
  };
  // -------- 表單送出 --------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 作客製化驗証
    if (user.password !== user.confirmPassword) {
      //設定錯誤的訊息
      const updatedFieldErrors = {
        ...fieldErrors,
        password: "密碼 與 確認密碼 欄位輸入不一致",
        confirmPassword: "密碼 與 確認密碼 欄位輸入不一致",
      };
      //設定錯誤訊息回到錯誤訊息狀態
      setFieldErrors(updatedFieldErrors);
    }

    try {
      let response = await axios.post(`${API_URL}/auth/register`, user);
      console.log(response.data);
      navigate("/login");
      registrationSuccessAlert();
    } catch (e) {
      // console.error("錯誤:", e.response.data);
      console.error(ERR_MSG[e.response.data].code);
    }
  };

  return (
    <>
      <div className="reg-con">
        <div className="container-fluid m-auto">
          <div className="col-lg-5 col-md-8 m-auto col-12 m-0 p-0">
            <div className="content text-center row justify-content-center gy-0 gx-0 shadow">
              <div className="col-lg-10 col-10 d-flex flex-column pt-5 pb-4">
                <div className="h4 text-dark-grey">會員註冊</div>
                {/* -------- 表格開始 -------- */}
                <div className="label-group d-flex text-start flex-column justify-content-evenly">
                  <form
                    className="d-flex flex-column"
                    onSubmit={handleSubmit}
                    onInvalid={handleFormInvalid}
                    onChange={handleFormChange}
                  >
                    {/* -------- 姓名 -------- */}
                    <label
                      htmlFor=""
                      className="col-form-label input-label-title text-green p-0"
                    >
                      姓名
                    </label>
                    <div class="form-floating mb-3">
                      <input
                        name="name"
                        type="text"
                        className={`form-control custom-input ${
                          fieldErrors.name !== "" && "input-error"
                        }`}
                        id="name"
                        placeholder="name"
                        value={user.name}
                        onChange={handleChange}
                        required
                      />
                      <label
                        htmlFor="name"
                        className="floating-label text-grey"
                      >
                        請填入中文 / 英文姓名
                      </label>
                      {/* 如果有錯誤訊息，呈現出來 */}
                      {fieldErrors.name !== "" && (
                        <div className="error text-end">{fieldErrors.name}</div>
                      )}
                    </div>
                    {/* -------- 電子郵件 -------- */}
                    <label
                      htmlFor=""
                      className="col-form-label input-label-title text-green p-0"
                    >
                      電子郵件
                    </label>
                    <div class="form-floating mb-3">
                      <input
                        name="email"
                        value={user.email}
                        type="email"
                        className={`form-control custom-input ${
                          fieldErrors.email !== "" && "input-error"
                        }`}
                        id="email"
                        placeholder="email"
                        onChange={handleChange}
                        required
                      />
                      <label
                        htmlFor="email"
                        className="floating-label text-grey"
                      >
                        請填入電子信箱
                      </label>
                      {/* 如果有錯誤訊息，呈現出來 */}
                      {fieldErrors.email !== "" && (
                        <div className="error text-end">
                          {fieldErrors.email}
                        </div>
                      )}
                    </div>
                    {/* -------- 密碼 -------- */}
                    <label
                      for=""
                      className="col-form-label input-label-title  text-green p-0"
                    >
                      密碼
                    </label>
                    <div class="form-floating mb-3">
                      <input
                        name="password"
                        type={eye.passwordEye ? "text" : "password"}
                        className={`form-control custom-input ${
                          fieldErrors.password !== "" && "input-error"
                        }`}
                        id="password"
                        placeholder="密碼"
                        value={user.password}
                        onChange={handleChange}
                        minLength="6"
                        required
                      />
                      <div onClick={passwordShow}>
                        {eye.passwordEye ? (
                          <FiEye className="eye" />
                        ) : (
                          <FiEyeOff className="eye" />
                        )}
                      </div>
                      <label
                        htmlFor="password"
                        className="floating-label text-grey"
                      >
                        請填入密碼
                      </label>
                      {/* 如果有錯誤訊息，呈現出來 */}
                      {fieldErrors.password !== "" && (
                        <div className="error text-end">
                          {fieldErrors.password}
                        </div>
                      )}
                    </div>
                    {/* -------- 密碼確認 -------- */}
                    <label
                      htmlFor="confirmPassword"
                      className="col-form-label input-label-title text-green p-0"
                    >
                      密碼確認
                    </label>
                    <div class="form-floating mb-3">
                      <input
                        name="confirmPassword"
                        type={eye.confirmPasswordEye ? "text" : "password"}
                        className={`form-control custom-input ${
                          fieldErrors.confirmPassword !== "" && "input-error"
                        }`}
                        id="confirm-password"
                        placeholder=""
                        value={user.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                      <div onClick={confirmPasswordShow}>
                        {eye.confirmPasswordEye ? (
                          <FiEye className="eye" />
                        ) : (
                          <FiEyeOff className="eye" />
                        )}
                      </div>
                      <label
                        htmlFor="confirm-password"
                        className="floating-label text-grey"
                      >
                        請再次輸入密碼
                      </label>
                      {/* 如果有錯誤訊息，呈現出來 */}
                      {fieldErrors.confirmPassword !== "" && (
                        <div className="error text-end">
                          {fieldErrors.confirmPassword}
                        </div>
                      )}
                    </div>
                    {/* -------- 手機-------- */}
                    <label
                      htmlFor="phone"
                      className="col-form-label input-label-title text-green p-0"
                    >
                      手機
                    </label>
                    <div class="form-floating mb-3">
                      <input
                        name="phone"
                        type="phone"
                        className={`form-control custom-input ${
                          fieldErrors.phone !== "" && "input-error"
                        }`}
                        id="floatingInput"
                        placeholder=""
                        value={user.phone}
                        minLength="10"
                        maxLength="10"
                        onChange={handleChange}
                        required
                      />
                      <label
                        htmlFor="floatingInput"
                        className="floating-label  text-grey"
                      >
                        09XXXXXXXX
                      </label>
                      {/* 如果有錯誤訊息，呈現出來 */}
                      {fieldErrors.phone !== "" && (
                        <div className="error text-end">
                          {fieldErrors.phone}
                        </div>
                      )}
                    </div>
                    {/* -------- 使用者同意條款 -------- */}
                    <div className="col-lg-12 align-items-center text-grey input-label-title text-center">
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
                    </div>
                    {/* TODO:當同意條款為true時以下按鈕才生效 */}
                    <div className="btn-group flex-column mt-2">
                      <button
                        type="submit"
                        className="btn submit-btn col-lg-12 mb-2"
                        disabled={!agree}
                      >
                        註冊
                      </button>
                      {/* -------- 表格結束 -------- */}
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <hr className="col-lg-5" />或<hr className="col-lg-5" />
                      </div>

                      {/* -------- Facebook 登入 -------- */}

                      <button className="btn btn-fb-login col-lg-12 d-flex align-items-center text-center justify-content-between mb-2">
                        <ImFacebook2 className="fb-icon col-lg-2 " />
                        使用 Facebook 註冊
                        <div className="col-lg-2"> </div>
                      </button>
                    </div>
                  </form>
                  <p className=" input-label-title text-grey text-center m-0 mb-3">
                    註冊過了嗎？
                    <Link to="/auth/login" className="no-link">
                      <span className=" text-yellow ">立即登入</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
