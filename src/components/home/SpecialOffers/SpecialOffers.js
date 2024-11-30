import React, { useEffect, useState } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import { SplOfferData } from "../../../constants";
import { useParams } from "react-router-dom";
import axios from "axios";

const SpecialOffers = () => {
  const { category } = useParams();

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
  }, [productShop]);


 
  const catData = productShop.filter((item) => item.category.name_category === category);
  return (
    <div className="w-full pb-20">
      <Heading heading="Special Offers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-3 gap-10">
        {catData.map((productShop) => (
          <Product
             key={productShop.id_product}
            id_product={productShop.id_product}
             avt_product={productShop.avt_product}
            name_prodcut={productShop.name_prodcut}
            price_product={productShop.price_product}
           des={productShop.desc_product}
          />
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
