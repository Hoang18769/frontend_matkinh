import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const ResetPass = () => {

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errPass, setErrPass] = useState("");
  const [errPassword_confirmation, setErrPassword_confirmation] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  // ============= Event Handler Start here =============
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPass(""); 
  };
  const handlePasswordConfi = (e) => {
    setPasswordConfirmation(e.target.value);
    setErrPassword_confirmation("");
  };
 
  // ============= Event Handler End here ===============
  const handleReset = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    
    console.log({password,password_confirmation,token });
    axios
      .post("https://matkinhcaolo.io.vn/api/password/reset", {
        token:token,
        password: password,
        password_confirmation:password_confirmation
      }
      )
      .then((result) => {
        console.log(result.data);
        // alert("success");    
        console.log(token)  
        e.preventDefault();

      })
      .catch((error)=>{
        console.log(error)
      })
 
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      {successMsg ? (
          <div className="w-[500px]">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/">
              <button
                className="w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Đăng nhập
              </button>
            </Link>
          </div>
        ) : (
          <form className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
              Cấp lại mật khẩu
              </h1>
              <div className="flex flex-col gap-3">
                {/* Email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                  Password
                  </p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    type="password"
                    placeholder=""
                  />
                  {errPass && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPass}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                  password_confirmation
                  </p>
                  <input
                    onChange={handlePasswordConfi}
                    value={password_confirmation}
                   class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    type="password"
                    placeholder=""
                  />
                  {errPassword_confirmation && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPassword_confirmation}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleReset}
                 class="w-full px-3 py-3 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none duration-100 ease-in-out"
                >
                  Gửi
                </button>
              </div>
            </div>
          </form>
           )}
      </div>
  );
};

export default ResetPass;