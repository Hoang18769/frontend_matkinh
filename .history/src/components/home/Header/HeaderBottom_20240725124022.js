import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";


const HeaderBottom = () => {
  const products = useSelector((state) => state.orebiReducer.products);
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const navigate = useNavigate();
  const logout=()=>{
    window.localStorage.removeItem("currentToken")
    navigate('/')
  }


  const handleLogout = (e) => {
    e.preventDefault();
    let token=localStorage.getItem("currentToken")
    console.log(`Bearer ${token}`);
    try {
      const result=axios.post('https://matkinhcaolo.io.vn/api/logout',
        {
          headers:{Authorization:`Bearer ${token}`}     
        }
      )
        if(result.data.status === 200)
     {
      localStorage.removeItem("currentToken");
      //console.log(result.data.currentToken)
      //swal("Success",result.data.message,"success");
       navigate("/");
     }
      
    } catch (error) {
      console.log(error)
    }
 ;

}

var AuthButtons = '';
if(!localStorage.getItem('currentToken'))
{
    AuthButtons = (
      
      <div class="order-2 md:order-3 flex flex-wrap items-center justify-end mr-0 md:mr-4" id="nav-content">
            <div class="auth flex items-center w-full md:w-full">
                <Link class="bg-transparent text-gray-800  p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700" to="/signin">Đăng Nhập</Link>
          
                <Link class="bg-slate-900 text-white  p-2 rounded  hover:bg-indigo-500 hover:text-gray-100" to="/signup">Đăng Ký</Link>
                </div>
        </div>
    );
}
else
{
    AuthButtons = (
        <li className="nav-item">
            <button  onClick={logout} class="bg-transparent text-gray-800  p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700">Đăng xuât</button>
        </li>
    );
}
  const ref = useRef();
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (ref.current.contains(e.target.value) === "") {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, [show, ref]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = productDe.filter((item) =>
      item.name_product.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProduct(filtered);
    return filtered;
  };
  const [productDe, setProduct] = useState([]);

  // Function to fetch data using Axios
  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        "https://matkinhcaolo.io.vn/api/products/search"
      );
      console.log(response);
      setProduct(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // Call fetchData on component mount
  useEffect(() => {
    fetchProduct();
  }, []);

  // useEffect(() => {

  // }, [searchQuery]);

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <div
            onClick={() => setShow(!show)}
            ref={ref}
            className="flex h-14 cursor-pointer items-center gap-2 text-primeColor"
          >
            <HiOutlineMenuAlt4 className="w-5 h-5" />
            <p className="text-[14px] font-normal">Shop by Category</p>

            {show && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-36 z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6"
              >
                <Link to={"category/gongkinh"}>
                  <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Gọng Kính
                  </li>
                </Link>

                <Link to={"category/kinhmat"}>
                  <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Kính Mát
                  </li>
                </Link>
                <Link to={"category/gongtron"}>
                  <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Gọng tròn
                  </li>
                </Link>
                <Link to={"category/gongmatmeo"}>
                  <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Gọng mắt mèo
                  </li>
                </Link>
              </motion.ul>
            )}
          </div>
          <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              onChange=// {console.log(searchQuery)}
              {handleSearch}
              value={searchQuery}
              placeholder="Search your products here"
            />
            <FaSearch className="w-5 h-5" />
            {searchQuery && (
              <div
                className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
              >
                {searchQuery &&
                  filteredProduct.map((item) => (
                    <div
                      onClick={() =>
                        navigate(
                          `/product/${item.id_product}
                            .toLowerCase()
                            .split(" ")
                            .join("")}`,
                          {
                            state: {
                              item: item,
                            },
                          }
                        ) &
                        setShowSearchBar(true) &
                        setSearchQuery("")
                      }
                      key={item.id_product}
                      className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
                    >
                      <img
                        className="w-24"
                        src={item.avt_product}
                        alt="ProductImage"
                      />
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold text-lg">
                          {item.name_product}
                        </p>
                        <p className="text-xs">
                          {item.desc_product.length > 100
                            ? `${item.desc_product.slice(0, 100)}...`
                            : item.desc_product}
                        </p>
                        <p className="text-sm">
                          Price:{" "}
                          <span className="text-primeColor font-semibold">
                            ${item.price_product}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
 
          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
            {/* <div onClick={() => setShowUser(!showUser)} className="flex">
              <FaUser />
              <FaCaretDown />
            </div> */}
            {/* {showUser && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-6 left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
              >
                <Link to="/signin">
                  <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Login
                  </li>
                </Link>
                <Link onClick={() => setShowUser(false)} to="/signup">
                  <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Sign Up
                  </li>
                </Link>
              </motion.ul>
            )} */}
            <div>
            {AuthButtons}

            </div>
            <Link to="/cart">
              <div className="relative">
                <FaShoppingCart />
                <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
                  {products.length > 0 ? products.length : 0}
                </span>
              </div>
            </Link>
          
          </div>
          
        </Flex>
        
      </div>
    </div>
  );
};

export default HeaderBottom;
