import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
const ProductInfo = ({ productInfo }) => {
  const highlightStyle = {
    color: "#d0121a", // Change this to the desired color
    fontWeight: "bold", // Change this to the desired font weight
  };
  
  const [productShop, setProduct] = useState([]);
  const dispatch = useDispatch();
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
  const renderDescription = () => {
    if (!productInfo.des) {
      return null; // or handle accordingly if product.des is not defined
    }

    const description = productInfo.des.split(/:(.*?)-/).map((part, index) => {
      return (
        <span key={index} style={index % 2 === 1 ? highlightStyle : {}}>
          {part}
        </span>
      );
    });

    return <>{description}</>;
  };

  return (
    <div>
    <div class="mt-16">
    <h3 class="text-gray-6max00 text-2xl font-medium">Xem thêm sản phẩm</h3>
    <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
      {productShop.map((item) => (
            <div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
              <div class="flex items-end justify-end h-56 w-full bg-cover">
              <Link to={`/product/${item.id_product}`}>
                <img
                  src={item.avt_product}
                  alt=""
                  className="w-full h-full aspect-square object-cover rounded-xl"
                />
                </Link>
              </div>
              <div class="flex item-center justify-between px-5 py-3">
                <h3 class="text-gray-700 uppercase">{item.name_product}</h3>
                {item.price_product===item.sellprice_product?
            <p className="text-[#767676] text-[16px]">{item.sellprice_product}VND</p>
            :
            <div>
            <p className="text-[#767676] text-[16px]">{item.sellprice_product}VND</p>
            <p class=" text-gray-500 line-through dark:text-gray-500 text-[14px]">{item.price_product} VND</p>
            </div>
          }              </div>
            </div>
        
      
      ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
