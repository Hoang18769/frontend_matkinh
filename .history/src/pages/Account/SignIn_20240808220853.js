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
  // const LoginGoogle = useGoogleLogin({
  //   onSuccess: async (response) =>{
  //       try{
  //           const res=await axios.get(
  //               "https://matkinhcaolo.io.vn/api/auth/google",
  //               {
  //                   headers:{
  //                       Authorization:`"596345282510-oim3ij1a843tj471pjo7h1ashlh52msv.apps.googleusercontent.com"`,
  //                   },
  //               }
  //           );
  //           console.log(res+"run api");
  //       }catch (err){
  //           console.log(err+"fail api");
  //       }
  //   },
  // });
  const [loginUrl, setLoginUrl] = useState(null);

  useEffect(() => {
      fetch('https://matkinhcaolo.io.vn/api/auth/google', {
          headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
              'clientId':clientId
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
                <div>
                {loginUrl  != null && (
                    <a href={loginUrl}>Google Sign In</a>
                )}
              </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
