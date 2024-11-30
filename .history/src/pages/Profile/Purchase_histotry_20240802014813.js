import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { ProfileList } from "../../constants";
import axios from "axios";
import { list } from "../../constants";
import { status_order_List } from "../../constants";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const Purchase_history = () => {
  const [history, setHistory] = useState([]);
  const [productShop, setProduct] = useState([]);
  const [show, setShow] = useState(false);
  const showDetail = useRef();
  const handleDetail = () => {
    setShow(!show);
    console.log(show);
  };

  var total = [];
  let price = 0;
  let id = localStorage.getItem("id_customer");
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://matkinhcaolo.io.vn/api/customer/${id}/order-history`
      );
      console.log(response);
      setHistory(response.data.orders);
      history.forEach((item) =>
        console.log(
          parseInt(item.total_order),
          total.push(parseInt(item.total_order))
          //total+=parseInt(item.total)
        )
      );

      //   console.log(history)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  total.forEach((item) => (price += item));
  console.log(price);
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
    //fetchData2();
  }, []);
  return (
    <div className="w-full flex px-8 py-8 gap-5">
      <div className="w-1/5">
        <ul>
          {ProfileList.map(({ id, title, link }) => (
            <NavLink
              key={id}
              to={`/profile/${link}`}
              //state={{ data: location.pathname.split("/")[1] }}
            >
              <li className="px-3 py-5 border rounded-lg">
                {title} +{total}
              </li>
            </NavLink>
          ))}
        </ul>
      </div>

      <div className="w-4/5 items-center px-8">
        <div className="flex px-8 py-4  justify-between bg-[#F5F5F3] rounded-md">
          {list.map((item) => (
            <label className="w-56 px-4 py-4">{item}</label>
          ))}
        </div>

        {history.map((item) => (
          <div className=" rounded-md" >
            <Menu>

                  <MenuButton className="w-full" >
                  <div className="flex  py-4 border-b rounded-md justify-between">
                <div className="w-56 px-4 py-2">{item.id_order}</div>
                <div className="w-56 px-4 py-2">{item.date_order}</div>
                <div className="w-56 px-4 py-2">{item.total_order}</div>
                {
                  status_order_List.map((items)=>(
                    (items.id===item.status_order?<>
                      <div className="w-56 px-4 py-2">{items.desc} </div>
                    </>:null)
                  ))
                }
                <div>
                
                </div>
              </div>
                   </MenuButton>

              <div className="w-full">
              <MenuItems anchor="bottom"  className="z-10 w-[75%] flex-1 w-4/5 mr-20 ">
                <MenuItem className="block bg-white">
                  <div className=" ">
                    <>
                    <div className="flex justify-between px-8 items-center bg-[#F5F5F3]">
                      <div className="invisible w-20">a</div>
                      <div className="w-60">Tên sản phẩm</div>
                      <div className="w-60">Màu</div>
                      <div className="w-60">Kích cỡ</div>
                      <div className="w-60">Số lượng</div>
                      <div className="w-60">Giá</div>
                    </div>

                   

                      {item.order_details?.map((item) => (
                        <div
                          id={item.id_order}
                          className="w-full flex justify-between items-center border-b px-4 py-2	"
                        >
                          <img
                            className="w-12 h-12 "
                            src={item.product.avt_product}
                            alt="productImage"
                          />
                          <div className="align-center px-2 w-60">
                            {item.product.name_product}
                          </div>
                          <div className="px-2 w-60">
                            {item.colors?.map((item) => item.desc_color)}
                          </div>
                          <div className="px-2 w-60">
                            {item.sizes?.map((item) => item.desc_size)}
                          </div>
                          <div className="px-2 w-60">{item.quantity}</div>
                          <div className="px-2 w-60">{item.totalprice}</div>
                        </div>
                      ))}
                    </>
                  </div>
                </MenuItem>
              </MenuItems>
              </div>
            </Menu>

          </div>
        ))}
      </div>
    </div>
  );
};
export default Purchase_history;
