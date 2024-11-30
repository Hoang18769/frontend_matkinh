import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { useSelector } from "react-redux";
import axios from "axios";


function Items({ currentItems, selectedBrands, selectedCategories }) {
  // Filter items based on selected brands and categories
  const [productDe, setProduct] = useState([]);

  // Function to fetch data using Axios
  const fetchProduct = async () => {
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
  // Call fetchData on component mount
  // useEffect(() => {
  //   fetchProduct();
  // }, []);
 
  const filteredItems = currentItems.filter((item) => (
    // const isBrandSelected =
    //   selectedBrands.length === 0 ||
    //   selectedBrands.some((brand) => brand.title === item.brand);

    // selectedCategories.map((items)=>(
    //   items.name_category === item.category.name_category,
    //   console.log("selectedCategories",items)
    // ))
    item.category.name_category===
    // item.category.name_category===selectedCategories.some((category) => category.title === item.category.name_category)
    // const isCategorySelected =
    //   selectedCategories.length === 0 ||
    //   selectedCategories.some((category) => category.title === item.category.name_category);
    //   console.log("isCategorySelected",isCategorySelected)
    // return  isCategorySelected;

  ));

  return (
    <>
      {filteredItems.map((item) => (
        <div key={item.id_product} className="flex w-full">
          <Product
            // item={item}
            id_product={item.id_product}
            avt_product={item.avt_product}
            name_product={item.name_product}
            sellprice_product={item.sellprice_product}
            price_product={item.price_product}
            name_category={item.category.name_category}
            />
        </div>      
      ))
     }
      {/* <Product           
            /> */}
            {

             
             }
    </>
  );
}
const Pagination = ({ itemsPerPage }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);
  const [productShop, setProduct] = useState([]);

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

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = productShop.slice(itemOffset, endOffset);
  // const selectedBrands = useSelector(
  //   (state) => state.orebiReducer.checkedBrands
  // );
  const selectedCategories = useSelector(
    (state) => state.orebiReducer.checkedCategorys
  );
  const pageCount = Math.ceil(productShop.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % productShop.length;
    const newStart = newOffset + 1; // Adjust the start index

    setItemOffset(newOffset);
    setItemStart(newStart);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items
          currentItems={currentItems}
          // selectedBrands={selectedBrands}
          selectedCategories={selectedCategories}
        />{" "}
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />

        <p className="text-base font-normal text-lightText">
          Products from {itemStart} to {Math.min(endOffset, productShop.length)} of{" "}
          {productShop.length}
        </p>
        {/* <button onClick={() => console.log(selectedBrands)}> </button> */}
      </div>
    </div>
  );
};

export default Pagination;
