import * as api from "../api";
import {
  FETCH_ORDERS,
  FETCH_ORDERS_ID,
  DELETE_ORDERS,
} from "../constants/actionTypes";

export const getOrders = () => async (dispatch) => {
  try {
    const { data } = await api.fetchOrders();
    console.log(data);

    dispatch({ type: FETCH_ORDERS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getVendorOrders = async () => {
  try {
    const response = await api.fetchOrders();
    console.log("Full API Response:", response);

    // Check if the response contains the expected structure
    if (!response || !response.data || !response.data.data) {
      console.warn(
        "API response does not contain the expected structure. Response:",
        response
      );
      return [];
    }

    // Access the orders from response.data.data
    const orders = Array.isArray(response.data.data) ? response.data.data : [];
    console.log("Raw Orders:", orders);

    // Retrieve adminProfileData from localStorage
    const adminProfileDataString = localStorage.getItem("adminProfileData");
    if (!adminProfileDataString) {
      console.warn("No adminProfileData found in localStorage.");
      return [];
    }

    const adminProfileData = JSON.parse(adminProfileDataString);
    const adminDocumentIds = adminProfileData.map(
      (profile) => profile.documentId
    );

    // Process and filter orders
    const parsedOrders = await Promise.all(
      orders.map(async (order) => {
        try {
          // Parse the productId field (stringified JSON array)
          const products = JSON.parse(order.productId);
          console.log(products);

          // Filter products based on adminDocumentIds
          const filteredProducts = products.filter((product) =>
            adminDocumentIds.includes(product.productId.adminProfileId)
          );

          if (filteredProducts.length === 0) return null; // Skip orders with no relevant products

          // Fetch profile data for the first product's adminProfileId
          const profile = await api.fetchProfileById(order.profileId);

          // Calculate vendorTotalAmount and totalProductsQuantity
          const vendorTotalAmount = filteredProducts.reduce(
            (total, product) =>
              total + parseFloat(product.productId.price) * product.quantity,
            0
          );

          const totalProductsQuantity = filteredProducts.reduce(
            (total, product) => total + product.quantity,
            0
          );

          // Return the order object with profile and calculated fields
          return {
            ...order,
            products: filteredProducts, // Attach filtered products
            profile: profile.data.data, // Attach fetched profile data
            vendorTotalAmount, // Total vendor amount
            totalProductsQuantity, // Total quantity of products
          };
        } catch (err) {
          console.error(`Error processing Order ID ${order.id}:`, err);
          return null; // Skip invalid orders
        }
      })
    );

    // Remove null entries from parsed orders
    const finalOrders = parsedOrders.filter(
      (order) => order && order.products.length > 0
    );
    console.log("Final Filtered Orders with Profile Data:", finalOrders);
    const totalSales = finalOrders.reduce(
      (total, order) => total + order.vendorTotalAmount,
      0
    );
    console.log("Total Sales:", totalSales);

    // Store totalSales in localStorage
    localStorage.setItem("totalSales", totalSales.toString());
    return finalOrders;
  } catch (error) {
    console.error("Error in getVendorOrders:", error);
    return [];
  }
};

export const getOrdersInDetail = async () => {
  try {
    const { data } = await api.fetchOrders();
    const orders = data.data;
    console.log("hi 0");
    const detailedOrders = await Promise.all(
      orders.map(async (item) => {
        console.log(orders);
        console.log(item);
        const response = await api.fetchProfileById(item.profileId);
        const profile = response?.data?.data;
        return { ...item, profile };
      })
    );

    console.log("Detailed Orders:", detailedOrders);
    return detailedOrders; // Return or use detailed orders as needed
  } catch (error) {
    console.log("Error fetching orders in detail:", error);
  }
};

// export const getTotal = () => async (dispatch) => {
//   try {
//     const { data } = await api.fetchTotal();
//     dispatch({ type: FETCH_TOTAL, payload: data });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getOrderByID = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchOrdersById(id);
    dispatch({ type: FETCH_ORDERS_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    await api.deleteOrders(id);
    dispatch({ type: DELETE_ORDERS, payload: id });
  } catch (error) {
    console.log(error);
  }
};
