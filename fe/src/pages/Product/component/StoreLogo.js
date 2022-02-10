import React from 'react';

const StoreLogo = ({logo}) => {
  return (
    <div>
      <div className="container-fluid p-0">
        <div className="storeLogo">
          <img
            className="w-100 storeLogoImg"
            src={require(`../../../images/store_img/${logo}`)}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default StoreLogo;
