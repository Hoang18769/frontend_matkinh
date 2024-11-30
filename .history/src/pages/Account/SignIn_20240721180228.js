import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';
import { jwtDecode } from "jwt-decode";
const clientId="596345282510-oim3ij1a843tj471pjo7h1ashlh52msv.apps.googleusercontent.com";

const SignIn = () => {
  const navigate = useNavigate();
  // const LoginGoogle = useGoogleLogin({
  //   onSuccess: async (response) =>{
  //       try{
  //           const res=await axios.get(
  //               "https://matkinhcaolo.io.vn/api/auth/google",
  //               {
  //                   headers:{
  //                       Authorization:`Bearer ${response.access_token}`,
  //                   },
  //               }
  //           );
  //           console.log(res);
  //       }catch (err){
  //           console.log(err);
  //       }
  //   },
  // });
  // ============= Initial State Start here =============
  const [login, setEmail] = useState("");
  const [password_account, setPassword] = useState("");
  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");

  // ============= Error Msg End here ===================
  const [successMsg, setSuccessMsg] = useState("");
  // ============= Event Handler Start here =============
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail(""); 
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  // ============= Event Handler End here ===============
  const handleSignUp = (e) => {
    console.log({ login, password_account });
    axios
      .post("https://matkinhcaolo.io.vn/api/login", {
        login: login,
        password_account: password_account,
      })
      .then((result) => {
        console.log(result.data);
        // alert("success");
   
       
        localStorage.setItem("currentToken", result.data.currentToken);
        console.log(result.data.currentToken)
        localStorage.setItem("id_account",result.data.account.id_account);
        swal("Success",result.data.message,"success");
         navigate("/");
       
      })
  
    e.preventDefault();

    if (!login) {
      setErrEmail("Enter your email");
    }

    if (!password_account) {
      setErrPassword("Create a password");
    } else if(password_account.length<6){
      errPassword.password_account="password not mathched"
    }
    // ============== Getting the value ==============
    if (login && password_account) {
      
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
  
        {successMsg ? (
          <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/cart">
              <button
                className="w-full h-10 bg-primeColor text-gray-200 rounded-md text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Shopping
              </button>
            </Link>
          </div>
        ) : (
          <form className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
                Đăng Nhập
              </h1>
              <div className="flex flex-col gap-3">
                {/* Email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Email hoặc tên tài khoản
                  </p>
                  <input
                    onChange={handleEmail}
                    value={login}
                    placeholder="Your email address"
                    class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  {errEmail && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errEmail}
                    </p>
                  )}
                </div>
                {/* Password */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Password
                  </p>
                  <input
                    onChange={handlePassword}
                    value={password_account}
                     placeholder="Your email address"
                    class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    type="password"
                   
                  />
                  {errPassword && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPassword}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleSignUp}
                  class="w-full px-3 py-3 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none duration-100 ease-in-out"
                >
                  Đăng nhập
                </button>
                <p className="text-sm text-center font-titleFont font-medium">
                 Bạn chưa có tài khoản?{" "}
                  <Link to="/signup">
                    <span className="hover:text-blue-600 duration-300">
                      Đăng ký ngay
                    </span>
                  </Link>
                </p>
                <p className="text-sm text-center font-titleFont font-medium">
                 Bạn quên mật khẩu?{" "}
                  <Link to="/sendmail">
                  <span className="hover:text-blue-600 duration-300">
                      Nhấn vào đây
                    </span>
                  </Link>
                </p>
                {/* <GoogleLogin onSuccess={credentialResponse=>{
                  const details=jwtDecode(credentialResponse.credential);
                  console.log(details)
                  console.log(credentialResponse);
                }}
                onError={()=>{
                  console.log('login fail')
                }}
                /> */}
              </div>
            </div>
          </form>
        )}
      </div>
  );
};

export default SignIn;