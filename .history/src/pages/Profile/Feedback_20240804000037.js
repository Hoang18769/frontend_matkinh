import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { ProfileList } from "../../constants";
import axios from "axios";

const Feedback=({state})=>{

    const items={state}
    console.log(item)
    return (
        <>
 <p>"feed back"</p>
 <div>{items.id_order}</div>
 {/* <div>{items.id_product}</div> */}

        </>
       
    )
}
export default Feedback