import axios from "axios";

const API = axios.create({
  baseURL: "https://brilliant-birthday-003dfbf498.strapiapp.com/api",

  // http://localhost:1337/api/products
});
const token =
  "3bdb4a8710b03aee7e5ddfc8838f325f0521fc1ba8dbd26456b07342afb9655d8e3cdabf4d2b86636a527c56d230c5b6c3a661d815da60b0c368ed538d90c60e25fd5e7b559e2bf79217b018bb5557c69642ec8730c9df7938c637058f2107e909384251d024d2b44535c7344a5edf289909810f3ba1e7c304136959eacb8e30";
API.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// USERS
export const fetchUser = () => API.get("/users");
export const fetchUserById = (id) => API.get(`/users/${id}`);
export const deleteUser = (id) => API.delete(`/user/${id}`);
export const signUp = (newUser) =>
  API.post("/auth/local/register", newUser, console.log(newUser));
export const signIn = (newUser) => API.post("/auth/local", newUser);

// profile
export const createProfile = (newProfile) => API.post("/profiles", newProfile);
export const fetchProfile = () => API.get("/profiles?populate=*");
export const fetchProfileById = (id) => API.get(`/profiles/${id}?populate=*`);
export const deleteProfile = (id) => API.delete(`/profiles/${id}?populate=*`);
export const updateProfile = (id) => API.put(`/profiles/${id}?populate=*`);

// PRODUCTS
export const createProducts = (newProducts) => API.post("/goods", newProducts);
export const fetchProducts = () => API.get("/goods?populate=*");
export const fetchProductsById = (id) => API.get(`/goods/${id}?populate=*`);
export const deleteProducts = (id) => API.delete(`/goods/${id}?populate=*`);
export const updateProducts = (id, updatedProduct) =>
  API.put(`/goods/${id}`, { data: updatedProduct });

// BLOGS
export const createBlogs = (newBlogs) => API.post("/blogs", newBlogs);
export const fetchBlogs = () => API.get("/blogs?populate=*");
export const fetchBlogsById = (id) => API.get(`/blogs/${id}?populate=*`);
export const deleteBlogs = (id) => API.delete(`/blogs/${id}?populate=*`);
export const updateBlogs = (id) => API.put(`/blogs/${id}?populate=*`);

// CART
export const addCartProducts = (newProducts) => API.post("/carts", newProducts);
export const fetchCartProducts = () => API.get("/carts");
export const fetchCartProductsByUserId = (userId) =>
  API.get(`/carts/${userId}`);
export const deleteCartProducts = (id) => API.delete(`/carts/${id}`);
export const deleteCartProductByUserId = (userId) =>
  API.delete(`/carts/${userId}`);
export const updateCartProducts = (id) => API.put(`/carts/${id}`);

// Orders
export const createOrder = (newOrder) => API.post("/orderdatas", newOrder);

// Category
export const fetchCategories = () => API.get("/categories?populate=*");
export const fetchCategoryById = (id) =>
  API.get(`/categories/${id}?populate=*`);

// Inbox
export const createInbox = (newInbox) => API.post("/inboxes", newInbox);
export const fetchInbox = () => API.get("/inboxes");
