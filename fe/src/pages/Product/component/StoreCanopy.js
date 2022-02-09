import React from 'react';

const StoreCanopy = ({ canopy }) => {
  return (
    <div>
      <div class="canopy">
        <ul class="d-flex">
          {canopy.map(() => {
            return <li></li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default StoreCanopy;
