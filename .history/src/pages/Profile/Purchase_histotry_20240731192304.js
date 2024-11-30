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

      <div className="w-4/5 items-center">
        <div className="flex px-8 py-4 border justify-between">
          {list.map((item) => (
            <label className=" px-4 py-4">{item}</label>
          ))}
        </div>

        {history.map((item) => (
          <div >
            <Menu>
              <div className="flex px-8 py-4 border justify-between">
                <div className=" px-4 py-2">{item.id_order}</div>
                <div className=" px-4 py-2">{item.date_order}</div>
                <div className=" px-4 py-2">{item.total_order}</div>
                <div className=" px-4 py-2">{item.status_order} </div>
                <div>
                
                  <MenuButton className=" px-4 py-2">Xem chi tiết </MenuButton>
                </div>
              </div>

              <div className="w-full">
              <MenuItems anchor="bottom" className="flex-1 w-4/5 mr-10 mx-10">
                <MenuItem className="block bg-white">
                  <div className=" ">
                    <>
                      {item.order_details?.map((item) => (
                        <div
                          id={item.id_order}
                          className="w-full flex justify-between border-b px-4 py-2	"
                        >
                          <img
                            className="w-12 h-12"
                            src={item.product.avt_product}
                            alt="productImage"
                          />
                          <div className="align-center px-2">
                            {item.product.name_product}
                          </div>
                          <div className="px-2">
                            {item.colors?.map((item) => item.desc_color)}
                          </div>
                          <div className="px-2">
                            {item.sizes?.map((item) => item.desc_size)}
                          </div>
                          <div className="px-2">{item.quantity}</div>
                          <div className="px-2">{item.totalprice}</div>
                        </div>
                      ))}
                    </>
                  </div>
                </MenuItem>
              </MenuItems>
              </div>
            </Menu>

            <div id="dropdown"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Purchase_history;
