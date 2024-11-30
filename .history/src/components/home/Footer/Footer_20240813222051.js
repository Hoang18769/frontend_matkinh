import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";
import { HashLink } from 'react-router-hash-link';

import FooterListTitle from "./FooterListTitle";
import { paymentCard } from "../../../assets/images";
import Image from "../../designLayouts/Image";
import { Link } from "react-router-dom";

const Footer = () => {
  const [emailInfo, setEmailInfo] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const emailValidation = () => {
    return String(emailInfo)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscription = () => {
    if (emailInfo === "") {
      setErrMsg("Please provide an Email !");
    } else if (!emailValidation(emailInfo)) {
      setErrMsg("Please give a valid Email!");
    } else {
      setSubscription(true);
      setErrMsg("");
      setEmailInfo("");
    }
  };
  return (
    <div className="w-full bg-[#F5F5F3] py-20">
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2  xl:grid-cols-6 px-4 gap-10">
        <div className="col-span-2">
          <FooterListTitle title="Mắt Kính Cao Lỗ" />
          <div className="flex flex-col gap-6">
            <p className="text-base w-full xl:w-[80%]">
              Mắt Kính Cao Lỗ là một cửa hàng kính mắt uy tín tại Thành phố Hồ
              Chí Minh, chuyên cung cấp các sản phẩm kính mắt chất lượng cao với
              giá cả hợp lý.
            </p>
          </div>
        </div>
        <div>
          <FooterListTitle title="Shop" />
          <ul className="flex flex-col gap-2">
          
           <HashLink to="/#new_Arrivals"> <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Sản phẩm mới
            </li></HashLink>
            <HashLink to="/#bestSellers">
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Sản phẩm bán chạy
            </li>
            </HashLink>
           
          </ul>
        </div>
        <div>
          <FooterListTitle title="Về Mắt Kính Cao Lỗ " />
          <ul className="flex flex-col gap-2">
            <Link to="/about">
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Giới thiệu Mắt Kính Cao Lỗ
            </li>
            </Link>
            <Link to="/contact">
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Liên hệ
            </li>
            </Link>
           
          </ul>
        </div>
        <div className="col-span-2 flex flex-col items-center w-full px-4">
          <FooterListTitle
            title="Vì đôi mắt của người Việt"
          />
       
        </div>
      </div>
    </div>
  );
};

export default Footer;
