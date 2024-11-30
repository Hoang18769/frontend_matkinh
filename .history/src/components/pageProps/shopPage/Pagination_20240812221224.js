import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { useSelector } from "react-redux";
import axios from "axios";


function Items({ currentItems, selectedBrands, selectedCategories }) {
  // Filter items based on selected brands and categories
  const filteredItems = currentItems;

  return (
    <>
      {filteredItems.map((item) => (
        <div key={item.id_product} className="flex w-full">
          <Product
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
  const selectedCategories = useSelector(
    (state) => state.orebiReducer.checkedCategorys
  );
  //lọc ra sản phẩm theo category đã chọn
  const item=productShop.filter((item)=>{
    const isCategorySelected =
      selectedCategories.length === 0 ||
      selectedCategories.some((category) => category.name_category === item.category.name_category);
      console.log("isCategorySelected",isCategorySelected)
    return  isCategorySelected;
  })
  //cắt 
  const currentItems=item.slice(itemOffset, endOffset)
//tính số trang
  const pageCount = Math.ceil(item.length/ itemsPerPage);

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
          selectedCategories={selectedCategories}
        />
      </div>
      <div className="flex flex-col mdl:flex-row justify-center rounded-lg items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9  h-9 border-[1px] rounded-lg border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black outline-transparent	 text-white"
        />

        <p className="text-base font-normal text-lightText">
          Products from {itemStart} to {parseInt(itemStart+parseInt(Math.min(endOffset, currentItems.length)))-1} of{" "}
          {item.length}
        </p>
        {/* <button onClick={() => console.log(selectedBrands)}> </button> */}
      </div>
    </div>
  );
};

export default Pagination;
