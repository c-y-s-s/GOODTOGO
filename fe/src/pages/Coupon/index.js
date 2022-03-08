import React from "react";
import Breadcrumb from "./component/Breadcrumb";
import Headings from "./component/Headings";
import Content from "./component/Content";

const LatestNews = () => {
  return (
    <div>
      <div className="container">
        <Breadcrumb />
        <Headings />
        <Content />
      </div>
    </div>
  );
};

export default LatestNews;
