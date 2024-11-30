import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useParams, useLocation } from "react-router-dom";
import { ProfileList } from "../../constants";
import axios from "axios";

const Feedback = ({ state }) => {
  let location = useLocation(state);
  const item = location.state.item;
  console.log(item);
  const id_customer = location.state.id_customer;

  return (
    <>
      <p>"feed back"</p>
      <div>id order {item.id_order}</div>
      <div>idcustomer {id_customer}</div>
      {item.order_details?.map((item) => (
        <>

        </>
       
      ))}
      {/* <div>{items.id_product}</div> */}
    </>
  );
};
export default Feedback;
