import React from "react";
import Title from "./components/Title";
import Tables from "./components/Tables";

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
