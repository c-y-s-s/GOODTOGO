import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Register from "./Register";
import Login from "./Login";
import Reset from "./Reset";

const Auth = (props) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </>
  );
};

export default Auth;
