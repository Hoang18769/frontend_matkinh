import React,{useState,useEffect} from "react"
import { Link, NavLink, useParams } from "react-router-dom";
import { ProfileList } from "../../constants";
import axios from "axios";



const Order_details =()=>{
    const [order,setOrder]=useState({})
    const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://matkinhcaolo.io.vn/api/order/20`
          );
          console.log(response);
          //setOrder(response.data.orders);
        //   console.log(history)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      useEffect(()=>{
        fetchData();
      },[])
    return(
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
    )}
export default Pro