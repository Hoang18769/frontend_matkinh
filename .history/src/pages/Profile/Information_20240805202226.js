import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { ProfileList } from "../../constants";
import axios from "axios";
const Information=()=>{
    const [customer, setCustomer]=useState({});
    const [edit,setEdit]=useState(false)
    let id = localStorage.getItem("id_customer");
 let handleEdit=()=>{
  setEdit(!edit)
 }
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
            <form className={{ edit ? 'bg-slate-400' : 'bg-slate-400	' }}>
            <label for="name"> Tên khách hàng: </label>
             <input id="name" className=" font-mono text-xl px-8 tracking-wide" readOnly="true" defaultValue={customer.name_customer}/><br/>
                 <label for="phone">Số điện thoại: </label>
                  <input id="phone"  className="font-mono text-xl px-8 tracking-wide" defaultValue={customer.phone_customer}/><br/>
                <label for="email">Email đăng ký: </label>
                 <input id="email"  className="font-mono text-xl px-8 tracking-wide" defaultValue={customer.email_customer}/><br/>
                <label for="address">Địa chỉ: </label>
                 <input id="address"  className="font-mono text-xl px-8 tracking-wide" defaultValue={customer.address_customer}/><br/>
                <label for="date">Ngày tạo tài khoản: </label> 
                <input id="date"  className="font-mono text-xl px-8 tracking-wide" value={customer.created_at}/><br/>

            </form>
             
    <button className="border w-12 h-12 my-4 px-8 text-center" onClick={handleEdit}>edit</button>

    </div>
        </div>
      )
}
export default Information