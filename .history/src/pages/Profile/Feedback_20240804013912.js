import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useParams, useLocation } from "react-router-dom";
import { ProfileList } from "../../constants";
import axios from "axios";

const Feedback = ({ state }) => {
  let location = useLocation(state);
  const item = location.state.item;
  const [feedback,setFeedback]=useState("")
  console.log(item);
  const id_customer = location.state.id_customer;

  return (
    <>
      <p>"feed back"</p>
      <div>id order {item.id_order}</div>
      <div>idcustomer {id_customer}</div>
      {item.order_details?.map((item) => (
        <div className="border ">
          <p className="text-red-300">feedback</p>
          <div className="flex">
            <img
              className="w-12 h-12 "
              src={item.product.avt_product}
              alt="productImage"
            />

            <div className="align-center px- w-44 ">
              {item.product.name_product}
            </div>
            <div className="px- w-20 ">
              {item.colors?.map((item) => item.desc_color)}
            </div>
            <div className="px- w-28 ">
              {item.sizes?.map((item) => item.desc_size)}
            </div>
            {/* <div>
              id_product {item.id_product},id_product_variants{" "}
              {item.id_product_variants}
            </div> */}
          </div>
          <input onChange={handleFeedBack} className="border w-96 h-48" type="text"/>

        </div>
      ))}
      {/* <div>{items.id_product}</div> */}
    </>
  );
};
export default Feedback;
