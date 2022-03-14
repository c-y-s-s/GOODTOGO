import React from "react";
// -------- uuid --------

const StoreCanopy = ({ canopy }) => {
  return ( 
    <div>
      <div className="canopy">
        <ul className="d-flex">
          {canopy.map(() => {
            return <li></li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default StoreCanopy;
