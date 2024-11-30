import React,{useState,useEffect} from "react"
import { Link, NavLink, useParams } from "react-router-dom";
import { ProfileList } from "../../constants";
import axios from "axios";



const Profile =()=>{
    const [order,setOrder]=useState({})
    const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://matkinhcaolo.io.vn/api/order/20`
          );
          console.log(response);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    return(
        <div className="w-1/5 sm:w-full sm:flex-col ">
        <ul>
          {ProfileList.map(({ id, title, link }) => (
            <NavLink
              key={id}
              to={`/profile/${link}`}
            >
              <li className=" py-5 font-bold text-xl hover:font-bold text-center px-4 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect ">
                {title} 
              </li>
            </NavLink>
          ))}
        </ul>
      </div>
    )}
export default Profile