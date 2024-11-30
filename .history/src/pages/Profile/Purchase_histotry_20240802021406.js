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
                {title} 
              </li>
            </NavLink>
          ))}
        </ul>
      </div>

      <div className="w-4/5 items-center px-8">
        <div className="flex px-8 py-4  justify-between bg-[#F5F5F3] rounded-md">
          {list.map((item) => (
            <label className="w-56 border py-4 text-center">{item}</label>
          ))}
        </div>
<div>

</div>
        
      </div>
    </div>
  );
};
export default Purchase_history;
