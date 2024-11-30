import React,{useState,useEffect} from "react"
import { Link, NavLink, useParams } from "react-router-dom";
import { ProfileList } from "../../constants";
import axios from "axios";



const Order_details =()=>{
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
    </div>)}
export default Order_details