import React, { useState } from "react";

const _menuToggle = ({ navbarOpen }) => {
  return (
    <>
      {" "}
      {/* RWD menu toggle */}
      <div className="menu-toggle justify-self-start">
        {navbarOpen ? "Close" : "Open"}
        {/* <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div> */}

        <div className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>...</div>
        {/* <MenuToggle className="menu-toggle" onClick={navbarOpen} /> */}
        {/* RWD menu toggle */}
      </div>
    </>
  );
};

export default _menuToggle;
