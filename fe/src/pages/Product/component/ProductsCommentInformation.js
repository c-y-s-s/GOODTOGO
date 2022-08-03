import { IMAGE_URL } from "../../../utils/config";
// -------- uuid --------
import { v4 as uuidv4 } from "uuid";
// -------- React Icon --------
import { FiMoreVertical } from "react-icons/fi";
// -------- MUI  Rating--------
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const ProductsCommentInformation = ({ item }) => {
  return (
    <div className="col-12 mt-3 product-comment" key={uuidv4()}>
      <div className="d-flex justify-content-between ">
        <div className="d-flex user-data w-100">
          <div>
            <div className="user-photo mt-3">
              <img
                className="cover-photo"
                src={IMAGE_URL + item.headshots}
                alt=""
              />
            </div>
          </div>

          <div className="ms-4 w-100">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div className="pt-2 user-data-name">{item.name}</div>
              <div className="d-flex align-items-center">
                <div className="user-data-comment-time">{item.create_time}</div>
                <div className="">
                  <button
                    className=" user-data-report"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FiMoreVertical />
                  </button>
                  <ul className="dropdown-menu">
                    <a href="">檢舉</a>
                  </ul>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between  product-data">
              <div>
                <div className="d-flex ">
                  <div className="">
                    <div className="d-flex ">
                      <Stack spacing={1}>
                        <Rating
                          name="half-rating-read"
                          defaultValue={item.star}
                          precision={0.1}
                          readOnly
                        />
                      </Stack>
                      <div className="ps-2 product-data-name">
                        {item.products_name}
                      </div>
                    </div>
                  </div>
                  <div className="ps-3 product-data-name">{item.products}</div>
                </div>
                <p className="pt-2 mb-0 user-comment">{item.comment}</p>
              </div>
              <img
                className="product-photo "
                src={require(`../../../images/products_img/${item.img}`)}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="text-end">
          <div className="d-flex">
            <div className="d-flex"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCommentInformation;
