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
                <label> Tên khách hàng: </label> <input className=" font-mono text-xl px-8 tracking-wide" value={customer.name_customer}/><br/>
                 <label>Số điện thoại: </label> <input className="font-mono text-xl px-8 tracking-wide"value={customer.phone_customer}/><br/>
                <label>Email đăng ký: </label> <input className="font-mono text-xl px-8 tracking-wide" value={customer.email_customer}/><br/>
                <label>Địa chỉ: </label> <input className="font-mono text-xl px-8 tracking-wide" value={customer.address_customer}/>
    <div className="border py-10 border-black">

    </div>

    </div>
        </div>
      )
}
export default Information