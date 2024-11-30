import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useParams, useLocation } from "react-router-dom";
import { ProfileList } from "../../constants";
import axios from "axios";

const Feedback=({state})=>{

    let location=useLocation(state);
    const item={location.state};
    console.log(item)
    const id_customer=location.state.id_customer

    return (
        <>
 <p>"feed back"</p>
 <div>{item.id_order}</div>
 <div>{id_customer}</div>
 {/* <div>{items.id_product}</div> */}

        </>
       
    )
}
export default Feedback