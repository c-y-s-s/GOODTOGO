import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Reset from "./components/Reset";

const Login = () => {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });

  const onFieldChange = (e) => {
    const newData = { ...fields, [e.target.name]: e.target.value };
    setFields(newData);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // 作驗証
    const formData = new FormData(e.target);
    console.log(formData.get("username"));
    console.log(formData.get("email"));
    console.log(formData.get("password"));
  };

  const handleInvalid = (e) => {
    e.preventDefault();

    const updatedFieldErrors = {
      ...fieldErrors,
      [e.target.name]: e.target.validationMessage,
    };

    setFieldErrors(updatedFieldErrors);
  };

  const onFormChange = (e) => {
    const updatedFieldErrors = {
      ...fieldErrors,
      [e.target.name]: "",
    };

    // 3. 設定回錯誤訊息狀態
    setFieldErrors(updatedFieldErrors);
  };
  return (
    <>
      <div className="container-fluid login-con">
        <div className="row">
          <div className="col-lg-4 m-0 p-0"></div>
          <div className="col-lg-4 m-0 p-0">
            <div className="content text-center row justify-content-between gy-0">
              <div className="col-lg-1"></div>
              <div className="col-lg-10 row mt-4 mb-4 flex-column justify-content-evenly align-items-center">
                <LoginForm
                  fields={fields}
                  setFields={setFields}
                  fieldErrors={fieldErrors}
                  setFieldErrors={setFieldErrors}
                  onFieldChange={onFieldChange}
                  onFormChange={onFormChange}
                  onSubmit={onSubmit}
                  onInvalid={handleInvalid}
                />
                {/* <Reset /> */}
              </div>
              <div className="col-lg-1"></div>
            </div>
          </div>
          <div className="col-lg-4 m-0 p-0"></div>
        </div>
      </div>
    </>
  );
};

export default Login;
