import React ,{ useEffect, useState }from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import axios from "axios";
import { toast } from "react-toastify";
import {  BsSuitHeartFill } from "react-icons/bs";
//carousel
const NewArrivals = ({props}) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed: 3500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    easing: "linear",
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  const [productShop, setProduct] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://matkinhcaolo.io.vn/api/products"
      );
      console.log(response);
      setProduct(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
 
  return (
  
    <div id="new_Arrivals" className="w-full pb-20">
    <Heading heading="Sản phẩm mới" />
    
    <Slider {...settings}>
    {productShop.map((item, index) => (
        <div key={index} className="scale-95 hover:scale-100 transition-all duration-300 px-2 my-2">
           <Link to={`/product/${item.id_product}`}>
            <img
              className="px-4 w-full border border-b-0 rounded-t-xl"
              src={item.avt_product}
              alt="productImage"
            />
          </Link>
          <div className="product-item bg-light mb-4 border rounded-b-lg border-t-0 px-4">
            
            <div className="max-w-80 py-6 flex flex-col gap-1  px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="h-16 text-lg text-primeColor font-bold ">
            {item.name_product}
          </h2>
          <div>
          {item.price_product===item.sellprice_product? //if
          <>
          <p className="text-[#767676] text-[16px]">{item.sellprice_product}VND</p>
          <p class=" invisible text-[14px]"> hidden</p>
          </>
            :
            <div>
            <p className="text-[#767676] text-[16px]">{item.sellprice_product}VND</p>
            <p class=" text-gray-500 line-through dark:text-gray-500 text-[14px]">{item.price_product} VND</p>
            </div>
          }
          </div>
         
        </div>
        <div>
          <p className="text-[#767676] text-[14px]">{item.category.name_category}</p>
        </div>
      </div>
          </div>
        </div>
      ))}
      </Slider>
   
    </div>
  
  );
};

export default NewArrivals;
