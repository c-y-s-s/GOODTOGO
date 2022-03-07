import React from "react";
import Breadcrumb from "./component/Breadcrumb";
import Headings from "./component/Headings";
import Card from "./component/Card";
import Pagination from "./component/Pagination";

const Activity = () => {
  return (
    <div>
      <div className="container">
        <Breadcrumb />
        <Headings />
        <Card />
        <Pagination />
      </div>
    </div>
  );
};

export default Activity;
