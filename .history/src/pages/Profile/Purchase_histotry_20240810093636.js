import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";
import { ProfileList } from "../../constants";
import axios from "axios";
import { list } from "../../constants";
import { status_order_List } from "../../constants";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Profile from "./Profile";

const Purchase_history = () => {
  const [history, setHistory] = useState([]);
  const [productShop, setProduct] = useState([]);
  const navigate = useNavigate();
  const handleFeedback = (item) => {
    console.log("idcustomer" + id, "id_order" + item.id_order + "-----");
    item.order_details?.map((item) =>
      console.log(
        "idproduct" + item.id_product,
        "idvariant" + item.id_product_variants
      )
    );
    navigate("feedback", { state: { item: item, id_customer: id } });
  };
  const handleDetail = (id) => {
    let item = document.getElementById(id);
    if (item.style.display === "none") {
      item.style.display = "block";
      // item.classList.add("flex");
      // item.classList.remove("hidden")
    } else item.style.display = "none";
  };

  var total;
  let id = localStorage.getItem("id_customer");
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://matkinhcaolo.io.vn/api/customer/${id}/order-history`
      );
      console.log("history",response);
      setHistory(response.data.orders);
      //  total=history.reduce((a,b)=> {return a+parseInt(b.total_order)})
      history.map((item) => console.log(typeof parseInt(item.total_order)));

      //   console.log(history)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData2 = async () => {
    try {
      const response = await axios.get(
        "https://matkinhcaolo.io.vn/api/product"
      );
      console.log(response);
      setProduct(response.data.results);

      //console.log("product" + productShop)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    console.log(parseInt(total));

    //fetchData2();
  }, []);
  return (
    <div className="w-full flex px-8 py-8 gap-5">
      {/* <div className="w-1/5 ">
        <ul>
          {ProfileList.map(({ id, title, link }) => (
            <NavLink
              key={id}
              to={`/profile/${link}`}
              //state={{ data: location.pathname.split("/")[1] }}
            >
              <li className=" py-5 font-bold text-xl hover:font-bold text-center px-4 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect ">
                {title} 
              </li>
            </NavLink>
          ))}
        </ul>
      </div> */}
      <Profile/>

      <div className="w-4/5 items-center px-8">
        <div className="flex px-8 py-4 font-bold text-lg bg-[#F5F5F3] rounded-md">
          {list.map((item) => (
            <label className="w-52 py-4  text-center">{item}</label>
          ))}
          <label className="invisible  w-52 py-4 ">hidden</label>
        </div>
        <div className=" ">
          {history.map((item) => (
            <div className=" rounded-md w-full border-b  px-8 items-center ">
              <div>
                <div className=" items-center flex justify-between">
                  <div className="w-full flex justify-between ">
                    <div
                      onClick={() => handleDetail(item.id_order)}
                      className="w-full"
                    >
                      <div className="flex py-4 rounded-md text-base items-center text-center hover:underline underline-offset-[4px] ">
                        <div className="w-52 px-4 py-2 ">{item.id_order}</div>
                        <div className="w-52 px-4 py-2 ">{item.date_order}</div>
                        <div className="w-52 px-4 py-2 ">
                          {item.total_order}
                        </div>
                        {status_order_List.map((items) =>
                          items.id === item.status_order ? (
                            <>
                              <div class=" px-6 py-4 text-blue-900 text-sm leading-5">
                                <span class="relative px-3 py-1 font-semibold text-green-900 leading-tight">
                                  <span
                                    aria-hidden
                                    class="absolute inset-0 bg-green-200 opacity-50 rounded-lg"
                                  ></span>
                                  <span class="relative text-sm">
                                    {items.desc}
                                  </span>
                                </span>
                              </div>
                            </>
                          ) : null
                        )}
                      </div>
                    </div>
                  </div>

                  {item.status_order === 4 &&
                  item.order_details.length === item.feedback.length ? (
                    <p>Bạn đã đánh giá rồi</p>
                  ) : item.status_order === 4 &&
                    item.order_details.length !== item.feedback.length ? (
                    <>
                      <div class="px-4 py-3 whitespace-no-wrap text-right text-sm ">
                        <button
                          onClick={() => handleFeedback(item)}
                          class="h-10 w-28 border-indigo-500 border text-indigo-500 rounded-md transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                        >
                          Đánh giá
                        </button>
                      </div>
                    </>
                  ) : item.status_order !== 4 ? null : null}
                </div>

                <div className="w-full ">
                  <div className="w-full bg-white">
                    <div
                      key={item.id_order}
                      id={item.id_order}
                      className="hidden"
                    >
                      <>
                      <div>
                        <p>Tên người nhận {item.name}</p>
                      </div>
                        <div className="flex w-full text-base font-semibold rounded-md justify-between items-center text-center bg-[#F5F5F3]">
                          <div className="invisible w-12 ">a</div>
                          <div className="w-56 border ">Tên sản phẩm</div>
                          <div className="w-44 border ">Màu</div>
                          <div className="w-44 border ">Kích cỡ</div>
                          <div className="w-44 border ">Số lượng</div>
                          <div className="w-44 border ">Giá</div>
                        </div>

                        {item.order_details?.map((item) => (
                          <div className="target:none w-full flex justify-between rounded-md items-center text-center border-b px- py-2	">
                            <img
                              className="w-12 h-12 border"
                              src={item.product.avt_product}
                              alt="productImage"
                            />
                            <div className="align-center px- w-56 border">
                              {item.product.name_product}
                            </div>
                            <div className="px- w-44 border">
                              {item.colors?.map((item) => item.desc_color)}
                            </div>
                            <div className="px- w-44 border">
                              {item.sizes?.map((item) => item.desc_size)}
                            </div>

                            <div className="px- w-44 border">
                              {item.quantity}
                            </div>
                            <div className="px- w-44 border">
                              {item.totalprice}
                            </div>
                          </div>
                        ))}
                      </>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Purchase_history;