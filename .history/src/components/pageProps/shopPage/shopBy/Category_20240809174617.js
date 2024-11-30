import React, { useEffect, useState } from "react";
// import { FaPlus } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";
import { useDispatch, useSelector } from "react-redux";
import { toggleCategory } from "../../../../redux/orebiSlice";
import axios from "axios";

const Category = () => {

  const [showSubCatOne, setShowSubCatOne] = useState(false);
  const checkedCategorys = useSelector(
    (state) => state.orebiReducer.checkedCategorys
  );
  
  const dispatch = useDispatch();
  const [category, setCategories] = useState([]);
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

  const handleToggleCategory = (category) => {
    dispatch(toggleCategory(category));
  };

  return (
    <div className="w-full">
      <NavTitle onClick={()=>{handleCategory}} title="Shop by Category" icons={true} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {category.map((item) => (
            <li
              key={item.id_category}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
            >
              <input
                type="checkbox"
                id={item.id_category}
                checked={checkedCategorys.some((b) => b.id_category === item.id_category)}
                onChange={() => handleToggleCategory(item)}
              />
              {item.name_category}
            </li>
          ))} 
          <li onClick={() => console.log(checkedCategorys)}></li>
        </ul>
      </div>
    </div>
  );
};

export default Category;