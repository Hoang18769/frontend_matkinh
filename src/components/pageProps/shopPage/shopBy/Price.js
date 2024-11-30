import React, { useEffect, useState } from "react";
import NavTitle from "./NavTitle";
import axios from "axios";

const Price = () => {
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
  const filterProduct=productShop.filter((item)=>item.price_product>=minPrice &&item.price_product<=maxPrice)
  
  return (
    <div className="cursor-pointer">
      <NavTitle title="Shop by Price" icons={false} />
      <div className="font-titleFont">
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {filterProduct.map((item) => (
            <li
              key={item.id_product}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
                type="range"
      class="form-range"
      id="customRange1"
      min="0"
      max="800000"
      value={maxPrice}
      onChange={handlePrice}>
            
              ${item.price_product}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Price;
