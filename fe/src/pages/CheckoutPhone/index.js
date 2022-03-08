import React from "react";
import Title from "./component/Title";
import Tables from "./component/Tables";

const Checkout = () => {
  return (
    <div>
      <Title />
      <div className="container">
        <Tables />
      </div>
    </div>
  );
};

export default Checkout;
