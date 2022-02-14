import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Reset from "./components/Reset";

const Login = () => {
  // const [toggleLogin, setToggleLogin] = useState("login"); //register
  return (
    <>
      <div className="container-fluid login-con">
        <div className="row">
          <div className="col-lg-4 m-0 p-0"></div>
          <div className="col-lg-4 m-0 p-0">
            <div className="content text-center row justify-content-between gy-0">
              <div className="col-lg-2"></div>
              <div className="col-lg-8 row mt-4 mb-4 flex-column justify-content-evenly align-items-center">
                <LoginForm />
                {/* <Reset /> */}
              </div>
              <div className="col-lg-2"></div>
            </div>
          </div>
          <div className="col-lg-4 m-0 p-0"></div>
        </div>
      </div>
    </>
  );
};

export default Login;
