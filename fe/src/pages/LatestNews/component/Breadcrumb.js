import React from "react";

const Breadcrumb = () => {
  return (
    <div>
 <nav aria-label="breadcrumb">
          <ol className="breadcrumb mt-5">
            <li className="breadcrumb-item">
              <a href="#/">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Library
            </li>
          </ol>
        </nav>
    </div>
  );
};

export default Breadcrumb;
