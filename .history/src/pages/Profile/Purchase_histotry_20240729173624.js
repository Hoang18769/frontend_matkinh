import React,{useState,useEffect} from "react"
import { Link, NavLink, useParams } from "react-router-dom";
import { ProfileList } from "../../constants";
import axios from "axios";

const Purchase_history =()=>{
    const [history, setHistory] =useState([])
    const {id}=useParams()
    const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://matkinhcaolo.io.vn/api/customer/${id}/order-history`
          );
          //console.log(response);
          setHistory(response.data);
          console.log(history)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      useEffect(()=>{
        fetchData();
      },[])
      return
}
export default Purchase_history