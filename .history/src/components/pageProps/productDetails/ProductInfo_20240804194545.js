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
    <div className="container mx-auto px-4">
      <h3 class="text-gray-600 text-2xl font-medium">Đánh giá sản phẩm</h3>
      <div class="py-12 px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center">
        <div class="flex flex-col justify-start items-start w-full space-y-8">
          <div class="w-full flex justify-start items-start flex-col p-8">
            <div id="menu" class="md:block">
              <div
                class="md:hidden carousel pt-8 cursor-none"
                data-flickity='{ "wrapAround": true,"pageDots": false }'
              >
                <div class="carousel-cell">
                  <div class="md:w-full h-full relative">
                    <img
                      src="https://i.ibb.co/QXzVpHp/vincent-wachowiak-8g-Cm-EBVl6a-I-unsplash-1.png"
                      alt="bag"
                      class="w-full h-full object-fit object-cover"
                    />
                  </div>
                </div>

                <div class="carousel-cell"></div>
              </div>
              <div class="mt-6 flex justify-start items-center flex-row space-x-2.5">
                <div>
                  <img
                    src="https://i.ibb.co/QcqyrVG/Mask-Group.png"
                    alt="girl-avatar"
                  />
                </div>
                <div class="flex flex-col justify-start items-start space-y-2">
                  <p class="text-base font-medium leading-none">
                    Nguyễn Thị Anh
                  </p>
                  <p class="text-sm leading-none">10/8/2024</p>
                </div>
              </div>
            </div>

            <div class="w-full flex justify-start items-start flex-col md:px-8 py-8">
              <div class="flex flex-col md:flex-row flex justify-between w-full">
                <div class="flex flex-row justify-between items-start">
                  <p class="text-xl md:text-2xl font-medium leading-normal">
                  Kính có kiểu dáng thời trang, phù hợp với xu hướng hiện nay.
                  </p>
                  <button
                    onclick="showMenu2(true)"
                    class="ml-4 md:hidden"
                  ></button>
                </div>
                <div class="cursor-pointer mt-2 md:mt-0">
                  <svg
                    width="152"
                    height="24"
                    viewBox="0 0 152 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0)">
                      <path
                        d="M17.5598 24.4285C17.3999 24.4291 17.2422 24.3914 17.0998 24.3185L11.9998 21.6485L6.89982 24.3185C6.73422 24.4056 6.5475 24.4444 6.3609 24.4307C6.1743 24.4169 5.9953 24.3511 5.84425 24.2407C5.6932 24.1303 5.57616 23.9797 5.50644 23.8061C5.43671 23.6324 5.4171 23.4427 5.44982 23.2585L6.44982 17.6285L2.32982 13.6285C2.20128 13.5002 2.1101 13.3394 2.06605 13.1632C2.02201 12.987 2.02677 12.8022 2.07982 12.6285C2.13778 12.4508 2.2444 12.2928 2.38757 12.1726C2.53075 12.0525 2.70475 11.9748 2.88982 11.9485L8.58982 11.1185L11.0998 5.98849C11.1817 5.81942 11.3096 5.67683 11.4687 5.57706C11.6279 5.47729 11.812 5.42438 11.9998 5.42438C12.1877 5.42438 12.3717 5.47729 12.5309 5.57706C12.6901 5.67683 12.8179 5.81942 12.8998 5.98849L15.4398 11.1085L21.1398 11.9385C21.3249 11.9648 21.4989 12.0425 21.6421 12.1626C21.7852 12.2828 21.8919 12.4408 21.9498 12.6185C22.0029 12.7922 22.0076 12.977 21.9636 13.1532C21.9196 13.3294 21.8284 13.4902 21.6998 13.6185L17.5798 17.6185L18.5798 23.2485C18.6155 23.436 18.5968 23.6297 18.526 23.8069C18.4551 23.9841 18.335 24.1374 18.1798 24.2485C17.9987 24.3754 17.7807 24.4387 17.5598 24.4285V24.4285Z"
                        fill="currentColor"
                      />
                    </g>
                    <g clip-path="url(#clip1)">
                      <path
                        d="M49.5598 24.4285C49.3999 24.4291 49.2422 24.3914 49.0998 24.3185L43.9998 21.6485L38.8998 24.3185C38.7342 24.4056 38.5475 24.4444 38.3609 24.4307C38.1743 24.4169 37.9953 24.3511 37.8443 24.2407C37.6932 24.1303 37.5762 23.9797 37.5064 23.8061C37.4367 23.6324 37.4171 23.4427 37.4498 23.2585L38.4498 17.6285L34.3298 13.6285C34.2013 13.5002 34.1101 13.3394 34.0661 13.1632C34.022 12.987 34.0268 12.8022 34.0798 12.6285C34.1378 12.4508 34.2444 12.2928 34.3876 12.1726C34.5307 12.0525 34.7047 11.9748 34.8898 11.9485L40.5898 11.1185L43.0998 5.98849C43.1817 5.81942 43.3096 5.67683 43.4687 5.57706C43.6279 5.47729 43.812 5.42438 43.9998 5.42438C44.1877 5.42438 44.3717 5.47729 44.5309 5.57706C44.6901 5.67683 44.8179 5.81942 44.8998 5.98849L47.4398 11.1085L53.1398 11.9385C53.3249 11.9648 53.4989 12.0425 53.6421 12.1626C53.7852 12.2828 53.8919 12.4408 53.9498 12.6185C54.0029 12.7922 54.0076 12.977 53.9636 13.1532C53.9196 13.3294 53.8284 13.4902 53.6998 13.6185L49.5798 17.6185L50.5798 23.2485C50.6155 23.436 50.5968 23.6297 50.526 23.8069C50.4551 23.9841 50.335 24.1374 50.1798 24.2485C49.9987 24.3754 49.7807 24.4387 49.5598 24.4285V24.4285Z"
                        fill="currentColor"
                      />
                    </g>
                    <g clip-path="url(#clip2)">
                      <path
                        d="M81.5598 24.4285C81.3999 24.4291 81.2422 24.3914 81.0998 24.3185L75.9998 21.6485L70.8998 24.3185C70.7342 24.4056 70.5475 24.4444 70.3609 24.4307C70.1743 24.4169 69.9953 24.3511 69.8443 24.2407C69.6932 24.1303 69.5762 23.9797 69.5064 23.8061C69.4367 23.6324 69.4171 23.4427 69.4498 23.2585L70.4498 17.6285L66.3298 13.6285C66.2013 13.5002 66.1101 13.3394 66.0661 13.1632C66.022 12.987 66.0268 12.8022 66.0798 12.6285C66.1378 12.4508 66.2444 12.2928 66.3876 12.1726C66.5307 12.0525 66.7047 11.9748 66.8898 11.9485L72.5898 11.1185L75.0998 5.98849C75.1817 5.81942 75.3096 5.67683 75.4687 5.57706C75.6279 5.47729 75.812 5.42438 75.9998 5.42438C76.1877 5.42438 76.3717 5.47729 76.5309 5.57706C76.6901 5.67683 76.8179 5.81942 76.8998 5.98849L79.4398 11.1085L85.1398 11.9385C85.3249 11.9648 85.4989 12.0425 85.6421 12.1626C85.7852 12.2828 85.8919 12.4408 85.9498 12.6185C86.0029 12.7922 86.0076 12.977 85.9636 13.1532C85.9196 13.3294 85.8284 13.4902 85.6998 13.6185L81.5798 17.6185L82.5798 23.2485C82.6155 23.436 82.5968 23.6297 82.526 23.8069C82.4551 23.9841 82.335 24.1374 82.1798 24.2485C81.9987 24.3754 81.7807 24.4387 81.5598 24.4285V24.4285Z"
                        fill="currentColor"
                      />
                    </g>
                    <g clip-path="url(#clip3)">
                      <path
                        d="M113.56 24.4285C113.4 24.4291 113.242 24.3914 113.1 24.3185L108 21.6485L102.9 24.3185C102.734 24.4056 102.548 24.4444 102.361 24.4307C102.174 24.4169 101.995 24.3511 101.844 24.2407C101.693 24.1303 101.576 23.9797 101.506 23.8061C101.437 23.6324 101.417 23.4427 101.45 23.2585L102.45 17.6285L98.3298 13.6285C98.2013 13.5002 98.1101 13.3394 98.0661 13.1632C98.022 12.987 98.0268 12.8022 98.0798 12.6285C98.1378 12.4508 98.2444 12.2928 98.3876 12.1726C98.5307 12.0525 98.7047 11.9748 98.8898 11.9485L104.59 11.1185L107.1 5.98849C107.182 5.81942 107.31 5.67683 107.469 5.57706C107.628 5.47729 107.812 5.42438 108 5.42438C108.188 5.42438 108.372 5.47729 108.531 5.57706C108.69 5.67683 108.818 5.81942 108.9 5.98849L111.44 11.1085L117.14 11.9385C117.325 11.9648 117.499 12.0425 117.642 12.1626C117.785 12.2828 117.892 12.4408 117.95 12.6185C118.003 12.7922 118.008 12.977 117.964 13.1532C117.92 13.3294 117.828 13.4902 117.7 13.6185L113.58 17.6185L114.58 23.2485C114.616 23.436 114.597 23.6297 114.526 23.8069C114.455 23.9841 114.335 24.1374 114.18 24.2485C113.999 24.3754 113.781 24.4387 113.56 24.4285V24.4285Z"
                        fill="currentColor"
                      />
                    </g>
                    <g clip-path="url(#clip4)">
                      <path
                        d="M135.146 16.911L131.052 12.9355L136.734 12.1081L137.256 12.032L137.488 11.558L139.998 6.42798L139.998 6.42798L140 6.42443L140.004 6.4329L142.544 11.5529L142.777 12.0225L143.296 12.0981L148.978 12.9255L144.883 16.901L144.502 17.2708L144.595 17.7934L145.595 23.4234L145.595 23.4234L145.597 23.4356L145.605 23.4463L145.56 24.4285L145.556 23.4474L145.564 23.4326L140.464 20.7626L140 20.5197L139.536 20.7626L134.436 23.4326L134.434 23.4334L135.434 17.8034L135.527 17.2808L135.146 16.911Z"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                      <clipPath id="clip1">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(32)"
                        />
                      </clipPath>
                      <clipPath id="clip2">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(64)"
                        />
                      </clipPath>
                      <clipPath id="clip3">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(96)"
                        />
                      </clipPath>
                      <clipPath id="clip4">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(128)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div id="menu2" class="hidden md:block">
                <p class="mt-3 text-base leading-normal w-full md:w-9/12 xl:w-5/6">
                  Gọng kính nên được làm từ chất liệu bền, nhẹ và an toàn cho da
                  như: titan, nhựa cao cấp, hoặc acetate. Chọn gọng kính có kiểu dáng phù hợp với khuôn mặt và phong cách cá nhân.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-16">
        <h3 class="text-gray-600 text-2xl font-medium">Xem thêm sản phẩm</h3>
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
                {item.price_product === item.sellprice_product ? (
                  <p className="text-[#767676] text-[16px]">
                    {item.sellprice_product}VND
                  </p>
                ) : (
                  <div>
                    <p className="text-[#767676] text-[16px]">
                      {item.sellprice_product}VND
                    </p>
                    <p class=" text-gray-500 line-through dark:text-gray-500 text-[14px]">
                      {item.price_product} VND
                    </p>
                  </div>
                )}{" "}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
