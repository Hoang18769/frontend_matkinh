import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ProfileList } from "../../constants";

const Profile=()=>{
    const location = useLocation()

    return (
        <div className="w-full flex px-8 py-8 gap-5">
            <div className="w-1/5">
                <ul>
                {ProfileList.map(({id,title,link})=>(
                    <NavLink
                    key={id}
                    to={link}
                    state={{ data: location.pathname.split("/")[1] }}
                    >
                        <li className="px-3 py-5 border rounded-lg"
                            >{title}</li>
                </NavLink >
                ))}
                </ul>
            </div>
            <div className="w-4/5 border">div 2</div>
        </div>
    )
}
export default Profile;