import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
const POSTS_URL = 'https://matkinhcaolo.io.vn/api/products';

export const fetchPosts = createAsyncThunk('products/fetchPosts', async () => {
  const response = await axios.get(POSTS_URL)
  return response.data
})
const initialState = {
  userInfo: [],
  products: [],
  checkedBrands: [],
  checkedCategorys: [],
};

export const orebiSlice = createSlice({
  name: "mat kinh",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.filter(
        (item) => item.id_product === action.payload.id_product
      );
      let subItem =item.find((item)=>(
        item.id_variant.id_variant===action.payload.id_variant.id_variant
      ))
      if(subItem)
      // if (item) {
       item.quantity += action.payload.quantity;
      // } else {
        state.products.push(action.payload);
      //}
      // Dispatch a success toast
      toast.success("products added to cart");
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item.id_product === action.payload.id_product
      );
      if (item) {
        item.quantity++;
        // Dispatch a success toast
      }
    },
    drecreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item.id_product === action.payload.id_product
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
        // Dispatch a success toast
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id_product !== action.payload
      );
      // Dispatch a success toast
      toast.error("products removed from cart");
    },
    resetCart: (state) => {
      state.products = [];
      // Dispatch a success toast
    },

    toggleBrand: (state, action) => {
      const fetchPosts = action.payload;
      const isBrandChecked = state.checkedBrands.some(
        (b) => b.id_product === fetchPosts.id_product
      );

      if (isBrandChecked) {
        state.checkedBrands = state.checkedBrands.filter(
          (b) => b.id_product !== fetchPosts.id_product
        );
      } else {
        state.checkedBrands.push(fetchPosts);
      }
    },

    toggleCategory: (state, action) => {
      const category = action.payload;
      const isCategoryChecked = state.checkedCategorys.some(
        (b) => b.id_category === category.id_category
      );

      if (isCategoryChecked) {
        state.checkedCategorys = state.checkedCategorys.filter(
          (b) => b.id_category !== category.id_category
        );
      } else {
        state.checkedCategorys.push(category);
      }

    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
  toggleBrand,
  toggleCategory,
} = orebiSlice.actions;
export default orebiSlice.reducer;