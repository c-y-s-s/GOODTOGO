import React from "react";

let canopyID = 100;
const StoreCanopy = ({ canopy }) => {
  return ( 
    <div>
      <div className="canopy">
        <ul className="d-flex">
          {canopy.map(() => {
            {
              canopyID++;
            }
            return <li key={canopyID} ></li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default StoreCanopy;
