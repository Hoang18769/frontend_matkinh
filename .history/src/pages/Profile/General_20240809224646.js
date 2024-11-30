import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { ProfileList } from "../../constants";
import axios from "axios";
import Profile from "./Profile";
const General=()=>{

    //const {id}=useParams()
    const [customer, setCustomer]=useState({})
    const [history, setHistory] =useState([])
    let id=localStorage.getItem("id_customer")
    let total=0;
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
        //fetchData2();
      },[])
return(
    <div className="w-full flex px-8 py-8 gap-5">
              {/* <div className="w-1/5 ">
        <ul>
          {ProfileList.map(({ id, title, link }) => (
            <NavLink
              key={id}
              to={`/profile/${link}`}
              //state={{ data: location.pathname.split("/")[1] }}
            >
              <li className=" py-5 font-bold text-xl hover:font-bold text-center px-4 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect ">
                {title} 
              </li>
            </NavLink>
          ))}
        </ul>
      </div> */}

      <div className="w-4/5 px-8">
        <div class="form-item">
          <label class="text-xl ">Họ tên khách hàng</label>
          <div class="w-full inline-flex border">
            <div class="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
              <svg
                fill="none"
                class="w-6 text-gray-400 mx-auto"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <input
              type="email"
              value={customer.name_customer}
              class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
              placeholder="email@example.com"
              disabled
            />
          </div>
        </div>
        <div class="form-item">
          <label class="text-xl ">Số điện thoại khách hàng</label>
          <div class="w-full inline-flex border">
            <div class="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
              <svg
                fill="none"
                class="w-6 text-gray-400 mx-auto"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <input
              type="email"
              value={customer.phone_customer}
              class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
              placeholder="email@example.com"
              disabled
            />
          </div>
        </div>
        <div class="form-item">
          <label class="text-xl ">Email khách hàng</label>
          <div class="w-full inline-flex border">
            <div class="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
              <svg
                fill="none"
                class="w-6 text-gray-400 mx-auto"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <input
              type="email"
              value={customer.email_customer}
              class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
              placeholder="email@example.com"
              disabled
            />
          </div>
        </div>
        <div class="form-item">
          <label class="text-xl ">Địa chỉ khách hàng</label>
          <div class="w-full inline-flex border">
            <div class="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
              <svg
                fill="none"
                class="w-6 text-gray-400 mx-auto"
                viewBox="0 0 24 24"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    d="m7.07935,0.05664c-3.87,0 -7,3.13 -7,7c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zm-5,7c0,-2.76 2.24,-5 5,-5s5,2.24 5,5c0,2.88 -2.88,7.19 -5,9.88c-2.08,-2.67 -5,-7.03 -5,-9.88z"
                    id="svg_2"
                  ></path>
                  <circle cx="7.04807" cy="6.97256" r="2.5" id="svg_3"></circle>
                </g>
              </svg>
            </div>
            <input
              type="email"
              value={customer.address_customer}
              class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
              placeholder="email@example.com"
              disabled
            />
          </div>
        </div>
        <div class="form-item">
          <label class="text-xl ">Tổng tiền đã mua</label>
          <input
            type="text"
            class="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2  mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200"
            disabled
          />
        </div>
      </div>
        </div>
    
)   
}
export default General;