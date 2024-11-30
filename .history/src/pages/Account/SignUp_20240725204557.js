import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";


const SignUp = () => {
  // ============= Initial State Start here =============
  const [name_account, setname_account] = useState("");
  const [phone_customer, setPhone] = useState("");
  const [password_account, setPassword] = useState("");
  const [address_customer, setAddress] = useState("");
  const [name_customer, setNameCus] = useState("");
  const [email_customer, setemail_accountCus] = useState("");
  const [idGoogle, setidGoogle] = useState("0");
  const [idFB, setidFB] = useState("0");
  const [checked, setChecked] = useState(false);
  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errname_account, setErrname_account] = useState("");
  const [erremail_account, setErremail_account] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errAddress, setErrAddress] = useState("");
  const [errName, setErrNameCus] = useState("");
  const [erremail_accountCus, setErremail_accountCus] = useState("");

  // ============= Error Msg End here ===================
  const [successMsg, setSuccessMsg] = useState("");
  // ============= Event Handler Start here =============
  const handleName = (e) => {
    setname_account(e.target.value);
    setErrname_account("");
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
    setErrPhone("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
    setErrAddress("");
  };
  const handleNameCus = (e) => {
    setNameCus(e.target.value);
    setErrNameCus("");
  };
  const handleEmail = (e) => {
    setemail_accountCus(e.target.value);
    setErremail_accountCus("");
  };


  // ============= Event Handler End here ===============

 
  const handleSignUp = (e) => {
    console.log({
      name_account,
      password_account,
      name_customer,
      email_customer,
      phone_customer,
      address_customer,
   
    });
    axios
      .post("https://matkinhcaolo.io.vn/api/register", {
        name_account: name_account,
        password_account: password_account,
        name_customer: name_customer,
        email_customer:email_customer,
        phone_customer: phone_customer,
        address_customer: address_customer
      })
      .then((result) => {
        console.log(result.data);
        // swal("Success",result.data.message,"success");
        // alert("success");
      })
     
    e.preventDefault();
    if (checked) {
      if (!name_account) {
        setErrname_account("Vui lòng nhập tên tài khoản");
      }
      
      if (!phone_customer) {
        setErrPhone("Vui lòng nhập số điện thoại");
      }
      if (!password_account) {
        setErrPassword("Vui lòng nhập mật khẩu");
      } else {
        if (password_account.length < 6) {
          setErrPassword("Mật khẩu phải từ 6 kí tự");
        }
      }
      if (!address_customer) {
        setErrAddress("Vui lòng nhập địa chỉ");
      }
      if (!name_customer) {
        setErrNameCus("Vui lòng nhập khách hàng");
      }
      if (!email_customer) {
        setErremail_accountCus("Enter the email_account Cus");
      }
 
      // ============== Getting the value ==============
      if (
        name_account &&
        password_account &&
        password_account.length >= 6 &&
        address_customer &&
        name_customer &&
        email_customer 
      ) {
        setSuccessMsg(
          `Xin chào ${name_account}, Chào mừng bạn đến với Mắt kinh cao lỗ`
        );
        setname_account("");
        setPhone("");
        setPassword("");
        setAddress("");
        setNameCus("");
        setemail_accountCus("");
       
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
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
          <form className="w-full lgl:w-[500px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                Đăng Ký
              </h1>
              <div className="flex flex-col gap-3">
                {/* client name */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Tên tài khoản
                  </p>
                  <input
                    onChange={handleName}
                    value={name_account}
                     class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    type="text"
                    placeholder="DungHoang"
                  />
                  {errname_account && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errname_account}
                    </p>
                  )}
                </div>
                
                {/* Phone Number */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Số điện thoại 
                  </p>
                  <input
                    onChange={handlePhone}
                    value={phone_customer}
                    class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    type="text"
                    placeholder="0199678989"
                  />
                  {errPhone && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPhone}
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
                    class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    type="password"
                    placeholder="Create password"
                  />
                  {errPassword && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPassword}
                    </p>
                  )}
                </div>
                {/* Address */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Địa chỉ
                  </p>
                  <input
                    onChange={handleAddress}
                    value={address_customer}
                     class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    type="text"
                    placeholder="190 cao lo tphcm"
                  />
                  {errAddress && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errAddress}
                    </p>
                  )}
                </div>
                {/* City */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Tên khách hàng
                  </p>
                  <input
                    onChange={handleNameCus}
                    value={name_customer}
                    class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    type="text"
                    placeholder="Hồ Hoàng Dung"
                  />
                  {errName && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errName}
                    </p>
                  )}
                </div>
                {/* Country */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                  Email khách hàng
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email_customer}
                    class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    type="text"
                    placeholder="exampleemail@gmail.com"
                  />
                  {erremail_accountCus && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {erremail_accountCus}
                    </p>
                  )}
                </div>
                
                {/* Checkbox */}
                <div className="flex items-start mdl:items-center gap-2">
                  <input
                    onChange={() => setChecked(!checked)}
                    className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer"
                    type="checkbox"
                  />
                  <p className="text-sm text-primeColor">
                    I agree to the Mat Kinh Cao Lo{" "}
                    <span className="text-blue-500">Terms of Service </span>and{" "}
                    <span className="text-blue-500">Privacy Policy</span>.
                  </p>
                </div>
                <button
                  onClick={handleSignUp}
                  className={`${
                    checked
                      ? "bg-primeColor hover:bg-indigo-600 hover:text-white cursor-pointer"
                      : "bg-gray-500 hover:bg-gray-500 hover:text-gray-200 cursor-none"
                  } w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
                >
                 Tạo tài khoản
                </button>
                <p className="text-sm text-center font-titleFont font-medium">
                 Bạn đã có tài khoản?{" "}
                  <Link to="/signin">
                    <span className="hover:text-blue-600 duration-300">
                      Đăng nhập ngay
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
