import { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: number;
  category: string[];
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

const initialState: { arr: Product[]; product: Product; catArr: string[] } = {
  arr: [],
  product: {} as Product,
  catArr: [],
};

const prodSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProducts: (state, action) => {
      state.arr = action.payload;
    },
    getProductById: (state, action) => {
      state.product = action.payload;
    },
    getCategories: (state, action) => {
      state.catArr = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", state, action.payload);
      return {
        ...state,
        ...action.payload.product,
      };
    },
  },
});

export const selectProduct = (st: RootState) => st.product;

export const { getProducts, getProductById, getCategories } = prodSlice.actions;
export default prodSlice.reducer;
