import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import {
  deleteItem,
  drecreaseQuantity,
  increaseQuantity,
} from "../../redux/orebiSlice";

const ItemCard = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2">
      <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
        <ImCross
          onClick={() => dispatch(deleteItem({id_product:item.id_product, id_variant:item.id_variant.id_variant}))}
          className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
        />
        <img className="w-32 h-32" src={item.avt_product} alt="productImage" />
        <h1 className="font-titleFont font-semibold">{item.name_product} {item.id_variant.id_variant}</h1>
      </div>
      <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
        <div className="flex w-1/3 items-center text-lg font-semibold">
        
        {if}
          <div>
          {item.sellprice_product}VND
          </div>
          <p class="text-base font-medium text-gray-500 line-through dark:text-gray-500">{item.price_product} VND</p>
        
        </div>
        <div className="w-1/3 flex items-center gap-6 text-lg">
          <span
            onClick={() => dispatch(drecreaseQuantity({ id_product: item.id_product, id_variant:item.id_variant.id_variant }))}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            -
          </span>
          <p>{item.quantity}</p>
          <span
            onClick={() => dispatch(increaseQuantity({ id_product: item.id_product,id_variant: item.id_variant.id_variant}))}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            +
          </span>
        </div>
        <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
          <p>{item.quantity * item.price_product}VND</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
