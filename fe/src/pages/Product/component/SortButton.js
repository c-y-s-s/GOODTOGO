import { RiArrowUpDownFill } from "react-icons/ri";

const SortButton = ({ handleSort, totalPage }) => {
  return (
    <div>
      <div className="d-flex  justify-content-between text-end products-comment-total">
        <div className="d-flex product-users-comment-filter">
          <div className="me-2 product-users-comment-filter-star">
            評分
            <button
              className="product-users-comment-filter-icon"
              onClick={() => {
                handleSort("star");
              }}
            >
              <RiArrowUpDownFill />
            </button>
          </div>
          <div className="product-users-comment-filter-time">
            留言時間
            <button
              className="product-users-comment-filter-icon"
              onClick={() => {
                handleSort("time");
              }}
            >
              <RiArrowUpDownFill />
            </button>
          </div>
        </div>
        <div>共 {totalPage} 則留言</div>
      </div>
    </div>
  );
};
export default SortButton
