import React from "react";

const Breadcrumb = () => {
  return (
    <div>
      <nav aria-label="breadcrumb" className="breadcrumb-center">
        <ol className="breadcrumb mt-5">
          <li className="breadcrumb-item ">
            <a href="#/" className="text-decoration-none">
              Home
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            優惠卷
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
