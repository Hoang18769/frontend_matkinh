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
        <Profile/>

    )}
export default Profile