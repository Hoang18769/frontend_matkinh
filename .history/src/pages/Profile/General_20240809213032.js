import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { ProfileList } from "../../constants";
import axios from "axios";
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
            <div className="w-4/5 px-8">
                <div>{customer.name_customer}</div>
                <div>{customer.phone_customer}</div>
                <div>{customer.email_customer}</div>
                <div>{customer.address_customer}</div>
    <div className="border py-10 border-black">

    </div>
                <div>Tổng số tiền đã mua: </div>
    </div>
        </div>
    
)   
}
export default General;