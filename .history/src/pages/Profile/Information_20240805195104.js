import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { ProfileList } from "../../constants";
import axios from "axios";
const Information=()=>{
    const [customer, setCustomer]=useState({})
    let id = localStorage.getItem("id_customer");

    const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://matkinhcaolo.io.vn/api/customer/${id}`
          );
          //console.log(response);
          setCustomer(response.data);
          console.log(customer)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      useEffect(()=>{
        fetchData();
      },[])
      return(
        <div className="w-full flex px-8 py-8 gap-5">
             <div className="w-1/5 ">
        <ul>
          {ProfileList.map(({ id, title, link }) => (
            <NavLink
              key={id}
              to={`/profile/${link}`}
              //state={{ data: location.pathname.split("/")[1] }}
            >
              <li className=" py-5 font-normal hover:font-bold text-center px-4 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect ">
                {title} 
              </li>
            </NavLink>
          ))}
        </ul>
      </div>
            <div className="w-4/5 text-lg bg-[#F5F5F3] px-8 ">
                <label> Tên khách hàng: </label> <input id="name" readOnly="false" className=" font-mono text-xl px-8 tracking-wide" value={customer.name_customer}/><br/>
                 <label>Số điện thoại: </label> <input id="" readOnly="false" className="font-mono text-xl px-8 tracking-wide"value={customer.phone_customer}/><br/>
                <label>Email đăng ký: </label> <input id="" readOnly="false" className="font-mono text-xl px-8 tracking-wide" value={customer.email_customer}/><br/>
                <label>Địa chỉ: </label> <input id="" readOnly="false" className="font-mono text-xl px-8 tracking-wide" value={customer.address_customer}/><br/>
                <label>Ngày tạo tài khoản: </label> <input id="" readOnly="false" className="font-mono text-xl px-8 tracking-wide" value={customer.created_at}/><br/>

    <button>edit</button>

    </div>
        </div>
      )
}
export default Information