import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useParams, useLocation } from "react-router-dom";
import { ProfileList } from "../../constants";
import axios from "axios";

const Feedback = ({ state }) => {
  let location = useLocation(state);
  const item = location.state.item;
  const [feedback,setFeedback]=useState("");

  let handleFeedBackText=(e)=>{
    setFeedback(e.target.value);
    console.log(feedback);
  };
  let handleFeedBack()=>{
    axios.post(" axios
      .post("https://matkinhcaolo.io.vn/api/orders", {
        name_order: name_order,
        email_order: email_order,
        phone_order: phone_order,
        address_order: address_order,
        commune_order: commune_order,
        province_order: province_order,
        district_order: district_order,
        note: note,
        total_order: totalAmt,
        shippingfee: shippingCharge,
        id_discount: id_Discount,
        id_payment: 1,
        order_list: products,
        id_customer: id_account,
      })
      .then((result) => {
        dispatch(resetCart());
        console.log(result.data);
        //alert("success");
        swal("Success", result.data.message, "success");
        navigate("/")
      })
      .catch((error) => {
        let failedProduct=''
        if(error.response.request.status===400){
          error.response.data.product_variant?.map((item)=>(
            failedProduct+=item.name_product +" "+ item.id_variant+" số lượng còn lại: "+item.quantity+"\n"
          ))
          swal(error.response.data.message, failedProduct, "error");
        }
        //alert("service error");
        console.log(error);
      });")
  }
//   console.log(item);
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
          <textarea onChange={handleFeedBackText} className="border w-96 h-48" type="text"/>
<input type="submit" value="Gửi đánh giá" onClick={handleFeedBack}/>
        </div>
      ))}
      {/* <div>{items.id_product}</div> */}
    </>
  );
};
export default Feedback;
