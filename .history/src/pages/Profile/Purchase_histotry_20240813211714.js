import React, { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { list } from "../../constants";
import { status_order_List } from "../../constants";
import Profile from "./Profile";

const Purchase_history = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  const handleFeedback = (item) => {

    navigate("feedback", { state: { item: item, id_customer: id } });
  };
  const handleDetail = (id) => {
    let item = document.getElementById(id);
    if (item.style.display === "none") {
      item.style.display = "block";

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
      // history.map((item) => console.log(typeof parseInt(item.total_order)));

      //   console.log(history)
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
    <div className="w-full flex  px-8 sm:px-0 py-8 lg:gap-5 sm:gap-0 ">
      <Profile/>

      <div className="w-4/5 sm:w-full items-center lg:px-4 sm:px-0">
        <div className="w-full flex justify-between lg:px-8 sm:px-0 py-4 font-bold text-lg bg-[#F5F5F3] rounded-md">
          {list.map((item) => (
            <label className="lg:w-52 sm:w-20 md:w-44 py-4  text-center">{item}</label>
          ))}
          <label className="invisible  lg:w-40 sm:w-12 py-4 ">hidden</label>
        </div>
        <div className="">
          {history.toReversed().map((item) => (
            <div className=" rounded-md w-full border-b lg:px-8 sm:px-0 items-center ">
                <div className="w-full items-center flex justify-between">
                  <div className="w-full flex justify-between ">
                    <div
                      onClick={() => handleDetail(item.id_order)}
                      className="w-full"
                    >
                      <div className="flex lg:px- py-4 rounded-md text-base items-center justify-between text-center hover:underline underline-offset-[4px] ">
                        <div className="lg:w-52  md:w-44 md:px-2 sm:w-20 lg:px-4 sm:px-0 py-2 ">{item.id_order}</div>
                        <div className="lg:w-52  md:w-44 md:px-2 sm:w-20 lg:px-4 sm:px-0 py-2 ">{item.date_order}</div>
                        <div className="lg:w-52  md:w-44 md:px-2 sm:w-20 lg:px-4 sm:px-0 py-2 ">
                          {parseInt(item.total_order)+parseInt(item.shippingfee)}
                        </div>
                     <div className="">
                     {status_order_List.map((items) =>
                          items.id === item.status_order ? (
                            <div className=" lg:w-52 flex justify-center">
                                <span class="relative lg:px-3 sm:px-0 py-3 font-semibold text-green-900 leading-tight">
                                  <span
                                    aria-hidden
                                    class="absolute inset-0 bg-green-200 opacity-50 rounded-lg"
                                  ></span>
                                  <span class="lg:w-52 relative text-sm">
                                    {items.desc}
                                  </span>
                                </span>
                            </div>
                          ) : null
                        )}
                     </div>
                      </div>
                    </div>
                  </div>

                <div className="w-1/5 items-center flex justify-center">
                {item.status_order === 4 &&
                  item.order_details.length === item.feedback.length ? (
                    <p class=" lg:w-48 sm:w-20 py-3 text-center  text-sm font-semibold rounded-lg bg-yellow-100 text-yellow-600">
                      Bạn đã đánh giá rồi
                    </p>
                  ) : item.status_order === 4 &&
                    item.order_details.length !== item.feedback.length ? (
                    <>
                      <div class="px-4 sm:px-0 py-3 whitespace-no-wrap text-right text-sm ">
                        <button
                          onClick={() => handleFeedback(item)}
                          class="h-10 lg:w-28 sm:w-20 border-indigo-500 border text-indigo-500 rounded-md transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                        >
                          Đánh giá
                        </button>
                      </div>
                    </>
                  ) : item.status_order !== 4 && 
                  <div class="lg:px-4 sm:px-0 py-3 sm:px-0 whitespace-no-wrap text-right text-sm ">
                        <button
                        disabled="true"
                          onClick={() => handleFeedback(item)}
                          class="disabled:opacity-50 h-10 lg:w-28 sm:w-20 border-indigo-500 border text-indigo-500 rounded-md transition duration-300  focus:outline-none"
                        >
                          Đánh giá
                        </button>
                      </div>}
                </div>
                </div>

                <div className="w-full ">
                  <div className="w-full bg-white">
                    <div
                      key={item.id_order}
                      id={item.id_order}
                      className="hidden"
                    >
                      <>
                      <div className="bg-white shadow-md rounded px-4 pt-4 pb-4 mb-4 my-2 ">
                      <div className="flex">
                      <p className="w-4/10 font-medium appearance-none flex items-center w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-2">
                          Tên người nhận:
                          <span className=" px-2 font-semibold tracking-wide font-titleFont">
                            {item.name_order}
                          </span>
                        </p>
                        <p className="w-3/10 font-medium appearance-none flex items-center w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 mx-4 px-2 mb-2">
                          Số điện thoại
                          <span className="font-bold px-4 tracking-wide font-titleFont">
                            {item.phone_order}
                          </span>
                        </p>
                        <p className="w-3/10 font-medium appearance-none flex items-center w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-4 mb-2">
                          Phí giao hàng
                          <span className="font-bold px-4 tracking-wide font-titleFont">
                            {item.shippingfee}
                          </span>
                        </p>
                      </div>
                        
                        <p className=" font-medium appearance-none flex items-center w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-4 mb-3">
                          Địa chỉ
                          <span className="px-4 font-semibold tracking-wide font-titleFont">
                            {item.address_order} {item.commune_order}{" "}
                            {item.district_order} {item.province_order}
                          </span>
                        </p>
                        
                        <p className="font-medium appearance-none flex items-center w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-4 mb-3">
                          Ghi chú
                          <span className="px-4 font-bold tracking-wide font-titleFont">
                            {item.note}
                          </span>
                        </p>
                        <div className="flex w-full text-base font-semibold rounded-md justify-between items-center text-center bg-[#F5F5F3]">
                          <div className="invisible w-12 ">a</div>
                          <div className="w-56 py-2 ">Tên sản phẩm</div>
                          <div className="w-44 py-2 ">Màu</div>
                          <div className="w-44 py-2 ">Kích cỡ</div>
                          <div className="w-44 py-2 ">Số lượng</div>
                          <div className="w-44 py-2 ">Giá</div>
                        </div>

                        {item.order_details?.map((item) => (
                          <div className="target:none w-full flex justify-between rounded-md items-center text-center border-b px- py-2	">
                            <img
                              className="w-12 h-12 font-medium"
                              src={item.product.avt_product}
                              alt="productImage"
                            />
                            <div className="align-center px- w-56 font-medium">
                              {item.product.name_product}
                            </div>
                            <div className="px- w-44 font-medium">
                              {item.colors?.map((item) => item.desc_color)}
                            </div>
                            <div className="px- w-44 font-medium">
                              {item.sizes?.map((item) => item.desc_size)}
                            </div>

                            <div className="px- w-44 font-medium">
                              {item.quantity}
                            </div>
                            <div className="px- w-44 border">
                              {item.totalprice}
                            </div>
                          </div>
                        ))}
                      </div>
                        
                      </>
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