import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ProfileList } from "../../constants";

const Profile=()=>{
    return (
        <div className="w-full flex px-8 py-8 gap-5">
            <div className="w-1/5 border">
                <ul>
                {ProfileList.map((item)=>(
                    <NavLinkink to>
                <li>Thông tin chung</li>
                </NavLinkink>
                ))}

                </ul>
            </div>
            <div className="w-4/5 border">div 2</div>
        </div>
    )
}
export default Profile;