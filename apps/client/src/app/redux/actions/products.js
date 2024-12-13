import * as api from "../api";
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
    const { data } = await api.createProducts(product);
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
  console.log(updateProduct);
  try {
    const { data } = await api.updateProducts(id, updatedProduct);
    dispatch({ type: UPDATE_PRODUCTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await api.deleteProducts(id);
    dispatch({ type: DELETE_PRODUCTS, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const allProducts = async () => {
  try {
    const response = await api.fetchCartProducts();
    const products = response?.data?.data;

    if (!products) {
      throw new Error("No products found in the cart.");
    }

    const updatedCart = await Promise.all(
      products.map(async (item) => {
        const productResponse = await api.fetchProductsById(item.productId);
        const productDetails = productResponse?.data?.data;

        return {
          id: item.documentId,
          name: productDetails?.name,
          price: productDetails?.price,
          quantity: item?.totalQuantity,
          stock: productDetails?.stock,
          image: productDetails?.image?.[0]?.url,
        };
      })
    );
    return updatedCart;
  } catch (error) {
    console.log("Error updating cart products:", error);
    throw error; // Optionally rethrow the error
  }
};
