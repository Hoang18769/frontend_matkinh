import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NavTitle from "./NavTitle";
import { useDispatch, useSelector } from "react-redux";
import { toggleBrand } from "../../../../redux/orebiSlice";
import axios from "axios";

const Brand = () => {
  const [showBrands, setShowBrands] = useState(true);
  const checkedBrands = useSelector(
    (state) => state.orebiReducer.checkedBrands
  );
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);

  // Function to fetch data using Axios
  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://matkinhcaolo.io.vn/api/products/categories");
      console.log(response);
      setCategories(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // Call fetchData on component mount
  useEffect(() => {
      fetchCategories();
  }, []);
  const handleToggleBrand = (categories) => {
    dispatch(toggleBrand(categories));
  };

  return (
    <div>
      <div
        onClick={() => setShowBrands(!showBrands)}
        className="cursor-pointer"
      >
        <NavTitle title="Shop by Category" icons={true} />
      </div>
      {showBrands && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {categories.map((item) => (
              <li
                key={item.id_product}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
              >
                <input
                  type="checkbox"
                  id={item.id_category}
                  checked={checkedBrands.some((b) => b.id_category === item.id_category)}
                  onChange={() => handleToggleBrand(item)}
                />
                {item.name_category}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Brand;
