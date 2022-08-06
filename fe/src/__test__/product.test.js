/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-wait-for-side-effects */
import {
  render,
  cleanup,
  waitForElement,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom";
import axiosMock from "axios";
import Product from "../pages/Product";
import StoreDetails from "../pages/Product/component/StoreDetails";
import StoreButton from "../pages/Product/component/StoreButton";
import Loading from "../pages/Product/component/Loading";
import Fetch from "../components/Fetch";
import ReactRouter from "react-router";
import ProductsDetails from "../pages/Product/component/ProductsDetails";
import { AuthContext } from "../context/auth";
import axios from "axios";
import { act } from "react-dom/test-utils";
// afterEach(cleanup);
jest.mock("axios");

const user = {
  id: 35,
  name: "aaaaaa",
  photo: "",
};
const storeData = {
  data: [
    {
      id: 1,
      logo: "01.jpg",
      bossname: "楊昆幸",
      name: "豪記港式飲茶 永福店",
      email: "crd62707@zwoho.com",
      account: "",
      password: "",
      tel_no: "035550000",
      address: "桃園市中壢區永福路938號",
      close_day: "[4]",
      open_time: "00:00:00",
      close_time: "23:59:00",
      stores_category_id: 1,
      created_at: "2021-12-10 00:50:18",
      valid: 1,
      category: "中式",
    },
  ],
};
const storeCommentTotalData = {
  data: [
    {
      id: 1,
      user_id: 1,
      products_id: 1,
      store_id: 1,
      comment: "超好吃的欸",
      star: 5,
      create_time: "2022-02-02 06:02:03",
    },
    {
      id: 2,
      user_id: 1,
      products_id: 2,
      store_id: 1,
      comment: "超好吃的欸",
      star: 5,
      create_time: "2022-02-02 06:02:03",
    },
    {
      id: 3,
      user_id: 1,
      products_id: 3,
      store_id: 1,
      comment: "超好吃的欸",
      star: 5,
      create_time: "2022-02-02 06:02:03",
    },
    {
      id: 4,
      user_id: 1,
      products_id: 4,
      store_id: 1,
      comment: "超好吃的欸",
      star: 5,
      create_time: "2022-02-02 06:02:03",
    },
    {
      id: 5,
      user_id: 1,
      products_id: 5,
      store_id: 1,
      comment: "超好吃的欸",
      star: 5,
      create_time: "2022-02-02 06:02:03",
    },
    {
      id: 6,
      user_id: 1,
      products_id: 6,
      store_id: 1,
      comment: "超好吃的欸",
      star: 5,
      create_time: "2022-02-02 06:02:03",
    },
    {
      id: 7,
      user_id: 2,
      products_id: 1,
      store_id: 1,
      comment: "很划算",
      star: 4,
      create_time: "2022-02-03 07:03:04",
    },
    {
      id: 8,
      user_id: 2,
      products_id: 2,
      store_id: 1,
      comment: "很划算",
      star: 4,
      create_time: "2022-02-03 07:03:04",
    },
    {
      id: 9,
      user_id: 2,
      products_id: 3,
      store_id: 1,
      comment: "很划算",
      star: 4,
      create_time: "2022-02-03 07:03:04",
    },
    {
      id: 10,
      user_id: 2,
      products_id: 4,
      store_id: 1,
      comment: "很划算",
      star: 4,
      create_time: "2022-02-03 07:03:04",
    },
    {
      id: 11,
      user_id: 2,
      products_id: 5,
      store_id: 1,
      comment: "很划算",
      star: 4,
      create_time: "2022-02-03 07:03:04",
    },
    {
      id: 12,
      user_id: 2,
      products_id: 6,
      store_id: 1,
      comment: "很划算",
      star: 4,
      create_time: "2022-02-03 07:03:04",
    },
    {
      id: 13,
      user_id: 3,
      products_id: 1,
      store_id: 1,
      comment: "每個禮拜都買好幾次東西超好吃",
      star: 4,
      create_time: "2022-02-04 08:04:05",
    },
    {
      id: 14,
      user_id: 3,
      products_id: 2,
      store_id: 1,
      comment: "每個禮拜都買好幾次東西超好吃",
      star: 4,
      create_time: "2022-02-04 08:04:05",
    },
    {
      id: 15,
      user_id: 3,
      products_id: 3,
      store_id: 1,
      comment: "每個禮拜都買好幾次東西超好吃",
      star: 4,
      create_time: "2022-02-04 08:04:05",
    },
    {
      id: 16,
      user_id: 3,
      products_id: 4,
      store_id: 1,
      comment: "每個禮拜都買好幾次東西超好吃",
      star: 4,
      create_time: "2022-02-04 08:04:05",
    },
    {
      id: 17,
      user_id: 3,
      products_id: 5,
      store_id: 1,
      comment: "每個禮拜都買好幾次東西超好吃",
      star: 4,
      create_time: "2022-02-04 08:04:05",
    },
    {
      id: 18,
      user_id: 3,
      products_id: 6,
      store_id: 1,
      comment: "每個禮拜都買好幾次東西超好吃",
      star: 4,
      create_time: "2022-02-04 08:04:05",
    },
    {
      id: 19,
      user_id: 4,
      products_id: 1,
      store_id: 1,
      comment: "還行吧",
      star: 3,
      create_time: "2022-02-05 09:05:06",
    },
    {
      id: 20,
      user_id: 4,
      products_id: 2,
      store_id: 1,
      comment: "還行吧",
      star: 3,
      create_time: "2022-02-05 09:05:06",
    },
    {
      id: 21,
      user_id: 4,
      products_id: 3,
      store_id: 1,
      comment: "還行吧",
      star: 3,
      create_time: "2022-02-05 09:05:06",
    },
    {
      id: 22,
      user_id: 4,
      products_id: 4,
      store_id: 1,
      comment: "還行吧",
      star: 3,
      create_time: "2022-02-05 09:05:06",
    },
    {
      id: 23,
      user_id: 4,
      products_id: 5,
      store_id: 1,
      comment: "還行吧",
      star: 3,
      create_time: "2022-02-05 09:05:06",
    },
    {
      id: 24,
      user_id: 4,
      products_id: 6,
      store_id: 1,
      comment: "還行吧",
      star: 3,
      create_time: "2022-02-05 09:05:06",
    },
    {
      id: 25,
      user_id: 5,
      products_id: 1,
      store_id: 1,
      comment: "老闆態度是在差什麼",
      star: 2,
      create_time: "2022-02-06 10:06:07",
    },
    {
      id: 26,
      user_id: 5,
      products_id: 2,
      store_id: 1,
      comment: "老闆態度是在差什麼",
      star: 2,
      create_time: "2022-02-06 10:06:07",
    },
    {
      id: 27,
      user_id: 5,
      products_id: 3,
      store_id: 1,
      comment: "老闆態度是在差什麼",
      star: 2,
      create_time: "2022-02-06 10:06:07",
    },
    {
      id: 28,
      user_id: 5,
      products_id: 4,
      store_id: 1,
      comment: "老闆態度是在差什麼",
      star: 2,
      create_time: "2022-02-06 10:06:07",
    },
    {
      id: 29,
      user_id: 5,
      products_id: 5,
      store_id: 1,
      comment: "老闆態度是在差什麼",
      star: 2,
      create_time: "2022-02-06 10:06:07",
    },
    {
      id: 30,
      user_id: 5,
      products_id: 6,
      store_id: 1,
      comment: "老闆態度是在差什麼",
      star: 2,
      create_time: "2022-02-06 10:06:07",
    },
    {
      id: 31,
      user_id: 6,
      products_id: 1,
      store_id: 1,
      comment: "有股臭味",
      star: 1,
      create_time: "2022-02-07 11:07:08",
    },
    {
      id: 32,
      user_id: 6,
      products_id: 2,
      store_id: 1,
      comment: "有股臭味",
      star: 1,
      create_time: "2022-02-07 11:07:08",
    },
    {
      id: 33,
      user_id: 6,
      products_id: 3,
      store_id: 1,
      comment: "有股臭味",
      star: 1,
      create_time: "2022-02-07 11:07:08",
    },
    {
      id: 34,
      user_id: 6,
      products_id: 4,
      store_id: 1,
      comment: "有股臭味",
      star: 1,
      create_time: "2022-02-07 11:07:08",
    },
    {
      id: 35,
      user_id: 6,
      products_id: 5,
      store_id: 1,
      comment: "有股臭味",
      star: 1,
      create_time: "2022-02-07 11:07:08",
    },
    {
      id: 36,
      user_id: 6,
      products_id: 6,
      store_id: 1,
      comment: "有股臭味",
      star: 1,
      create_time: "2022-02-07 11:07:08",
    },
    {
      id: 37,
      user_id: 7,
      products_id: 1,
      store_id: 1,
      comment: "不喜歡",
      star: 1,
      create_time: "2022-02-08 12:08:09",
    },
    {
      id: 38,
      user_id: 7,
      products_id: 2,
      store_id: 1,
      comment: "不喜歡",
      star: 1,
      create_time: "2022-02-08 12:08:09",
    },
    {
      id: 39,
      user_id: 7,
      products_id: 3,
      store_id: 1,
      comment: "不喜歡",
      star: 1,
      create_time: "2022-02-08 12:08:09",
    },
    {
      id: 40,
      user_id: 7,
      products_id: 4,
      store_id: 1,
      comment: "不喜歡",
      star: 1,
      create_time: "2022-02-08 12:08:09",
    },
    {
      id: 41,
      user_id: 7,
      products_id: 5,
      store_id: 1,
      comment: "不喜歡",
      star: 1,
      create_time: "2022-02-08 12:08:09",
    },
    {
      id: 42,
      user_id: 7,
      products_id: 6,
      store_id: 1,
      comment: "不喜歡",
      star: 1,
      create_time: "2022-02-08 12:08:09",
    },
    {
      id: 43,
      user_id: 8,
      products_id: 1,
      store_id: 1,
      comment: "少給東西",
      star: 2,
      create_time: "2022-02-09 01:09:10",
    },
    {
      id: 44,
      user_id: 8,
      products_id: 2,
      store_id: 1,
      comment: "少給東西",
      star: 2,
      create_time: "2022-02-09 01:09:10",
    },
    {
      id: 45,
      user_id: 8,
      products_id: 3,
      store_id: 1,
      comment: "少給東西",
      star: 2,
      create_time: "2022-02-09 01:09:10",
    },
    {
      id: 46,
      user_id: 8,
      products_id: 4,
      store_id: 1,
      comment: "少給東西",
      star: 2,
      create_time: "2022-02-09 01:09:10",
    },
    {
      id: 47,
      user_id: 8,
      products_id: 5,
      store_id: 1,
      comment: "少給東西",
      star: 2,
      create_time: "2022-02-09 01:09:10",
    },
    {
      id: 48,
      user_id: 8,
      products_id: 6,
      store_id: 1,
      comment: "少給東西",
      star: 2,
      create_time: "2022-02-09 01:09:10",
    },
    {
      id: 49,
      user_id: 9,
      products_id: 1,
      store_id: 1,
      comment: "老闆人超好~!",
      star: 5,
      create_time: "2022-02-10 02:10:11",
    },
    {
      id: 50,
      user_id: 9,
      products_id: 2,
      store_id: 1,
      comment: "老闆人超好~!",
      star: 5,
      create_time: "2022-02-10 02:10:11",
    },
    {
      id: 51,
      user_id: 9,
      products_id: 3,
      store_id: 1,
      comment: "老闆人超好~!",
      star: 5,
      create_time: "2022-02-10 02:10:11",
    },
    {
      id: 52,
      user_id: 9,
      products_id: 4,
      store_id: 1,
      comment: "老闆人超好~!",
      star: 5,
      create_time: "2022-02-10 02:10:11",
    },
    {
      id: 53,
      user_id: 9,
      products_id: 5,
      store_id: 1,
      comment: "老闆人超好~!",
      star: 5,
      create_time: "2022-02-10 02:10:11",
    },
    {
      id: 54,
      user_id: 9,
      products_id: 6,
      store_id: 1,
      comment: "老闆人超好~!",
      star: 5,
      create_time: "2022-02-10 02:10:11",
    },
    {
      id: 55,
      user_id: 10,
      products_id: 1,
      store_id: 1,
      comment: "這個價格吃到這個東西真的無可挑剔",
      star: 5,
      create_time: "2022-02-11 03:11:12",
    },
    {
      id: 56,
      user_id: 10,
      products_id: 2,
      store_id: 1,
      comment: "這個價格吃到這個東西真的無可挑剔",
      star: 5,
      create_time: "2022-02-11 03:11:12",
    },
    {
      id: 57,
      user_id: 10,
      products_id: 3,
      store_id: 1,
      comment: "這個價格吃到這個東西真的無可挑剔",
      star: 5,
      create_time: "2022-02-11 03:11:12",
    },
    {
      id: 58,
      user_id: 10,
      products_id: 4,
      store_id: 1,
      comment: "這個價格吃到這個東西真的無可挑剔",
      star: 5,
      create_time: "2022-02-11 03:11:12",
    },
    {
      id: 59,
      user_id: 10,
      products_id: 5,
      store_id: 1,
      comment: "這個價格吃到這個東西真的無可挑剔",
      star: 5,
      create_time: "2022-02-11 03:11:12",
    },
    {
      id: 60,
      user_id: 10,
      products_id: 6,
      store_id: 1,
      comment: "這個價格吃到這個東西真的無可挑剔",
      star: 5,
      create_time: "2022-02-11 03:11:12",
    },
  ],
};
const productsData = {
  data: [
    {
      id: 1,
      store_id: 1,
      category_id: 2,
      name: "螺絲奶香卷",
      img: "06e3a32e-4e54-4e4c-9b7b-20118d324ca7.jpeg",
      price: 50,
      amount: 5,
      description: "含3顆。",
      start_time: "00:00:00",
      due_time: "23:59:00",
      created_at: "2022-01-28 13:21:59",
      valid: 1,
      count: 10,
      score: "3.2",
    },
    {
      id: 2,
      store_id: 1,
      category_id: 2,
      name: "蠔皇叉燒包",
      img: "e4ee29b4-74e4-4da5-a386-c201f8afbec3.jpeg",
      price: 50,
      amount: 6,
      description: "含5顆。",
      start_time: "00:00:00",
      due_time: "23:59:00",
      created_at: "2022-01-28 13:21:59",
      valid: 1,
      count: 10,
      score: "3.2",
    },
    {
      id: 3,
      store_id: 1,
      category_id: 2,
      name: "上海小湯包",
      img: "698db362-808d-4f24-8523-fa16dc1ab8b8.jpeg",
      price: 50,
      amount: 0,
      description: "含5顆。",
      start_time: "00:00:00",
      due_time: "23:59:00",
      created_at: "2022-01-28 13:21:59",
      valid: 1,
      count: 10,
      score: "3.2",
    },
    {
      id: 4,
      store_id: 1,
      category_id: 2,
      name: "冰火菠蘿油",
      img: "ab5152a7-a177-4d61-8aa5-500ae14e425c.jpeg",
      price: 50,
      amount: 0,
      description: "100%紐西蘭天然進口奶油片，運送中會自然融化。",
      start_time: "00:00:00",
      due_time: "23:59:00",
      created_at: "2022-01-28 13:21:59",
      valid: 1,
      count: 10,
      score: "3.2",
    },
    {
      id: 5,
      store_id: 1,
      category_id: 2,
      name: "法蘭西多士",
      img: "dc96f530-297a-4cc7-a485-7bc9bd4c89cc.jpeg",
      price: 50,
      amount: 6,
      description: "含花生。",
      start_time: "00:00:00",
      due_time: "23:59:00",
      created_at: "2022-01-28 13:21:59",
      valid: 1,
      count: 10,
      score: "3.2",
    },
    {
      id: 6,
      store_id: 1,
      category_id: 2,
      name: "排骨XO醬炒飯",
      img: "8f7e76fb-6dcf-48b5-a3bf-5514252d9f21.jpeg",
      price: 70,
      amount: 6,
      description:
        "本店加入 X O 醬的香辣炒飯，搭配傳承30年的秘製排骨。排骨與炒飯，簡單的混搭，永遠是這麼的對味。",
      start_time: "00:00:00",
      due_time: "23:59:00",
      created_at: "2022-01-28 13:21:59",
      valid: 1,
      count: 10,
      score: "3.2",
    },
  ],
};
const mapData = {
  data: [
    {
      longitude: 24.962912068600176,
      latitude: 121.25388469744311,
    },
  ],
};
const storeLikeTotalData = {
  data: [
    {
      storeLikeTotal: 28,
    },
  ],
};
const productModalCommentData = {
  data: [
    {
      id: 55,
      comment: "這個價格吃到這個東西真的無可挑剔",
      star: 5,
      create_time: "2022-02-11 03:11:12",
      headshots: "/static/uploads/headshots/member-1646472678944.jpg",
      name: "小新",
    },
    {
      id: 49,
      comment: "老闆人超好~!",
      star: 5,
      create_time: "2022-02-10 02:10:11",
      headshots: "/static/uploads/headshots/member-1646472593397.jpg",
      name: "咪木",
    },]
};

let productModalData = {
  data: [
    {
      id: 1,
      store_id: 1,
      category_id: 2,
      name: "螺絲奶香卷",
      img: "06e3a32e-4e54-4e4c-9b7b-20118d324ca7.jpeg",
      price: 50,
      amount: 3,
      description: "含3顆。",
      start_time: "00:00:00",
      due_time: "23:59:00",
      created_at: "2022-01-28 13:21:59",
      valid: 1,
    },
  ],
};

describe("ProductsDetails", () => {
  test("openProductsModaltimeEnd  <=0", async () => {
    let productModalData = {
      data: [
        {
          id: 1,
          store_id: 1,
          category_id: 2,
          name: "螺絲奶香卷",
          img: "06e3a32e-4e54-4e4c-9b7b-20118d324ca7.jpeg",
          price: 50,
          amount: 0,
          description: "含3顆。",
          start_time: "00:00:00",
          due_time: "23:59:00",
          created_at: "2022-01-28 13:21:59",
          valid: 1,
        },
      ],
    };
    axiosMock.get
      .mockResolvedValueOnce(productModalCommentData)
      .mockResolvedValueOnce(productModalData);

    const { container } = render(
      <AuthContext.Provider value={{ loginMember: user }}>
        <ProductsDetails
          openProductsModaID={1}
          storeinOperation={false}
          openProductsModaltimeEnd={-1}
          setOpenProductsModal={jest.fn()}
          setisModalTouch={jest.fn()}
        />
      </AuthContext.Provider>
    );
    expect(container).toBeInTheDocument();
  });
  test("close button click", async () => {
    axiosMock.get
      .mockResolvedValueOnce(productModalCommentData)
      .mockResolvedValueOnce(productModalData);
    //  先帶入 ProductsDetails 所需要的 props and data

    const { queryByTestId } = render(
      <AuthContext.Provider value={{ loginMember: user }}>
        <ProductsDetails
          openProductsModaID={1}
          storeinOperation={jest.fn()}
          openProductsModaltimeEnd={34038}
          setOpenProductsModal={jest.fn()}
          setisModalTouch={jest.fn()}
        />
      </AuthContext.Provider>
    );
    await waitFor(() => {
      let productsCloseButton = queryByTestId("products-close");
      fireEvent.click(productsCloseButton);
    });
  });
  test("plus and mins button click", async () => {
    axiosMock.get
      .mockResolvedValueOnce(productModalCommentData)
      .mockResolvedValueOnce(productModalData);

    const { queryByTestId } = render(
      <AuthContext.Provider value={{ loginMember: user }}>
        <ProductsDetails
          openProductsModaID={1}
          storeinOperation={jest.fn()}
          openProductsModaltimeEnd={34038}
          setOpenProductsModal={jest.fn()}
          setisModalTouch={jest.fn()}
        />
      </AuthContext.Provider>
    );
    await waitFor(() => {
      let plusButton = queryByTestId("buy-num-plus");
      fireEvent.click(plusButton);
      fireEvent.click(plusButton);
      let minsButton = queryByTestId("buy-num-minus");
      fireEvent.click(minsButton);
      let addShoppingCarButton = queryByTestId("add-shopping-car");
      fireEvent.click(addShoppingCarButton);
    });
  });
});

// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
//   useParams: () => ({
//     storeId: "1",
//   }),
//   useRouteMatch: () => ({ url: "/tttt/1" }),
// }));
// it("aaa", async () => {
//   axiosMock.get
//     .mockResolvedValueOnce(storeData)
//     .mockResolvedValueOnce(storeCommentTotalData)
//     .mockResolvedValueOnce(productsData)
//     .mockResolvedValueOnce({
//       data: [
//         {
//           longitude: 24.962912068600176,
//           latitude: 121.25388469744311,
//         },
//       ],
//     })
//     .mockResolvedValueOnce({
//       data: [
//         {
//           storeLikeTotal: 28,
//         },
//       ],
//     });
//   const { container } = render(<Product />);
//   await waitFor(() => {
//     expect(container).toBeInTheDocument();
//   });

// expect(axiosMock.get).toHaveBeenCalledTimes(5);
// });
