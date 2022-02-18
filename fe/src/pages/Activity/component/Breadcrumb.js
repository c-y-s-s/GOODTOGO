import React from "react";

const Breadcrumb = () => {
  return (
    <div>
      <nav aria-label="breadcrumb ">
        <ol className="breadcrumb mt-5 ">
          <li className="breadcrumb-item ">
            <a href="#/" className="text-decoration-none">
              Home
            </a>
          </li>
          <li className="breadcrumb-item">
            <a href="#/" className="text-decoration-none">
              最新消息
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            最新優惠
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
