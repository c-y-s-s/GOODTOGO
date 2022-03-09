import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { ImFacebook2 } from "react-icons/im";
import axios from "axios";
// import TWzipcode from "react-twzipcode";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AiOutlineCamera } from "react-icons/ai";
import { ReactComponent as Logo } from "../../images/logo-face.svg";
// import TwCitySelector from "tw-city-selector";
import { API_URL } from "../../utils/config";
import { ERR_MSG } from "../../utils/error";
import "./Storecheck.scss";
import CityCountyData from "./components/CityCountyData.json";
import Swal from "sweetalert2";


const StoreCheck = () => {



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
              navigate("/storeLogin");
            }
          })}
      </>
    );
  };

  const registrationFailedAlert = () => {
    return (
      <>
        {swal
          .fire({
            text: "資料有誤喔!請再檢查一次",
            icon: "question",
            showCancelButton: false,
            confirmButtonText: "檢查資料",
          })
          .then((result) => {
            if (result.isConfirmed) {
              navigate("/StoreCheck");
            }
          })}
      </>
    );
  };



  const [member, setMember] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    storeType: "",
    openHour: "",
    openMinute: "",
    closeHour: "",
    closeMinute: "",
    storeName: ""
  });

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


  // -------- 營業日期勾選功能開始 --------
  // 建立日期與對應的值的物件
  // const dayObject = [
  //   {
  //   day:"一", isOpen:[1]
  // },
  //   {
  //   day:"二", isOpen:[2]
  // },
  //   {
  //   day:"三", isOpen:[3]
  // },
  //   {
  //   day:"四", isOpen:[4]
  // },
  //   {
  //   day:"五", isOpen:[5]
  // },
  //   {
  //   day:"六", isOpen:[6]
  // },
  //   {
  //   day:"七", isOpen:[7]
  // }
  // ]
  // 設定日期checkbox選擇預設false
  // const [checkedState, setCheckedState] = useState(
  //   new Array(dayObject.length).fill(false)
  // );
  // }
  // }

  // -------- 表單營業日期變更開始 -------- //
  // 宣告營業日
  let [closeDay, setCloseDay] = useState([
    "1","2","3","4","5","6","7"
  ]);
  
  const handleDayChange = (e) =>{
  parseInt(e.target.value)
  let found = closeDay.find(element => element === e.target.value);
  if (found !== undefined){
    setCloseDay(closeDay.filter(item => item !== e.target.value));
    console.log("減少",closeDay);
    setMember({ ...member, ...{closeDay}});
    
  }
  else {
    setCloseDay([...closeDay,e.target.value]);
      console.log("增加",closeDay);
  }
}
useEffect(() => {
console.log(closeDay)
}, [closeDay]);

    // if (e.target.checked == true) {
    //   setOpenDay([...openDay,e.target.value]);
    //   console.log(openDay);
    //   // openDay.push(e.target.value);
    // }else{
    //   let toRemove = e.target.value;
    //   setOpenDay(openDay.filter(item =>item.toRemove !== toRemove));
    //   console.log(openDay);
    // }
    // const handleDayChange = (e) => {
    //   console.log(e.target.value);
    
    //   setDay({ ...day, [e.target.name]: e.target.value });
    //   setMember({ ...member, ...{ day } });
    // };
    // -------- 表單營業日期變更結束 -------- //
    
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
    } else if (name === "phone") {
      const updatedFieldErrors = {
        ...fieldErrors,
        phone: "手機號碼為10位數字",
      };
      setFieldErrors(updatedFieldErrors);
    } else if (name === "address") {
      const updatedFieldErrors = {
        ...fieldErrors,
        address: "請輸入地址",
      };
      setFieldErrors(updatedFieldErrors);
    } else if (name === "storeName") {
      const updatedFieldErrors = {
        ...fieldErrors,
        storeName: "請輸入名稱",
      };
      setFieldErrors(updatedFieldErrors);
    }
    else if (name === "storeType") {
      const updatedFieldErrors = {
        ...fieldErrors,
        storeType: "請選擇類型",
      };
      setFieldErrors(updatedFieldErrors);
    } else if ((name === "openHour")) {
      const updatedFieldErrors = {
        ...fieldErrors,
        openHour: "格式錯誤",
      };
      setFieldErrors(updatedFieldErrors);
    } else if ((name === "openMinute")) {
      const updatedFieldErrors = {
        ...fieldErrors,
        openMinute: "格式錯誤",
      };
      setFieldErrors(updatedFieldErrors);
    } else if ((name === "closeHour")) {
      const updatedFieldErrors = {
        ...fieldErrors,
        closeHour: "格式錯誤",
      };
      setFieldErrors(updatedFieldErrors);
    } else if ((name === "closeMinute")) {
      const updatedFieldErrors = {
        ...fieldErrors,
        closeMinute: "格式錯誤",
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

  const [openTime, setOpenTime] = useState()

  const [closeTime, setCloseTime] = useState()

  const [logoSrc, setLogoSrc] = useState("");

  const [licenceSrc, setLicenceSrc] = useState("");

  const [address, setAddress] = useState();


  const handleOpenTimeChange = (e) => {
    console.log(e.target.value);
    if (e.target.value.length === 1) {
      e.target.value = "0" + e.target.value;
    }
    setOpenTime({ ...openTime, [e.target.name]: e.target.value });
    // setMember({ ...member, ...{ openTime } });
  };
  const handleCloseTimeChange = (e) => {
    console.log(e.target.value);
    if (e.target.value.length === 1) {
      e.target.value = "0" + e.target.value;
    }
    setCloseTime({ ...closeTime, [e.target.name]: e.target.value });
    // setMember({ ...member, ...{ closeTime } });
  };

  // -------- 表單地區選擇與地址開始 -------- //

  const cityCountyData = CityCountyData;

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  const availableArea = cityCountyData.find((c) => c.CityName === selectedCity);
  // const availableCities = availableState?.states?.find((s) => s.name === selectedState);

  const handleCityChange = (e) => {
    console.log(e.target.value)
    setSelectedCity(e.target.value)
    setMember({ ...member, [e.target.name]: e.target.value });
  }
  const handleAreaChange = (e) => {
    console.log(e.target.value)
    setSelectedArea(e.target.value)
    setMember({ ...member, [e.target.name]: e.target.value });
  }

  const handleAddressChange = (e) => {
    console.log(e.target.value)
    setAddress(e.target.value)
    setMember({ ...member, [e.target.name]: e.target.value });
  }
  // -------- 表單地區選擇與地址結束 -------- //


  // -------- 表單使用者資料變更開始 -------- //
  const handleChange = (e) => {
    console.log(e.target.value);
    setMember({ ...member, [e.target.name]: e.target.value });
  };
  // -------- 表單使用者資料變更開始 -------- //

  // -------- 店家LOGO上傳開始 --------//
  const handleLogoChange = (e) => {
    console.log(e.target.value);
    let file1 = e.target.files[0]; // 抓取上傳的圖片
    if (e.target.files[0].size > 2097152) {
      alert("檔案太大囉!");
      [...file1] = "";
      console.log(e.target.value);

    }
    const reader = new FileReader(); // 讀取 file
    reader.addEventListener(
      "load",
      function () {
        //     // convert image file to base64 string
        setLogoSrc(reader.result);
      },
      false // e.preventDefault()
    );

    if (file1 !== "") {
      reader.readAsDataURL(file1);
      // readAsDataURL 將讀取到的檔案編碼成 Data URL 內嵌網頁裡
      console.log("商家註冊LOGO", file1.name); // e.target.files[0].name
      console.log(e.target.files[0]);
      setMember({ ...member, [e.target.name]: e.target.files[0] });
    }
    else console.log("重新選擇圖片");
  };
  // -------- 店家LOGO上傳結束 --------//
  // -------- 表單營業許可證上傳開始 --------//
  const handleLicenseChange = (e) => {
    console.log(e.target.value);
    let file2 = e.target.files[0]; // 抓取上傳的圖片
    if (e.target.files[0].size > 2097152) {
      alert("檔案太大囉!");
      [...file2] = "";
    }
    const reader = new FileReader(); // 讀取 input type="file" 的 file
    reader.addEventListener(
      "load",
      function () {
        // convert image file to base64 string
        setLicenceSrc(reader.result);
      },
      false //  e.preventDefault() 
    );

    if (file2) {
      reader.readAsDataURL(file2);
    }
    console.log("商家營業許可", file2.name); // e.target.files[0].name
    setMember({ ...member, [e.target.name]: e.target.files[0] });
  };

  // -------- 表單營業許可證上傳結束 --------//



  // -------- 表單送出開始 -------- //
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (member.password !== member.confirmPassword) {
      //設定錯誤的訊息
      const updatedFieldErrors = {
        ...fieldErrors,
        password: "密碼 與 確認密碼 欄位輸入不一致",
        confirmPassword: "密碼 與 確認密碼 欄位輸入不一致",
      };
      //設定錯誤訊息回到錯誤訊息狀態
      setFieldErrors(updatedFieldErrors);
    }
    // todo 修改資料表
    try {
      let formData = new FormData();
      formData.append("name", member.name);
      formData.append("email", member.email);
      formData.append("password", member.password);
      formData.append("confirmPassword", member.confirmPassword);
      // formData.append("City",member.City);
      // formData.append("Area",member.Area);
      formData.append("address", member.City + member.Area + member.address);
      formData.append("storeName", member.storeName);
      formData.append("phone", member.phone);
      formData.append("storeLogo", member.storeLogo);
      formData.append("storeLicence", member.storeLicence);
      formData.append("storeType", member.storeType);
      formData.append("closeDay", member.closeDay);
      formData.append("openTime", openTime.openHour + `:` + openTime.openMinute + `:` + `00.000000`);
      formData.append("closeTime", closeTime.closeHour + `:` + closeTime.closeMinute + `:` + `00.000000`);


      // let response = await axios.post(`${API_URL}/storeCheck/storeCheck`, member);
      let response = await axios.post(`${API_URL}/storeCheck/storeCheck`, formData);

      console.log(response.data);
      navigate("/storeLogin");
      registrationSuccessAlert();
    } catch (e) {
      registrationFailedAlert();
      console.error(ERR_MSG[e.response.data].code);
    }
  };
  // -------- 表單送出結束 -------- //

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
                    onSubmit={handleSubmit}
                    onInvalid={handleFormInvalid}
                    onChange={handleFormChange}
                  >
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
                          className={`form-control custom-input ${fieldErrors.name !== "" && "input-error"
                            }`}
                          id="name"
                          placeholder="請填入中文 / 英文姓名"
                          onChange={handleChange}
                          required
                        />
                        <label
                          htmlFor="name"
                          className="floating-label text-grey"
                        >
                          請填入中文 / 英文姓名
                        </label>
                        {fieldErrors.name !== "" && (
                          <div className="error text-end">{fieldErrors.name}</div>
                        )}
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
                          className={`form-control custom-input ${fieldErrors.email !== "" && "input-error"
                            }`}
                          id="email"
                          placeholder="email"
                          onChange={handleChange}
                          required
                        />
                        <label
                          htmlFor="email"
                          className="floating-label  text-grey"
                        >
                          請填入電子信箱
                        </label>
                        {fieldErrors.email !== "" && (
                          <div className="error text-end">
                            {fieldErrors.email}
                          </div>
                        )}
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
                          type={eye.passwordEye ? "text" : "password"}
                          className={`form-control custom-input ${fieldErrors.password !== "" && "input-error"
                            }`}
                          id="password"
                          placeholder="密碼"
                          value={member.password}
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
                          請設定密碼
                        </label>
                        {fieldErrors.password !== "" && (
                          <div className="error text-end">
                            {fieldErrors.password}
                          </div>
                        )}
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
                          type={eye.confirmPasswordEye ? "text" : "password"}
                          className={`form-control custom-input ${fieldErrors.confirmPassword !== "" && "input-error"
                            }`}
                          id="confirmpassword"
                          placeholder="請再次輸入密碼"
                          value={member.confirmPassword}
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
                          htmlFor="confirmpassword"
                          className="floating-label text-grey"
                        >
                          請再次輸入密碼確認
                        </label>
                        {fieldErrors.confirmPassword !== "" && (
                          <div className="error text-end">
                            {fieldErrors.confirmPassword}
                          </div>
                        )}
                      </div>
                      {/* -------- 地址資料 -------- */}
                      <div className="row">
                        {/* <div className="col-6">
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
                        */}
                        {/* -------- 區域 -------- */}

                        {/* <div className="col-6">
                          <select
                            className="form-select custom-input"
                          >
                            <option >請選擇區域 </option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div> */}
                        <div className="col-6">
                          <label>縣市</label>
                          <select className={`form-control custom-input ${fieldErrors.City !== "" && "input-error"
                            }`}
                            name="City"
                            placeholder="City"
                            value={selectedCity}
                            onChange={handleCityChange}
                          >
                            <option>選擇城市</option>
                            {cityCountyData.map((value, key) => {
                              return (
                                <option value={value.CityName} key={key}>
                                  {value.CityName}
                                </option>
                              );
                            })}
                          </select>
                          {fieldErrors.City !== "" && (
                            <div className="error text-end">
                              {fieldErrors.City}
                            </div>
                          )}
                        </div>

                        <div className="col-6">
                          <label>區域</label>
                          <select className={`form-control custom-input ${fieldErrors.Area !== "" && "input-error"
                            }`}
                            name="Area"
                            placeholder="Area"
                            value={selectedArea}
                            onChange={handleAreaChange}
                          >
                            <option>選擇區域</option>
                            {availableArea?.AreaList.map((e, key) => {
                              return (
                                <option value={e.AreaName} key={key}>
                                  {e.AreaName}
                                </option>
                              );
                            })}
                          </select>
                          {fieldErrors.Area !== "" && (
                            <div className="error text-end">
                              {fieldErrors.Area}
                            </div>
                          )}
                        </div>
                        {/* <div id="twzipcode"></div> */}
                        {/* <TWzipcode css={["col-6 form-select custom-input county-sel", "col-6 form-select custom-input district-sel", "d-none zipcode"]}
                          handleChangeCounty={this.handleChange}
                          handleChangeDistrict={this.handleChange}
                          handleChangeZipcode={this.handleChange}
                          /> */}
                        {/* <div className="city-selector d-flex flex-grow-1" id="citySelector">
                          <select className="county form-select me-3"></select>
                          <select className="district form-select"></select>
                        </div> */}
                      </div>
                      <div className="form-floating mb-3">
                        {/* 詳細地址 */}
                        <input
                          name="address"
                          type="text"
                          className={`form-control custom-input ${fieldErrors.address !== "" && "input-error"
                            }`}
                          id="address"
                          placeholder="address"
                          value={address}
                          maxLength="80"
                          onChange={handleAddressChange}
                          required
                        />
                        <label
                          htmlFor="address"
                          className="floating-label  text-grey"
                        >
                          請輸入詳細地址
                        </label>
                        {fieldErrors.address !== "" && (
                          <div className="error text-end">
                            {fieldErrors.address}
                          </div>
                        )}
                      </div>
                      {/* -------- 營業店家名稱 -------- */}
                      <label
                        htmlFor="storeName"
                        className="col-form-label input-label-title  text-green p-0"
                      >
                        營業店家名稱
                      </label>
                      <div className="form-floating mb-3">
                        <input
                          name="storeName"
                          type="text"
                          className={`form-control custom-input ${fieldErrors.storeName !== "" && "input-error"
                            }`}
                          id="storeName"
                          placeholder="營業店家名稱"
                          value={member.storeName}
                          maxLength="30"
                          onChange={handleChange}
                          required

                        />
                        <label
                          htmlFor="storeName"
                          className="floating-label  text-grey"
                        >
                          請輸入營業商店名稱
                        </label>
                        {fieldErrors.storeName !== "" && (
                          <div className="error text-end">
                            {fieldErrors.storeName}
                          </div>
                        )}
                      </div>
                      {/* -------- 營業店家電話 -------- */}
                      <label
                        htmlFor="phone"
                        className="col-form-label input-label-title  text-green p-0"
                      >
                        營業店家電話
                      </label>
                      <div className="form-floating mb-3">
                        <input
                          name="phone"
                          type="number"
                          className={`form-control custom-input ${fieldErrors.phone !== "" && "input-error"
                            }`}
                          id="phone"
                          placeholder="name@example.com"
                          value={member.phone}
                          maxLength="10"
                          onChange={handleChange}
                          onWheel={(e) => e.target.blur()} 
                          required
                        />
                        <label
                          htmlFor="phone"
                          className="floating-label  text-grey"
                        >
                          不含符號
                        </label>
                        {fieldErrors.phone !== "" && (
                          <div className="error text-end">
                            {fieldErrors.phone}
                          </div>
                        )}
                      </div>
                      {/* -------- 使用者同意條款 -------- */}

                    </div>
                    <div className="d-block d-sm-block d-md-block d-lg-none d-xl-none d-xxl-none col-1"></div>
                    <div className="d-block d-sm-block d-md-block d-lg-none d-xl-none d-xxl-none col-1"></div>
                    <div className="col-lg-6 col-md-10 col-sm-10 col-10">
                      {/* -------- 店家LOGO上傳 -------- */}
                      {/* todo 修改上船扭樣式 */}
                      <label
                        htmlFor="storeLoco"
                        className="col-form-label input-label-title text-green p-0"
                      >
                        店家LOGO上傳
                      </label>
                      <div className="form-floating mb-3">
                        <input
                          name="storeLogo"
                          type="file"
                          accept="image/jpg, image/jpeg, image/png"
                          className="form-control custom-input"
                          id="storeLogo"
                          placeholder=".jpg/.jpeg/.png 上限 2MB"
                          onChange={handleLogoChange}
                          required
                        />
                        <AiOutlineCamera size={24}/>預覽區塊(限制2MB,預覽成功才能上傳!)
                        {logoSrc !== "" && (
                        <img
                          src={logoSrc}
                      // 顯示順序: 上傳圖片 -> 資料庫圖片 -> 預設圖片
                      alt="照片預覽"
                      className="cover-fit preview"
                    />)}
                      </div>
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
                          id="storeLicence"
                          placeholder=".jpg/.jpeg/.png 上限 2MB"
                          onChange={handleLicenseChange}
                          required
                        />
                        <AiOutlineCamera size={24}/>預覽區塊(限制2MB,預覽成功才能上傳!)
                        {licenceSrc !== "" && (
                        <img
                          src={licenceSrc}
                      // 顯示順序: 上傳圖片 -> 資料庫圖片 -> 預設圖片
                      alt="照片預覽"
                      className="cover-fit preview"
                    />)}
                      </div>

                      <label
                        htmlFor="storeType"
                        className="col-form-label input-label-title  text-green p-0"
                      >
                        商品類別
                      </label>
                      <div className="form-floating mb-3">
                        <select
                          name="storeType"
                          className={`form-control custom-input ${fieldErrors.storeType !== "" && "input-error"
                        }`}
                          id="storeType"
                          placeholder="商品類別"
                          value={member.storeType}
                          onChange={handleChange}
                          required
                        > <option value="" disabled selected>請選擇類別</option>
                          <option value="1">港式</option>
                          <option value="2">中式</option>
                          <option value="3">韓式</option>
                          <option value="4">泰式</option>
                          <option value="5">素食</option>
                          <option value="6">西式</option>
                          <option value="7">飲料</option>
                          <option value="8">甜點</option>
                          <option value="9">麵包</option>
                        </select>
                        <label
                          htmlFor="storeType"
                          className="floating-label  text-grey"
                        >
                          主打的是...
                        </label>
                        {fieldErrors.storeType !== "" && (
                          <div className="error text-end">
                            {fieldErrors.storeType}
                          </div>
                        )}</div>
                      {/* ------- 營業星期 (複選) -------- */}
                      <label
                        htmlFor="opendayCheck"
                        className="col-form-label input-label-title text-green p-0"
                      >
                        營業星期(複選)
                      </label>
                      <div className="d-block mb-3 me-0 opendayCheck">
                        <div id="dayCheck" className="row mt-3 mb-3 ms-1 me-1">
                          {/* {dayObject.map(({ day, isOpen }, index) => {
                            return (
                              <input key={index}
                                type="checkbox"
                                id={`custom-checkbox-${index}`}
                                name={day}
                                value={day}
                                checked={checkedState[index]}
                                onChange={() => handleOnChange(index)}
                              />
                            );
                          })} */}
                          <input type="checkbox" id="mon" name="一" value="1" className="col dayCheck" onChange={handleDayChange}></input>
                          <input type="checkbox" id="tue" name="二" value="2" className="col dayCheck" onChange={handleDayChange}></input>
                          <input type="checkbox" id="wed" name="三" value="3" className="col dayCheck" onChange={handleDayChange}></input>
                          <input type="checkbox" id="thu" name="四" value="4" className="col dayCheck" onChange={handleDayChange}></input>
                          <input type="checkbox" id="fri" name="五" value="5" className="col dayCheck" onChange={handleDayChange}></input>
                          <input type="checkbox" id="sat" name="六" value="6" className="col dayCheck" onChange={handleDayChange}></input>
                          <input type="checkbox" id="sun" name="日" value="7" className="col dayCheck" onChange={handleDayChange}></input>
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
                      {/* -------- 營業時間設定開始 -------- */}
                      <label
                        htmlFor="openHour"
                        className="col-form-label input-label-title  text-green p-0"
                      >
                        營業時間
                      </label>
                      <div className="flex mb-3">
                        {/* 幾點 */}
                        <div className="form-floating timeZone">
                          <input
                            name="openHour"
                            type="number"
                            className={`form-control custom-input time ${fieldErrors.openHour !== "" && "input-error"
                              }`}
                            id="openHour"
                            placeholder="時"
                            value={member.openHour}
                            maxLength="2"
                            max={24}
                            min={0}
                            onChange={handleOpenTimeChange}
                            onWheel={(e) => e.target.blur()} 
                            required
                          />
                          <label
                            htmlFor="openHour"
                            className="floating-label text-grey"
                          >時
                          </label>
                          {fieldErrors.openHour !== "" && (
                            <div className="error text-end">
                              {fieldErrors.openHour}
                            </div>
                          )}
                        </div>
                        {/* 冒號 */}
                        <div className="timeSymbol">:</div>
                        {/* 幾分 */}
                        <div className="form-floating timeZone">
                          <input
                            name="openMinute"
                            type="number"
                            className={`form-control custom-input time ${fieldErrors.openMinute !== "" && "input-error"
                              }`}
                            id="openMinute"
                            placeholder="分"
                            value={member.openMinute}
                            maxLength="2"
                            max={60}
                            min={0}
                            onChange={handleOpenTimeChange}
                            onWheel={(e) => e.target.blur()} 
                            required
                          />
                          <label
                            htmlFor="openMinute"
                            className="floating-label  text-grey"
                          >
                            分
                          </label>
                          {fieldErrors.openMinute !== "" && (
                            <div className="error text-end">
                              {fieldErrors.openMinute}
                            </div>
                          )}
                        </div>
                        {/* 到 */}
                        <div className="timeSymbol" >~</div>
                        {/* 幾點 */}
                        <div className="form-floating timeZone">
                          <input
                            name="closeHour"
                            type="number"
                            className={`form-control custom-input time ${fieldErrors.closeHour !== "" && "input-error"
                              }`}
                            id="closeHour"
                            placeholder="時"
                            value={member.closeHour}
                            maxLength="2"
                            max={24}
                            min={0}
                            onChange={handleCloseTimeChange}
                            onWheel={(e) => e.target.blur()} 
                            required
                          />
                          <label
                            htmlFor="closeHour"
                            className="floating-label  text-grey"
                          >
                            時
                          </label>
                          {fieldErrors.closeHour !== "" && (
                            <div className="error text-end">
                              {fieldErrors.closeHour}
                            </div>
                          )}
                        </div>
                        {/* 冒號 */}
                        <div className="timeSymbol">:</div>
                        {/* 幾分 */}
                        <div className="form-floating timeZone">
                          <input
                            name="closeMinute"
                            type="number"
                            className={`form-control custom-input time ${fieldErrors.closeMinute !== "" && "input-error"
                              }`}
                            id="closeMinute"
                            placeholder="分"
                            value={member.closeMinute}
                            maxLength="2"
                            max={60}
                            min={0}
                            onChange={handleCloseTimeChange}
                            onWheel={(e) => e.target.blur()} 
                            required
                          />
                          <label
                            htmlFor="closeMinute"
                            className="floating-label  text-grey"
                          >
                            分
                          </label>
                          {fieldErrors.closeMinute !== "" && (
                            <div className="error text-end">
                              {fieldErrors.closeMinute}
                            </div>
                          )}
                        </div>
                      </div>
                      {/* -------- 營業時間設定結束 -------- */}
                      {/* -------- 註冊同意按鈕開始 -------- */}
                      <div className="align-items-center text-grey input-label-title mt-5">
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
                        className="btn btn-register flex-column mt-2"
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

export default StoreCheck;
