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

const NewArrivals = ({props}) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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
  const dispatch = useDispatch();
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
  const id_product = productShop.name_product;
  const idString = (id_product) => {
    return String(id_product).toLowerCase().split(" ").join("");
  };
  const rootId = idString(id_product);

  const navigate = useNavigate();
  const productItem = props;
  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        productShop: productItem,
      },
    });
  };
  const [wishList, setWishList] = useState([]);
  const handleWishList = () => {
    toast.success("Product add to wish List");
    setWishList(wishList.push(productShop));
    console.log(wishList);
  };
  return (
  
    <div className="w-full pb-20">
    <Heading heading="Sản phẩm mới" />
    
    <Slider {...settings}>
    {productShop.map((item, index) => (
        <div key={index}>
           <Link to={`/product/${item.id_product}`}>
            <img
              className="mx-auto w-full hover:scale-105 transition-all duration-300"
              src={item.avt_product}
            />
          </Link>
          <div className="product-item bg-light mb-4">
            <div className="product-img position-relative overflow-hidden">
            </div>
            <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">
            {item.name_product}
          </h2>
          <p class=" font-medium text-gray-500 line-through dark:text-gray-500">{item.price_product} VND</p>

          <p className="text-[#767676] text-[14px]">{item.price_product}VND</p>
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
