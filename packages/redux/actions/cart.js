import * as api from "../api";
import {
  FETCH_CART_PRODUCTS,
  UPDATE_CART_PRODUCTS,
  DELETE_CART_PRODUCTS,
  CREATE_CART_PRODUCT,
  FETCH_CART_PRODUCTS_BY_USER_ID,
} from "../constants/actionTypes";

export const getCartProducts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCartProducts();
    dispatch({ type: FETCH_CART_PRODUCTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createCartProducts = (product) => async (dispatch) => {
  try {
    const { data } = await api.addCartProducts(product);
    // console.log("Created Cart Product:", data);
    dispatch({ type: CREATE_CART_PRODUCT, payload: data });
    // window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

export const getCartProductByUserID = (userId) => async (dispatch) => {
  try {
    const { data } = await api.fetchCartProductsByUserId(userId);
    // console.log("Fetched Cart Product By ID:", data); // Debugging log
    dispatch({ type: FETCH_CART_PRODUCTS_BY_USER_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const cartProductUpdate = (id, updatedProduct) => async (dispatch) => {
  console.log(id);
  console.log(updatedProduct);
  try {
    const { data } = await api.updateCartProducts(id, updatedProduct);
    dispatch({ type: UPDATE_CART_PRODUCTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCartProduct = (id) => async (dispatch) => {
  try {
    await api.deleteCartProducts(id);
    dispatch({ type: DELETE_CART_PRODUCTS, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const getCartProductsByUserId = async (id) => {
  const response = await api.fetchCartProducts();
  const carts = response.data.data;
  const filteredCart = carts.filter((cart) => cart.userId == id);
  return filteredCart;
};

export const allcartProducts = async (id) => {
  try {
    const response = await getCartProductsByUserId(id);
    const products = response;
    if (!products) {
      throw new Error("No products found in the cart.");
    }

    const updatedCart = await Promise.all(
      products.map(async (item) => {
        console.log(item);
        const productResponse = await api.fetchProductsById(item.productId);
        const productDetails = productResponse?.data?.data;
        console.log(productDetails);

        return {
          id: item.productId,
          cartId: item.documentId,
          name: productDetails?.name,
          price: productDetails?.price,
          quantity: item?.totalQuantity,
          stock: productDetails?.stock,
          image: productDetails?.image,
          adminProfileId: productDetails?.adminProfileId,
        };
      })
    );
    return updatedCart;
  } catch (error) {
    console.log("Error updating cart products:", error);
    throw error; // Optionally rethrow the error
  }
};

// export const CartProductDeletedByUserId = (userId) => async (dispatch) => {
//   try {
//     await api.deleteCartProductByUserId(userId);
//     console.log("Deleted Cart Product ID:", userId); // Debugging log
//     dispatch({ type: DELETE_CART_PRODUCT_BY_USER_ID, payload: { userId } });
//   } catch (error) {
//     console.log(error);
//   }
// };
