import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Profile=()=>{
    return (
        <div className="w-full flex px-8 py-8 gap-5">
            <div className="w-1/5 border">
                <ul>
                <Link>
                <li>Thông tin chung</li>
                </Link>
                    <li>Thông tin cá nhân</li>
                    <li>Lịch sử đơn hàng</li>
                    <li></li>

                </ul>
            </div>
            <div className="w-4/5 border">div 2</div>
        </div>
    )
}
export default Profile;