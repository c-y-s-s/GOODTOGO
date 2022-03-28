import React from "react";

const InfoCard = ({ children, version, imgSrc, opState }) => {
  return (
    <div className={`store-${version}-card shadow d-flex align-items-center`}>
      {children}
    </div>
  );
};

export default InfoCard;
