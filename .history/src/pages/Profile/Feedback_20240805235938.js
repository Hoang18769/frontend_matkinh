import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useParams, useLocation } from "react-router-dom";
import { ProfileList } from "../../constants";
import axios from "axios";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import swal from "sweetalert";

const Feedback = ({ state }) => {
  let location = useLocation(state);
  const prop = location.state.item;
  const [feedback,setFeedback]=useState("");
  const [value, setValue] = React.useState(2);

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
        rating:value
    }).then(res=>{
        console.log(res);
        swal(res.data.message, "Cảm ơn bạn đã đánh giá sản phẩm", "success");
    }).catch(err=>{
        swal(err.response.data.error, "Bạn đã đánh giá sản phẩm này rồi", "error");
        console.log(err);


    })
  }
//   console.log(item);
  return (
    <div className=" border items-center">
      <div>id order {prop.id_order}</div>
      <div>idcustomer {id_customer}</div>
      <div>idvariant {id_customer}</div>

      {prop.order_details?.map((item) => (
        if(prop.feedback.some((item)=>(
          item.
        )))
        <div className="border items-center">
          <div className="flex justify-center items-center px-8 py-4">
            <img
              className="w-24 h-24 "
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
            <div>
              id_product {item.id_product},id_product_variants{" "}
              {item.id_product_variants}
            </div>
            <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          
        }}
      />
      {/* <Typography component="legend">Read only</Typography>
      <Rating name="read-only" value={value} readOnly />
      <Typography component="legend">Disabled</Typography>
      <Rating name="disabled" value={value} disabled />
      <Typography component="legend">No rating given</Typography>
      <Rating name="no-value" value={null} /> */}
    </Box>
    <textarea onChange={handleFeedBackText} className="border mx-4"  rows="4" cols="50" type="text"/>
    <input type="submit" value="Gửi đánh giá" onClick={()=>handleFeedBack(item)}/>
          </div>

        </div>
      ))}
      {/* <div>{items.id_product}</div> */}
    </div>
  );
};
export default Feedback;
