import * as api from "../api";
import { toast } from "react-toastify";
import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_ID,
  CREATE_PRODUCT,
  DELETE_PRODUCTS,
  UPDATE_PRODUCTS,
} from "../constants/actionTypes";

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchProducts();
    dispatch({ type: FETCH_PRODUCTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createProducts = (product) => async (dispatch) => {
  try {
    toast.success("Product Created Sucessfully");
    const { data } = await api.addProducts(product);
    dispatch({ type: CREATE_PRODUCT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getProductByID = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchProductsById(id);
    dispatch({ type: FETCH_PRODUCTS_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = (id, updatedProduct) => async (dispatch) => {
  try {
    const { data } = await api.updateProducts(id, updatedProduct);
    dispatch({ type: UPDATE_PRODUCTS, payload: data });
    toast.success("Updated Sucessfully");
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = (id, updatedProduct) => async (dispatch) => {
  console.log(id);
  console.log(updatedProduct);
  try {
    toast.success("Product Deleted Sucessfully");
    await api.updateProducts(id,  updatedProduct );
    dispatch({ type: DELETE_PRODUCTS, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const getProductsByAdminProfileId = async (id) => {
  const response = await api.fetchProducts();
  const products = response.data.data;
  // console.log(products)
  const filteredProducts = products.filter((item) => item.adminProfileId == id);

  return filteredProducts;
};
