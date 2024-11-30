import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useParams, useLocation } from "react-router-dom";
import { ProfileList } from "../../constants";
import axios from "axios";

const Feedback=({state})=>{

    let location=useLocation();
    const item={state};
    console.log(location.)
    return (
        <>
 <p>"feed back"</p>
 <div>{item.id_order}</div>
 {/* <div>{items.id_product}</div> */}

        </>
       
    )
}
export default Feedback