import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { useSelector,useDispatch } from "react-redux";
import {
  deleteItem,
  drecreaseQuantity,
  increaseQuantity,
} from "../../redux/orebiSlice";

const ItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.orebiReducer.products);
  
  return (
   {products.map()} 
   
  );
};

export default ItemCard;
