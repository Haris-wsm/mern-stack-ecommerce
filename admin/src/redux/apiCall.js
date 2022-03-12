import {
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  getProductFailure,
  getProductStart,
  getProductSuccess,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure
} from './productRedux';
import { publicRequest, userRequest } from './requestMethods';
import { loginFailure, loginStart, loginSuccess } from './userRedux';

export const login = async (dispath, user) => {
  dispath(loginStart());

  try {
    const res = await publicRequest.post('/auth/login', user);
    dispath(loginSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispath(loginFailure());
  }
};
export const getProducts = async (dispath) => {
  dispath(getProductStart());

  try {
    const res = await userRequest.get('/products');
    dispath(getProductSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispath(getProductFailure());
  }
};
export const deleteProducts = async (dispath, id) => {
  dispath(deleteProductStart());

  try {
    await userRequest.delete('/products/' + id);
    dispath(deleteProductSuccess(id));
  } catch (error) {
    console.log(error);
    dispath(deleteProductFailure());
  }
};
export const updateProducts = async (dispath, id, product) => {
  dispath(updateProductStart());

  try {
    await userRequest.update('/products/' + id, { product });
    dispath(updateProductSuccess({ id, product }));
  } catch (error) {
    console.log(error);
    dispath(updateProductFailure());
  }
};
export const addProducts = async (dispath, product) => {
  dispath(addProductStart());

  try {
    const res = await userRequest.post('/products', product);
    dispath(addProductSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispath(addProductFailure());
  }
};
