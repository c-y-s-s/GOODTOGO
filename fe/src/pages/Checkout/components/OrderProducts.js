import React from 'react'

const OrderProducts = ({ checkProductsData }) => {
  return (
    <>
      {checkProductsData.map((item) => {
        return (
          <>
            <tr className="text-center" key={item.id}>
              <th scope="row" className="py-3">
                <div className="d-flex align-items-center">
                  <div>
                    <img
                      className="cover-photo"
                      src={require(`../../../images/products_img/${item.img}`)}
                      alt=""
                    />
                  </div>

                  <div className=" ">
                    <div className="checkout-data-products-name d-md-flex">
                      <div className="text-start ">{item.product_name}</div>

                      {/* // md 以下出現區塊 */}
                      <div className="checkout-data-products-price d-md-none  text-start pt-2">
                        $ {item.price}
                      </div>
                    </div>
                    <div className="checkout-data-products-amount d-md-none d-flex align-items-center pt-2">
                      <div className="checkout-data-products-md-style ">
                        數量:
                      </div>
                      <div className="ps-2 checkout-data-products-md-style-amount">
                        {item.amount}
                      </div>
                    </div>
                    <div className="checkout-data-products-total d-md-none d-flex align-items-center pt-2">
                      <div className="checkout-data-products-md-style ">
                        小計:
                      </div>
                      <div className="ps-2 checkout-data-products-md-style-total">
                        ${item.price * item.amount}
                      </div>
                    </div>
                  </div>
                </div>
              </th>

              <td
                className="py-3 checkout-data-products-price   checkout-data-products-md-none
                "
              >
                ${item.price}
              </td>
              <td className="py-3 checkout-data-products-amount checkout-data-products-md-none">
                {item.amount}
              </td>
              <td className="py-3 text-end checkout-data-products-total checkout-data-products-md-none">
                ${item.price * item.amount}
              </td>
            </tr>
          </>
        );
      })}
    </>
  );
};

export default OrderProducts