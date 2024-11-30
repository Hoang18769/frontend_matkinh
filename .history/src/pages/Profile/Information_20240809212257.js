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
            <div className="w-4/5 text-lg bg-[#F5F5F3] px-8 " >
            <form >
            <label>{edit?"true":"false"}</label>
            <label for="name"> Tên khách hàng: </label>
            <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-state"
          >
            Tên khách hàng
          </label>
          <input
            id="name"
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
            readOnly="true"
            defaultValue={customer.name_customer}
          />
          <br />
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-state"
          >
            Số điện thoại
          </label>
          <input
            id="phone"
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
            defaultValue={customer.phone_customer}
          />
          <br />
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-state"
          >
            Email đăng ký
          </label>
          <input
            id="email"
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
            defaultValue={customer.email_customer}
          />
          <br />
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-state"
          >
            Địa chỉ
          </label>
          <input
            id="address"
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
            defaultValue={customer.address_customer}
          />
          <br />
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-state"
          >
            Ngày tạo tài khoản
          </label>
          <input
            id="date"
            className="font-mono text-xl px-8 tracking-wide"
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
            value={customer.created_at}
          />
          <br />
            </form>
             
            <button
                  type="submit"
                  value="Gửi đánh giá"
                  onClick={handleEdit}
                  class="group relative h-10 w-44 overflow-hidden rounded-md bg-indigo-500 text-lg font-bold text-white"
                >
                  Sửa
                  <div class="absolute inset-0 h-full w-full scale-0 rounded-md transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                </button>

    </div>
        </div>
      )
}
export default Information