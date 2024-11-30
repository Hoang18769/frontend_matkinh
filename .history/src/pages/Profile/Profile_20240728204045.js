import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const profileTab=["Thông tin chung","Thông tin cá nhân","Lịch sử đơn hàng"]
const Profile=()=>{
    return (
        <div className="w-full flex px-8 py-8 gap-5">
            <div className="w-1/5">
                <ul>
                    {profileTab.map((item)=>(
                        <Link>
                            <li className="border rounded-lg ">{item}</li>
                        </Link>
                    ))}

                </ul>
            </div>
            <div className="w-4/5 border">div 2</div>
        </div>
    )
}
export default Profile;