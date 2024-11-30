import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import Badge from "./Badge";
import axios from "axios";
import { toast } from "react-toastify";
import { BsSuitHeartFill } from "react-icons/bs";
import { Input } from "@material-tailwind/react";

const Product = (props) => {
  const dispatch = useDispatch();
  const [productShop, setProduct] = useState([]);
  const [minPrice,setMinPrice]=useState(0)
  const [maxPrice,setmaxPrice]=useState(800000)
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://matkinhcaolo.io.vn/api/product"
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
 
  const handlePrice=(event)=>{
    const {value}=event.target;
    setmaxPrice(value)
  }
  //const filterProduct=productShop.filter((item)=>item.price_product>=minPrice &&item.price_product<=maxPrice)
  return (
    <>
    
     {/* <div className="cursor-pointer">
      <div className="font-titleFont">
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
        <label for="customRange1" class="form-label">filter price:${minPrice}-${maxPrice}</label>
        <input type="range"
     class="range pr-6 accent-red-500" 
      id="customRange1"
      min="0"
      max="800000"
      value={maxPrice}
      onChange={handlePrice}></input>
   
        </ul>
      </div>
    </div> */}
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
          <div>
          {item.price_product===item.sellprice_product?
            <p className="text-[#767676] text-[16px]">{item.sellprice_product}VND</p>
            <p></p>
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
    </>
  );
};

export default Product;
