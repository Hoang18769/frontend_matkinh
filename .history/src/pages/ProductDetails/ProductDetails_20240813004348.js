import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/orebiSlice";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import { IoMdArrowDropdown } from "react-icons/io";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [productDetail, setProduct] = useState({});
  const [feedback, setFeedBack] = useState([]);
  const [quantity, setQuantity] = useState(0);
  let [id_variant, setId_variant] = useState(0);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://matkinhcaolo.io.vn/api/product/${id}`
      );
      setProduct(response.data.results);
      setQuantity(response.data.results.total_stock);
      
      console.log(productDetail);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchData2 = async () => {
    try {
      const response = await axios.get(
        `https://matkinhcaolo.io.vn/api/feedback/${id}`
      );
      console.log(response);
      setFeedBack(response.data.feedbacks);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    setId_variant(0);
    fetchData2();
    
  }, [id]);

  
  return (
    <div className="container mx-auto px-8">
      <div className="flex  justify-between lg:flex-row gap-16 lg:items-center">
        <div className="flex self-start justify-start w-2/5">
          <img
            src={productDetail.avt_product}
            alt="product img"
            className="w-full h-full aspect-square object-cover rounded-xl"
          />
        </div>
        {/* ABOUT */}

        <div className="flex flex-col gap-4 lg:w-2/4">
          <p className="text-[#767676] text-[14px]">
            {productDetail.category?.name_category}
          </p>
          <div>
            <span className=" text-violet-600 font-semibold"> </span>
            <h1 className="text-3xl font-bold">{productDetail.name_product}</h1>
          </div>
          <p className="text-gray-700">{productDetail.desc_product}</p>
          <div className="flex item-center">
            {productDetail.price_product === productDetail.sellprice_product ? (
              <h6 className="text-2xl mr-5  font-semibold">
                {productDetail.sellprice_product} VND
              </h6>
            ) : (
              <div>
                <h6 className="text-2xl mr-5  font-semibold">
                  {productDetail.sellprice_product} VND
                </h6>
                <p className="text-base font-medium text-gray-500 line-through dark:text-gray-500">
                  {productDetail.price_product} VND
                </p>
              </div>
            )}
            <Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Rating
                name="read-only"
                value={
                  feedback
                    ? 
                    ( Math.round((feedback.reduce((a, b) => a + b.rating, 0))/(feedback.length)))
                    : 0
                }
                readOnly
              />
            </Box>
          </div>

          <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
            <div className="flex  ml-2 items-center">
              <span className="">Màu và kích thước</span>
              <div className="relative">
                <select
                  defaultValue={0}
                  className="rounded border appearance-none border-gray-400 py-2 mx-4 focus:outline-none focus:border-red-500 text-base pl-3 pr-10"
                  onChange={(e) => {
                    setId_variant(e.target.value);
                    let i = productDetail.variants?.find(
                      (item) =>
                        parseInt(item.id_product_variants) ===
                        parseInt(e.target.value)
                    );
                    setQuantity(i.quantity);
                    
                  }}
                >
                  {id_variant === 0 ? (
                    <option key={0} hidden selected></option>
                  ) : null}
                  {productDetail.variants?.map((variant, index) => (
                    <option key={index} value={variant.id_product_variants}>
                      {variant.color.desc_color} {variant.size.desc_size}
                    </option>
                  ))}
                </select>
                <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </div>
              <p className="px-5">Còn lại: {quantity}</p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-12">
            <button
              id="addToCart"
             
              onClick={() => {
                if (id_variant === 0) {
                  swal(
                    "Thất bại",
                    "Vui lòng chọn màu và kích thước sản phẩm!",
                    "error"
                  );
                } else {
                  dispatch(
                    addToCart({
                      id_product: productDetail.id_product,
                      name_product: productDetail.name_product,
                      quantity: 1,
                      avt_product: productDetail.avt_product,
                      price_product: productDetail.price_product,
                      sellprice_product: productDetail.sellprice_product,
                      id_variant: { id_variant },
                    })
                  );
                }
              }}
              className="bg-indigo-500 text-white font-semibold py-3 px-16 rounded-xl h-full disabled:opacity-50"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
          <div
            className="flex items-center"
            onClick={() => {
              setShow(!show);
            }}
          >
            {feedback ? (
              <>
                <h3 className="text-gray-600 text-2xl my-4 ">
                  Đánh giá sản phẩm{" "}
                </h3>{" "}
                <IoMdArrowDropdown />
              </>
            ) : (
              <h3 className="text-gray-600 text-2xl my-4 ">
                Chưa có đánh giá nào{" "}
              </h3>
            )}
          </div>

          {feedback?.map((item) => (
            <div
              className=" md:px-6 2xl:px-0 2xl:container 2xl:mx-auto  flex justify-center items-center"
              style={{ display: show ? "flex" : "none" }}
            >
              <div className="flex flex-col justify-start items-start w-full  ">
                <div className="w-full flex justify-start items-start flex-col p-8 ">
                  <div id="menu" className="md:block ">
                    <div className=" w-full flex justify-between items-center flex-row space-x-2.5 ">
                      <div className="flex flex-col justify-start items-start ">
                        <p className="text-base text-2xl font-medium leading-none">
                          {item.customer}
                        </p>
                        <p className="text-sm leading-none px-4">
                          {item.updated_at}
                        </p>
                      </div>
                      <p className="px-4">
                        Phân loại: {item.desc_color} {item.desc_size}{" "}
                      </p>
                      <Box
                        sx={{
                          "& > legend": { mt: 2 },
                        }}
                      >
                        <Rating name="read-only" value={item.rating} readOnly />
                      </Box>
                    </div>
                  </div>

                  <div className="w-full flex justify-start items-start flex-col md:px-8 ">
                    <div className="flex flex-col md:flex-row flex justify-between w-full"></div>
                    <div id="menu2" className=" md:block">
                      <p className="mt-3 text-base leading-normal w-full md:w-9/12 xl:w-5/6">
                        {item.comment}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ProductInfo />if (quantity <= 0) {
        let but = document.getElementById("addToCart");
        but.disabled = "true";
        but.classList.add("disabled:opacity-50");
        swal("Thất bại", "Vui lòng chọn màu và kích thước sản phẩm!", "error");
      }
    </div>
  );
};

export default ProductDetails;
