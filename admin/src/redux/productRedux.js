import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    isFetching: false,
    error: false
  },
  reducers: {
    //GET ALL
    getProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductSuccess: (state, action) => {
      state.products = action.payload;
      state.isFetching = false;
    },
    getProductFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
    // Delete product

    deleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action) => {
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload.id),
        1
      );
      state.isFetching = false;
    },
    deleteProductFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
    // Update product

    updateProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProductSuccess: (state, action) => {
      state.products[
        state.products.findIndex((item) => item._id === action.payload.product)
      ] = action.payload.user;
      state.isFetching = false;
    },
    updateProductFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
    // Add product

    addProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addProductSuccess: (state, action) => {
      state.products.push(action.payload);
      state.isFetching = false;
    },
    addProductFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    }
  }
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure
} = productSlice.actions;
export default productSlice.reducer;
