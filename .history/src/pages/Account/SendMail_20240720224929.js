import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
const SendMail = () => {
  const navigate = useNavigate();
  const [email_account, setEmail] = useState("");
  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errEmail, setErrEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  // ============= Event Handler Start here =============
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const email_accountValidation = (email_account) => {
    return String(email_account)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };
  // ============= Event Handler End here ===============
  const handleSendMail = (e) => {
    console.log({ email_account });
    axios
      .post("https://matkinhcaolo.io.vn/api/password/email", {
        email_account: email_account,
      })
      .then((result) => {
        console.log(result.data);
        // alert("success");

        localStorage.setItem(
          "token",
          result.data.token
        );
        console.log(result.data.token);
      });

    e.preventDefault();

    if (!email_account) {
      setErrEmail("Enter your email_account");
    } else {
      if (!email_accountValidation(email_account)) {
        setErrEmail("Enter a Valid email_account");
      }
    }
    if (email_account && email_accountValidation(email_account)) {
      setSuccessMsg(
        `Xin chào ${email_account}, Chào mừng bạn đến với Mắt kinh cao lỗ`
      );
      setEmail("");
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      {successMsg ? (
        <div className="w-[500px]">
          <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
            {successMsg}
          </p>
          <Link to="/signin">
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
          
            <div class="container sm:mt-40 mt-24 my-auto max-w-md border-2 border-gray-200 p-3 bg-white">
              <div class="text-center m-6">
                <h1 class="text-3xl font-semibold text-gray-700">
                  Forgot your password?
                </h1>
                <p class="text-gray-500">
                  Just enter your email address below and we'll send you a link
                  to reset your password!
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {/* Email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Nhập email để lấy lại mật khẩu
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email_account}
                    type="email"
                    name="email"
                    id="email"
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
                <button
                  onClick={handleSendMail}
                 class="w-full px-1 py-3 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none duration-100 ease-in-out"
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

export default SendMail;
