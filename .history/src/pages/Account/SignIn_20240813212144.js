import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
const clientId =
  "596345282510-oim3ij1a843tj471pjo7h1ashlh52msv.apps.googleusercontent.com";

const SignIn = () => {
  const navigate = useNavigate();
  const [loginUrl, setLoginUrl] = useState(null);

  useEffect(() => {
      fetch('https://matkinhcaolo.io.vn/api/auth/google', {
          headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'prompt':"consent"
        
              }
      })
          .then((response) => {
              if (response.ok) {
                  return response.json();
              }
              throw new Error('Something went wrong!');
          })
          .then((data) => setLoginUrl( data.url ))
          .catch((error) => console.error(error));
  }, []);
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
    e.preventDefault();
    if (!login && !password_account) {
      setErrEmail("Vui lòng nhập email");
      setErrPassword("Mật khẩu không được để trống");
    } else if (!password_account) {
      setErrPassword("Mật khẩu không được để trống");
    } else if (password_account.length < 6) {
      {
        setErrPassword("Passwords phải từ 6 kí tự");
      }
    }
    // ============== Getting the value ==============

    //console.log({ login, password_account });
    // window.localStorage.setItem("currentToken", true);
    else
      axios
        .post("https://matkinhcaolo.io.vn/api/login", {
          login: login,
          password_account: password_account,
        })
        .then((result) => {
          console.log(result.data);
          localStorage.setItem("currentToken", result.data.currentToken);
          console.log(result.data.currentToken);
          localStorage.setItem("id_account", result.data.account.id_account);
          localStorage.setItem("id_customer",result.data.customer.id_customer);
          if (login && password_account) {
            setEmail("");
            setPassword("");
          }
          swal("Success", result.data.message, "success");
          
          // if(navigate(-1)==="/cart"){
          //   navigate("paymentgateway")
          // }
          // else
            navigate(-1);
        })
        .catch((error) => {
          if (error.response.request.status === 401) {
            //alert("Sai tên tài khoản hoặc mật khẩu vui lòng thử lại");
            setErrEmail("Thong tin sai");
            setErrPassword("Thong tin sai");
            setEmail({ login }.login);
            setPassword({ password_account }.password_account);
          } else if (error.response.request.status === 422) {
            setErrPassword("Co loi xay ra, vui long thu lai");
            setEmail({ login }.login);
            setPassword({ password_account }.password_account);
          
          }
          console.log(error);
        });
    e.preventDefault();
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
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
            {/* <GoogleLogin
            clientId={clientId}
             onSuccess={res=>{
                  const details=jwtDecode(res.credential);
                  console.log("onsuccess")
                  const { name, sub, email }=details;
                  const doc = {
                    _id: sub,
                    _type: 'user',
                    userName: name,
                    email:email,
                  }
                  console.log("doc",doc)
                  // navigate("/auth/google")
                }}
                onError={()=>{
                  console.log('login fail')
                }}
                // onClick={LoginGoogle}
                />  */}
                <div class="flex justify-center space-x-4 w-70 mt-4">
            <span class="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
            <span class="flex-none uppercase text-xs text-gray-400 font-semibold">HOẶC</span>
            <span class="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
        </div>
            <div className="flex justify-center">
              {loginUrl != null && (
                <div className=" items-center border rounded-lg w-fit px-5 border-gray-300 hover:border-gray-500 ">
                  <a className="flex items-center" href={loginUrl}>
                    {" "}
                    <svg
                      class="w-5 h-5 sm:h-6 sm:w-6 mx-2 my-4 "
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_3033_94454)">
                        <path
                          d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3276 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.50253 14.3003C4.99987 12.8099 4.99987 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z"
                          fill="#FBBC04"
                        />
                        <path
                          d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z"
                          fill="#EA4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3033_94454">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>{" "}
                    Đăng nhập Google{" "}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
