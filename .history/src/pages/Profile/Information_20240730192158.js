import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { ProfileList } from "../../constants";
import axios from "axios";
const Information=()=>{
    const [customer, setCustomer]=useState({})
    const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://matkinhcaolo.io.vn/api/customer/${34}`
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
            <div className="w-1/5">
                <ul>
                {ProfileList.map(({id,title,link})=>(
                    <NavLink
                    key={id}
                    to={`/profile/${link}`}
                    //state={{ data: location.pathname.split("/")[1] }}
                    >
                        <li className="px-3 py-5 border rounded-lg"
                            >{title}</li>
                </NavLink >
                ))}
                </ul>
            </div>
            <div className="w-4/5 border text-lg ">
                <div> Tên khách hàng: <span className="font-mono text-xl px-8 tracking-wide">{customer.name_customer}</span> </div>
                <div>Số điện thoại: <span className="font-mono text-xl px-8 tracking-wide">{customer.name_customer}</span></div>
                <div>Email đăng ký: {customer.email_customer}</div>
                <div>Địa chỉ: {customer.address_customer}</div>
    <div className="border py-10 border-black">

    </div>

    </div>
        </div>
      )
}
export default Information