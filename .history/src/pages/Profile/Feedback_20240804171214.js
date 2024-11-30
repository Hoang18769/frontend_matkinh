import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useParams, useLocation } from "react-router-dom";
import { ProfileList } from "../../constants";
import axios from "axios";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
const Feedback = ({ state }) => {
  let location = useLocation(state);
  const prop = location.state.item;
  const [feedback,setFeedback]=useState("");
  const id_customer = location.state.id_customer;
  let handleFeedBackText=(e)=>{
    setFeedback(e.target.value);
    console.log(feedback);
  };
  let handleFeedBack=(item)=>{
    axios.post("https://matkinhcaolo.io.vn/api/feedback-add",{
        id_customer:id_customer,
        id_product:item.product.id_product,
        id_order:prop.id_order,
        id_product_variants:item.id_product_variants,
        comment:feedback, 
        rating:5
    }).then(res=>{
        console.log(res);
    }).catch(err=>{
        console.log(err);
    })
  }
//   console.log(item);

  return (
    <>
      <div>id order {prop.id_order}</div>
      <div>idcustomer {id_customer}</div>
      <div>idvariant {id_customer}</div>

      {prop.order_details?.map((item) => (
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
            <div className="rating">
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input
    type="radio"
    name="rating-2"
    className="mask mask-star-2 bg-orange-400"
    defaultChecked />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
</div>
          </div>
          <textarea onChange={handleFeedBackText} className="border w-96 h-48" type="text"/>
<input type="submit" value="Gửi đánh giá" onClick={()=>handleFeedBack(item)}/>
        </div>
      ))}
      {/* <div>{items.id_product}</div> */}
    </>
  );
};
export default Feedback;
